import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllPhotos, getCustomPhotos, addPhoto, deletePhoto, clearAllCustomPhotos, DEFAULT_PHOTOS, replacePhoto, resetPhotoOverride, resetAllOverrides, getPhotoOverrides } from "../utils/photoStore";
import { getContent, saveContent, resetContentToDefault } from "../utils/contentStore";
import { getTeamMembers } from "../utils/teamStore";
import AdminTextEditor from "../components/AdminTextEditor";
import AdminTeamManager from "../components/AdminTeamManager";

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("tandicia_admin_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Photos State
  const [photos, setPhotos] = useState(getAllPhotos());
  const [customPhotos, setCustomPhotos] = useState(getCustomPhotos());
  const [teamCount, setTeamCount] = useState(() => getTeamMembers().length);

  const [editingPhoto, setEditingPhoto] = useState(null); // photo being replaced
  const [replacePreview, setReplacePreview] = useState(null);
  const [replaceFile, setReplaceFile] = useState(null);

  // Website Text Content State
  const [siteContent, setSiteContent] = useState(getContent());
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [textContentCategory, setTextContentCategory] = useState("home");
  const [textSearchQuery, setTextSearchQuery] = useState("");
  const [customNewKey, setCustomNewKey] = useState("");
  const [customNewValue, setCustomNewValue] = useState("");

  // Form State
  const [activeTab, setActiveTab] = useState("all"); // all, text, team, upload, manage, cloud
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Eye Camps");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [desc, setDesc] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [uploadSource, setUploadSource] = useState("file"); // "file" or "url"

  // Status & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Sync photos, content & team members when custom event fires
  useEffect(() => {
    const refreshData = () => {
      setPhotos(getAllPhotos());
      setCustomPhotos(getCustomPhotos());
      setSiteContent(getContent());
      setTeamCount(getTeamMembers().length);
    };
    window.addEventListener("tandicia_photos_updated", refreshData);
    window.addEventListener("tandicia_content_updated", refreshData);
    window.addEventListener("tandicia_team_updated", refreshData);
    return () => {
      window.removeEventListener("tandicia_photos_updated", refreshData);
      window.removeEventListener("tandicia_content_updated", refreshData);
      window.removeEventListener("tandicia_team_updated", refreshData);
    };
  }, []);

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Default PIN: 7050 or tandicia2025
    if (pinInput === "7050" || pinInput.toLowerCase() === "tandicia2025" || pinInput === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("tandicia_admin_auth", "true");
      setPinError("");
      showToast("Admin access granted! Welcome back.");
    } else {
      setPinError("Incorrect PIN/Password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("tandicia_admin_auth");
  };

  // Handle local image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit: warn if > 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image is larger than 5MB. Please choose a smaller file or compress it first.");
      return;
    }

    setImageFile(file);

    // Read as Data URL for instant preview & local storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle submission
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const finalImageSrc = uploadSource === "file" ? imagePreview : imageUrlInput.trim();

    if (!finalImageSrc) {
      showToast("Please select an image file or enter an image URL.", "error");
      return;
    }

    if (!title.trim()) {
      showToast("Please enter a title for the photo.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      addPhoto({
        title: title.trim(),
        category,
        src: finalImageSrc,
        desc: desc.trim() || `Tandicia on-ground field photograph for ${category}.`,
        location: location.trim() || "New Delhi / NCR",
        date: date || new Date().toLocaleDateString("en-IN")
      });

      // Reset form
      setTitle("");
      setLocation("");
      setDesc("");
      setImagePreview(null);
      setImageFile(null);
      setImageUrlInput("");
      
      showToast("🎉 Photo successfully published! It is now live on the website.");
      setActiveTab("manage");
    } catch (err) {
      console.error(err);
      showToast("Failed to save image. Local storage may be full.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id, photoTitle) => {
    if (window.confirm(`Are you sure you want to remove "${photoTitle}" from the website?`)) {
      deletePhoto(id);
      showToast("Photo deleted successfully.", "info");
    }
  };

  const handleReplaceFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }
    setReplaceFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setReplacePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleReplaceSubmit = () => {
    if (!editingPhoto || !replacePreview) return;
    replacePhoto(editingPhoto.id, { src: replacePreview });
    showToast(`✅ "${editingPhoto.title}" photo replaced successfully!`);
    setEditingPhoto(null);
    setReplacePreview(null);
    setReplaceFile(null);
  };

  const handleResetPhoto = (photo) => {
    if (window.confirm(`Reset "${photo.title}" back to original photo?`)) {
      resetPhotoOverride(photo.id);
      showToast(`Photo reset to original.`, "info");
    }
  };

  // Text content handlers
  const handleContentFieldChange = (key, value) => {
    setSiteContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveAllContent = (e) => {
    if (e) e.preventDefault();
    setIsSavingContent(true);
    try {
      saveContent(siteContent);
      showToast("🎉 Website text updated successfully! Changes are live across the website.");
    } catch (err) {
      console.error(err);
      showToast("Failed to save website content. Please try again.", "error");
    } finally {
      setIsSavingContent(false);
    }
  };

  const handleResetAllContent = () => {
    if (window.confirm("Are you sure you want to reset ALL website texts & stats back to original defaults?")) {
      const defaults = resetContentToDefault();
      setSiteContent(defaults);
      showToast("Website texts reset to original defaults.", "info");
    }
  };

  const handleExportContentBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteContent, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `tandicia_content_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
    showToast("Downloaded website content backup JSON!");
  };

  const handleImportContentBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (typeof parsed === "object") {
          saveContent(parsed);
          setSiteContent(parsed);
          showToast("Website content restored from backup!");
        }
      } catch (err) {
        showToast("Invalid JSON file.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleAddCustomField = (e) => {
    e.preventDefault();
    if (!customNewKey.trim()) return;
    const cleanKey = customNewKey.trim().replace(/\s+/g, "_");
    setSiteContent(prev => ({
      ...prev,
      [cleanKey]: customNewValue
    }));
    setCustomNewKey("");
    setCustomNewValue("");
    showToast(`Added field "${cleanKey}". Click Save to persist.`);
  };

  // If not authenticated, show sleek lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col justify-between font-sans">
        <Navbar />

        <div className="flex-1 flex items-center justify-center p-4 py-20">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto mb-6">
              🔐
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Tandicia Admin Portal
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Enter your admin PIN to upload camp photos and manage website content in real time.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Admin Passcode / PIN
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError("");
                  }}
                  placeholder="Enter PIN (e.g. 7050)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-center text-xl tracking-widest font-mono"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 font-semibold mt-2 text-center">
                    {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
              >
                Unlock Dashboard →
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400">
              Default access PIN: <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">7050</code> or <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">tandicia2025</code>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans">
      <Navbar />

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Live Admin Dashboard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Photo & Content Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload genuine camp photos and update the website instantly across all visitor devices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/media"
              target="_blank"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <span>View Live Website</span>
              <span>↗</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Lock / Logout
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center justify-between shadow-md transition-all ${
            toastType === "error" ? "bg-rose-900 text-white" : "bg-emerald-900 text-white"
          }`}>
            <span className="text-sm font-semibold">{toastMessage}</span>
            <button onClick={() => setToastMessage("")} className="text-white text-xs font-bold ml-4">
              ✕
            </button>
          </div>
        )}

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block font-mono">
              {photos.length}
            </span>
            <span className="text-xs font-medium text-slate-500">Total Photos Live</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 block font-mono">
              {teamCount}
            </span>
            <span className="text-xs font-medium text-slate-500">Team Members</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 block font-mono">
              {customPhotos.length}
            </span>
            <span className="text-xs font-medium text-slate-500">Admin Uploaded</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 block font-mono">
              {Object.keys(getPhotoOverrides()).length}
            </span>
            <span className="text-xs font-medium text-slate-500">Photos Replaced</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 block font-mono">
              Real-time
            </span>
            <span className="text-xs font-medium text-slate-500">Sync Status</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 space-x-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "all"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>📷 All Photos</span>
          </button>

          <button
            onClick={() => setActiveTab("text")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "text"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>✍️ Edit Website Text</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "team"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>👥 Team Members ({teamCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "upload"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>➕ Upload Photo</span>
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "manage"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>🖼️ Manage Uploaded ({customPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("cloud")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "cloud"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>☁️ Cloud Sync</span>
          </button>
        </div>

        {/* ========================================================
            TAB 0: ALL WEBSITE PHOTOS
            ======================================================== */}
        {activeTab === "all" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  All Website Photos ({photos.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Every photo currently visible on the website. Click "Replace" on any photo to change it.
                </p>
              </div>
              {Object.keys(getPhotoOverrides()).length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Reset ALL replaced photos back to originals?")) {
                      resetAllOverrides();
                      showToast("All photos reset to originals.", "info");
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer self-start"
                >
                  Reset All to Original
                </button>
              )}
            </div>

            {/* Replace Photo Modal */}
            {editingPhoto && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setEditingPhoto(null); setReplacePreview(null); setReplaceFile(null); }}>
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Replace Photo</h3>
                  <p className="text-xs text-slate-500 mb-4">Replacing: <strong>{editingPhoto.title}</strong></p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Current</p>
                      <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={editingPhoto.src} alt="Current" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-emerald-600 uppercase mb-1">New Photo</p>
                      <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-emerald-300 flex items-center justify-center">
                        {replacePreview ? (
                          <img src={replacePreview} alt="New" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-slate-400">Select below ↓</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <label className="block w-full cursor-pointer">
                    <div className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-400 text-center transition-colors">
                      <span className="text-sm font-semibold text-slate-600">📁 Choose New Photo</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, JPEG, WEBP up to 5MB</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleReplaceFile} />
                  </label>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={handleReplaceSubmit}
                      disabled={!replacePreview}
                      className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-sm transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      ✓ Replace Photo
                    </button>
                    <button
                      onClick={() => { setEditingPhoto(null); setReplacePreview(null); setReplaceFile(null); }}
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`border rounded-2xl overflow-hidden bg-stone-50 flex flex-col justify-between transition-all hover:shadow-md ${
                    photo.isOverridden ? "border-amber-300 ring-1 ring-amber-200" : "border-slate-200"
                  }`}
                >
                  <div>
                    <div className="relative h-44 bg-slate-200">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/image.png'; }}
                      />
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {photo.category}
                      </span>
                      {photo.isOverridden && (
                        <span className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Replaced
                        </span>
                      )}
                      {photo.isCustom && (
                        <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Uploaded
                        </span>
                      )}
                    </div>
                    <div className="p-3.5">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{photo.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{photo.desc}</p>
                      <p className="text-[10px] text-slate-400 mt-1">📍 {photo.location} • 📅 {photo.date}</p>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3.5 flex gap-2">
                    <button
                      onClick={() => { setEditingPhoto(photo); setReplacePreview(null); setReplaceFile(null); }}
                      className="flex-1 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      🔄 Replace
                    </button>
                    {photo.isOverridden && (
                      <button
                        onClick={() => handleResetPhoto(photo)}
                        className="py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        ↩ Reset
                      </button>
                    )}
                    {photo.isCustom && (
                      <button
                        onClick={() => handleDelete(photo.id, photo.title)}
                        className="py-2 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        ✕ Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: EDIT WEBSITE TEXT & CONTENT
            ======================================================== */}
        {activeTab === "text" && (
          <AdminTextEditor
            siteContent={siteContent}
            setSiteContent={setSiteContent}
            handleContentFieldChange={handleContentFieldChange}
            handleSaveAllContent={handleSaveAllContent}
            handleResetAllContent={handleResetAllContent}
            isSavingContent={isSavingContent}
            showToast={showToast}
          />
        )}

        {/* ========================================================
            TAB: TEAM MEMBERS MANAGER
            ======================================================== */}
        {activeTab === "team" && (
          <AdminTeamManager showToast={showToast} />
        )}

        {/* ========================================================
            TAB 1: UPLOAD PHOTO
            ======================================================== */}
        {activeTab === "upload" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Add Photo to Website
              </h2>

              <form onSubmit={handleUploadSubmit} className="space-y-6">
                {/* Source Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Photo Source
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="uploadSource"
                        value="file"
                        checked={uploadSource === "file"}
                        onChange={() => setUploadSource("file")}
                        className="text-emerald-700"
                      />
                      <span>Upload from Device (Phone / Laptop)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="uploadSource"
                        value="url"
                        checked={uploadSource === "url"}
                        onChange={() => setUploadSource("url")}
                        className="text-emerald-700"
                      />
                      <span>Paste Image URL</span>
                    </label>
                  </div>
                </div>

                {/* File Upload Box */}
                {uploadSource === "file" ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Image
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-emerald-600 transition-colors bg-stone-50">
                      <input
                        type="file"
                        id="photo-file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo-file"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <span className="text-3xl mb-2">📸</span>
                        <span className="text-sm font-semibold text-emerald-800 underline underline-offset-2">
                          Click to choose photo from gallery / camera
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          PNG, JPG, JPEG, WEBP up to 5MB
                        </span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Image Direct Link
                    </label>
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => {
                        setImageUrlInput(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Photo Title / Caption *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Free Eye Screening Camp at Kusumpur Pahari"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Target Section / Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    >
                      <option value="Eye Camps">Eye Camps (Primary Healthcare)</option>
                      <option value="Sewa Rasoi">Sewa Rasoi (Community Kitchen)</option>
                      <option value="Nai Pehal">Nai Pehal (Mutual Aid & Elders)</option>
                      <option value="Events">Events & Volunteer Team</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Camp / Event Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Field Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Block-C, Kusumpur Pahari, New Delhi"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Short Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Provide context about what is happening in this photograph..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || (!imagePreview && !imageUrlInput)}
                  className={`w-full py-4 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    isSubmitting || (!imagePreview && !imageUrlInput)
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-emerald-700 hover:bg-emerald-600 cursor-pointer"
                  }`}
                >
                  <span>{isSubmitting ? "Publishing..." : "Publish to Website Now →"}</span>
                </button>
              </form>
            </div>

            {/* Live Preview Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                  Live Card Preview
                </span>

                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-stone-50">
                  <div className="relative h-56 bg-slate-100 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-slate-400 p-4">
                        <span className="text-3xl block mb-2">🖼️</span>
                        <span className="text-xs">Image preview will appear here</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-slate-950/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-slate-500 mb-1">
                      📍 {location || "Field Location"} • 📅 {date || "Date"}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {title || "Photo Title Preview"}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {desc || "Photo description will appear here on the website cards and media gallery."}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                  <span>ℹ️</span>
                  <span>
                    When published, this photo will automatically appear at the top of the <strong>Media Gallery (`/media`)</strong> and relevant programme sections!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: MANAGE UPLOADED PHOTOS
            ======================================================== */}
        {activeTab === "manage" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Custom Uploaded Photos ({customPhotos.length})
                </h2>
                <p className="text-xs text-slate-500">
                  These photos were added via Admin Panel and are actively displayed on the website.
                </p>
              </div>

              {customPhotos.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear ALL custom photos? Default camp photos will remain intact.")) {
                      clearAllCustomPhotos();
                      showToast("All custom photos cleared.", "info");
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer self-start"
                >
                  Clear All Uploaded Photos
                </button>
              )}
            </div>

            {customPhotos.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                <span className="text-4xl block mb-2">📁</span>
                <h3 className="text-base font-bold text-slate-700">No custom photos uploaded yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                  Currently showing verified default camp banners and photos. Click "Upload New Photo" above to add your first photo!
                </p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  + Upload First Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-stone-50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          {photo.category}
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="text-xs text-slate-500 mb-1">
                          📍 {photo.location} • 📅 {photo.date}
                        </div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {photo.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        Live on Site
                      </span>
                      <button
                        onClick={() => handleDelete(photo.id, photo.title)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        Delete ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}


          </div>
        )}

        {/* ========================================================
            TAB 3: CLOUD SYNC & STORAGE
            ======================================================== */}
        {activeTab === "cloud" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Cloud Storage & Synchronization
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              How Tandicia syncs photos across all visitors' phones and computers worldwide.
            </p>

            <div className="space-y-6">
              {/* Local Storage Card */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <h3 className="font-bold text-emerald-950 text-sm">
                    In-Browser Instant Storage (Active)
                  </h3>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Photos uploaded from this device are stored in memory and local storage, immediately updating the website on this browser.
                </p>
              </div>

              {/* Cloud Sync Setup Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-stone-50 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">
                  Global Multi-Device Cloud Sync (Supabase / ImgBB)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To automatically propagate photos uploaded on your phone to every visitor worldwide, you can connect a free Supabase or ImgBB project.
                </p>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 space-y-2">
                  <p><strong>Option 1 (ImgBB - Instant 1-click Free Hosting):</strong> Get a free API key at <a href="https://api.imgbb.com/" target="_blank" rel="noreferrer" className="text-sky-800 underline">imgbb.com</a> to upload full-resolution photos directly to high-speed CDN.</p>
                  <p><strong>Option 2 (Supabase):</strong> Use free PostgreSQL + Storage bucket with automatic real-time websocket updates.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
