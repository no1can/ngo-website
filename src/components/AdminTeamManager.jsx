import { useState, useMemo } from "react";
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  resetTeamMembers,
  useTeamMembers
} from "../utils/teamStore";

export default function AdminTeamManager({ showToast }) {
  const members = useTeamMembers();

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State (for both Add & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // null if adding new

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("Volunteer");
  const [formBio, setFormBio] = useState("");
  const [formImage, setFormImage] = useState("");
  const [imageUploadType, setImageUploadType] = useState("url"); // "url" or "file"
  const [previewSrc, setPreviewSrc] = useState("");

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        member.name.toLowerCase().includes(q) ||
        (member.role && member.role.toLowerCase().includes(q));
      return matchesSearch;
    });
  }, [members, searchQuery]);

  // Open modal for Adding
  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormName("");
    setFormRole("Volunteer");
    setFormBio("");
    setFormImage("/camps/camp_team_selfie.jpg");
    setPreviewSrc("/camps/camp_team_selfie.jpg");
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setFormName(member.name || "");
    setFormRole(member.role || "Volunteer");
    setFormBio(member.bio || "");
    setFormImage(member.image || "");
    setPreviewSrc(member.image || "");
    setIsModalOpen(true);
  };

  // Handle local image file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Image is larger than 4MB. Please choose a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      setFormImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit Add or Edit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast("Please enter the member's full name.", "error");
      return;
    }

    const finalImage = previewSrc || formImage || "/camps/camp_team_selfie.jpg";

    if (editingMember) {
      // Update
      updateTeamMember(editingMember.id, {
        name: formName.trim(),
        category: "Volunteer",
        role: formRole.trim() || "Volunteer",
        bio: formBio.trim(),
        image: finalImage
      });
      showToast(`Updated "${formName.trim()}" successfully!`);
    } else {
      // Add
      addTeamMember({
        name: formName.trim(),
        category: "Volunteer",
        role: formRole.trim() || "Volunteer",
        bio: formBio.trim() || "Dedicated community volunteer.",
        image: finalImage
      });
      showToast(`Added new member "${formName.trim()}"!`);
    }

    setIsModalOpen(false);
  };

  // Delete Member
  const handleDelete = (member) => {
    if (window.confirm(`Are you sure you want to remove "${member.name}" from the team?`)) {
      deleteTeamMember(member.id);
      showToast(`Removed "${member.name}" from team list.`, "info");
    }
  };

  // Reset to original team
  const handleResetTeam = () => {
    if (window.confirm("Reset all team members back to original 39 registered members? Any custom members will be reverted.")) {
      resetTeamMembers();
      showToast("Team members reset to original roster.", "info");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>👥 Team Members & Volunteer Leadership</span>
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold font-mono">
              {members.length} Members Live
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Add new team members, edit roles/designations, replace photos, or remove members in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetTeam}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors cursor-pointer"
          >
            ↩ Reset to Original Team
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>➕ Add New Member</span>
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-bold text-slate-900 font-mono block">
            {members.length}
          </span>
          <span className="text-xs font-semibold text-slate-500">Total Volunteers</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-bold text-emerald-700 font-mono block">
            100%
          </span>
          <span className="text-xs font-semibold text-slate-500">Dedicated Service</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-2xl font-bold text-sky-700 font-mono block">
            Equal
          </span>
          <span className="text-xs font-semibold text-slate-500">Community Solidarity</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search volunteer by name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-xs font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredMembers.length} volunteers
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={member.image || "/camps/camp_team_selfie.jpg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
                    Volunteer
                  </span>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1">{member.name}</h4>
              <p className="text-xs font-semibold text-emerald-800 mb-2">{member.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                {member.bio || "Dedicated volunteer contributing to Tandicia's on-ground initiatives."}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleOpenEditModal(member)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(member)}
                className="py-1.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                title="Delete member"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <span className="text-4xl block mb-2">🔍</span>
          <h4 className="text-base font-bold text-slate-800">No team members found</h4>
          <p className="text-xs text-slate-400 mt-1">Try a different search term or category filter</p>
        </div>
      )}

      {/* Add / Edit Member Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingMember ? `Edit Member: ${editingMember.name}` : "Add New Team Member"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Photo Preview & Upload */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-slate-200">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  <img
                    src={previewSrc || "/camps/camp_team_selfie.jpg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-3 text-xs font-semibold">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={imageUploadType === "url"}
                        onChange={() => setImageUploadType("url")}
                        name="imgType"
                      />
                      <span>Photo URL</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={imageUploadType === "file"}
                        onChange={() => setImageUploadType("file")}
                        name="imgType"
                      />
                      <span>Upload from Device</span>
                    </label>
                  </div>

                  {imageUploadType === "url" ? (
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => {
                        setFormImage(e.target.value);
                        setPreviewSrc(e.target.value);
                      }}
                      placeholder="/team_members/volunteer_1.jpg or web URL"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs w-full"
                    />
                  )}
                </div>
              </div>

              {/* Name & ID */}
              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Volunteer (or Eye Surgeon, Coordinator)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bio / Contribution Summary
                </label>
                <textarea
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Summary of volunteer experience, specialization, or community contribution..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {editingMember ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
