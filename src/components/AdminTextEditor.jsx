import { useState, useMemo } from "react";
import { saveContent, resetContentToDefault } from "../utils/contentStore";

export default function AdminTextEditor({
  siteContent,
  setSiteContent,
  handleContentFieldChange,
  handleSaveAllContent,
  handleResetAllContent,
  isSavingContent,
  showToast
}) {
  const [activeCategory, setActiveCategory] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [customKey, setCustomKey] = useState("");
  const [customVal, setCustomVal] = useState("");

  // Categories configuration with field definitions
  const categories = useMemo(() => [
    {
      id: "home",
      label: "🏠 Homepage",
      description: "Hero banner, 3 pillars, field programmes, impact stats, spotlight, stories & CTA",
      groups: [
        {
          title: "🌟 Hero Section",
          desc: "Main banner text visitors see first on the homepage",
          fields: [
            { key: "heroBadge", label: "Top Badge / Vision Tagline", type: "text", helper: "Small green badge at top" },
            { key: "heroHeading1", label: "Heading Line 1", type: "text", helper: "Default: TANDICIA" },
            { key: "heroHeading2", label: "Heading Line 2", type: "text", helper: "Default: ASSOCIATION" },
            { key: "heroTagline", label: "Main Sub-Headline (Italic Golden)", type: "text", helper: "Core tagline shown prominently" },
            { key: "heroSubtext", label: "Hero Paragraph Description", type: "textarea", helper: "Supporting mission description" },
            { key: "heroCta1Text", label: "Primary Button Text", type: "text", helper: "First action button" },
            { key: "heroCta2Text", label: "Secondary Button Text", type: "text", helper: "Second action button" }
          ]
        },
        {
          title: "🎯 Our Vision & 3 Pillars",
          desc: "Section 2 introducing Tandicia's eye healthcare purpose",
          fields: [
            { key: "purposeBadge", label: "Section Badge", type: "text" },
            { key: "purposeHeading", label: "Main Heading", type: "text" },
            { key: "purposeSubtext", label: "Vision Description", type: "textarea" },
            { key: "pillar1Title", label: "Pillar 1 Title (Eye Screening)", type: "text" },
            { key: "pillar1Desc", label: "Pillar 1 Description", type: "textarea" },
            { key: "pillar2Title", label: "Pillar 2 Title (Spectacles)", type: "text" },
            { key: "pillar2Desc", label: "Pillar 2 Description", type: "textarea" },
            { key: "pillar3Title", label: "Pillar 3 Title (Specialist Care)", type: "text" },
            { key: "pillar3Desc", label: "Pillar 3 Description", type: "textarea" }
          ]
        },
        {
          title: "🚀 Field Programmes",
          desc: "Section 3 displaying Eye Camps & Nai Pehal initiative cards",
          fields: [
            { key: "programmesBadge", label: "Section Badge", type: "text" },
            { key: "programmesHeading", label: "Section Heading", type: "text" },
            { key: "programmesSubtext", label: "Programmes Description", type: "textarea" },
            { key: "progEyeTitle", label: "Eye Camps Card Title", type: "text" },
            { key: "progEyeDesc", label: "Eye Camps Card Description", type: "textarea" },
            { key: "progEyeLinkText", label: "Eye Camps Button / Link Text", type: "text" },
            { key: "progNaiTitle", label: "Nai Pehal Card Title", type: "text" },
            { key: "progNaiDesc", label: "Nai Pehal Card Description", type: "textarea" },
            { key: "progNaiLinkText", label: "Nai Pehal Button / Link Text", type: "text" }
          ]
        },
        {
          title: "📊 Impact Statistics Bar",
          desc: "The 4 verified metrics displayed across homepage and impact bar",
          fields: [
            { key: "impactBadge", label: "Section Badge", type: "text" },
            { key: "impactHeading", label: "Section Heading", type: "text" },
            { key: "impactSubtext", label: "Section Subtitle", type: "textarea" },
            { key: "stat1Number", label: "Stat 1: Metric Number (e.g. 1,200+)", type: "text" },
            { key: "stat1Label", label: "Stat 1: Label (e.g. People Reached)", type: "text" },
            { key: "stat1Sub", label: "Stat 1: Subtitle", type: "text" },
            { key: "stat2Number", label: "Stat 2: Metric Number (e.g. 4+)", type: "text" },
            { key: "stat2Label", label: "Stat 2: Label (e.g. Eye Camps)", type: "text" },
            { key: "stat2Sub", label: "Stat 2: Subtitle", type: "text" },
            { key: "stat3Number", label: "Stat 3: Metric Number (e.g. 450+)", type: "text" },
            { key: "stat3Label", label: "Stat 3: Label (e.g. Spectacles Distributed)", type: "text" },
            { key: "stat3Sub", label: "Stat 3: Subtitle", type: "text" },
            { key: "stat4Number", label: "Stat 4: Metric Number (e.g. 50+)", type: "text" },
            { key: "stat4Label", label: "Stat 4: Label (e.g. Volunteers & Doctors)", type: "text" },
            { key: "stat4Sub", label: "Stat 4: Subtitle", type: "text" }
          ]
        },
        {
          title: "👁️ Eye Camps Spotlight Section",
          desc: "The featured spotlight section on homepage",
          fields: [
            { key: "eyeCampsBadge", label: "Section Badge", type: "text" },
            { key: "eyeCampsHeading", label: "Spotlight Heading", type: "text" },
            { key: "eyeCampsSubtext", label: "Spotlight Description", type: "textarea" }
          ]
        },
        {
          title: "📖 Stories from the Field",
          desc: "Real beneficiary quotes and field impact stories",
          fields: [
            { key: "storiesBadge", label: "Section Badge", type: "text" },
            { key: "storiesHeading", label: "Section Heading", type: "text" },
            { key: "storyMainTitle", label: "Featured Story Headline", type: "text" },
            { key: "storyMainQuote", label: "Featured Story Quote / Text", type: "textarea" },
            { key: "story2Title", label: "Story 2 Title", type: "text" },
            { key: "story2Desc", label: "Story 2 Description", type: "textarea" },
            { key: "story3Title", label: "Story 3 Title", type: "text" },
            { key: "story3Desc", label: "Story 3 Description", type: "textarea" },
            { key: "story4Title", label: "Story 4 Title", type: "text" },
            { key: "story4Desc", label: "Story 4 Description", type: "textarea" }
          ]
        },
        {
          title: "🤝 Final Call to Action (CTA)",
          desc: "The bottom banner inviting volunteers and supporters",
          fields: [
            { key: "ctaHeading", label: "CTA Heading", type: "text" },
            { key: "ctaQuote", label: "Inspirational Quote", type: "textarea" },
            { key: "ctaButton1Text", label: "Button 1 Text (Volunteer)", type: "text" },
            { key: "ctaButton2Text", label: "Button 2 Text (Support / Donate)", type: "text" }
          ]
        }
      ]
    },
    {
      id: "upcoming",
      label: "🚩 Upcoming Eye Camp",
      description: "Spotlight details for upcoming Shakurpur Colony Camp (11-Oct-2026), banner, time & location",
      groups: [
        {
          title: "🌟 Upcoming Camp Spotlight Announcement",
          desc: "Displayed prominently at the top of the Eye Camps page and Homepage",
          fields: [
            { key: "upcomingCampTitle", label: "Camp Title / Heading", type: "text", helper: "e.g. नि:शुल्क नेत्र जाँच शिविर" },
            { key: "upcomingCampTagline", label: "Camp Tagline / Subtitle", type: "text", helper: "e.g. Shakurpur Colony, New Delhi • 11-Oct-2026" },
            { key: "upcomingCampDate", label: "Event Date (Hindi / English)", type: "text", helper: "e.g. 11 अक्टूबर 2026 (रविवार / Sunday)" },
            { key: "upcomingCampTime", label: "Camp Timings", type: "text", helper: "e.g. सुबह 10:00 बजे से दोपहर 2:00 बजे तक" },
            { key: "upcomingCampLocation", label: "Camp Venue / Address", type: "text", helper: "e.g. ब्लॉक G, शकूरपुर कॉलोनी, नई दिल्ली" },
            { key: "upcomingCampSpecial", label: "Special Highlight Badge", type: "text", helper: "e.g. नज़र के चश्में भी मुफ्त दिए जाएंगे" },
            { key: "upcomingCampSummary", label: "Camp Summary / Description", type: "textarea", helper: "Full briefing of the upcoming camp" },
            { key: "upcomingCampBanner", label: "Banner Image URL or Path", type: "text", helper: "Default: /shakurpur-eye-camp-banner.jpg" }
          ]
        }
      ]
    },
    {
      id: "sewa",
      label: "🍲 Sewa Rasoi",
      description: "Nutrition relief programme, core philosophy, and live impact numbers",
      groups: [
        {
          title: "🍲 Sewa Rasoi Header & Philosophy",
          desc: "Header banner and introduction on /sewa-rasoi",
          fields: [
            { key: "sewaBadge", label: "Header Badge", type: "text", helper: "e.g. Nutritional Relief & Dignity" },
            { key: "sewaHeading", label: "Main Heading", type: "text", helper: "e.g. Sewa Rasoi" },
            { key: "sewaTagline", label: "Page Tagline", type: "text", helper: "e.g. Food with Dignity. Service with Compassion." },
            { key: "sewaSubtext", label: "Page Subtext / Intro", type: "textarea", helper: "Mission statement of Sewa Rasoi" },
            { key: "sewaPhilosophyTitle", label: "Philosophy Section Title", type: "text", helper: "e.g. More Than a Meal" },
            { key: "sewaPhilosophyP1", label: "Philosophy Paragraph 1", type: "textarea" },
            { key: "sewaPhilosophyP2", label: "Philosophy Paragraph 2", type: "textarea" }
          ]
        },
        {
          title: "📊 Sewa Rasoi Impact Statistics",
          desc: "The 4 key metrics displayed on the Sewa Rasoi page",
          fields: [
            { key: "sewaMealsCount", label: "Hot Meals Served (e.g. 2,500+)", type: "text" },
            { key: "sewaVolunteersCount", label: "Kitchen & Delivery Volunteers (e.g. 45+)", type: "text" },
            { key: "sewaDaysCount", label: "Days of Community Rasoi (e.g. 30+)", type: "text" },
            { key: "sewaCommunitiesCount", label: "Hospital & Bastis Reached (e.g. 12+)", type: "text" }
          ]
        }
      ]
    },
    {
      id: "camps",
      label: "👁️ Eye Camps",
      description: "Header and details for Bhati Mines, Kusumpur, Mewla Maharajpur & Follow-up camps",
      groups: [
        {
          title: "🚩 Eye Camps Page Banner",
          desc: "Banner on /eye-camps",
          fields: [
            { key: "campsPageBadge", label: "Header Badge", type: "text" },
            { key: "campsPageTitle", label: "Header Title", type: "text" },
            { key: "campsPageSubtitle", label: "Header Description", type: "textarea" },
            { key: "campsProcessTitle", label: "Process Section Title", type: "text" },
            { key: "campsProcessSubtitle", label: "Process Section Subtitle", type: "textarea" }
          ]
        },
        {
          title: "📍 Budh Vihar, New Delhi",
          desc: "Camp on 20 September 2026 at Budh Vihar",
          fields: [
            { key: "campBvTitle", label: "Camp Title", type: "text" },
            { key: "campBvDateLoc", label: "Date & Location", type: "text" },
            { key: "campBvDesc", label: "Objective & Description", type: "textarea" },
            { key: "campBvDoctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        },
        {
          title: "📍 Gao Thora, Gautam Budh Nagar",
          desc: "Camp on 14 June 2026 at Gao Thora near Jewar",
          fields: [
            { key: "campGtTitle", label: "Camp Title", type: "text" },
            { key: "campGtDateLoc", label: "Date & Location", type: "text" },
            { key: "campGtDesc", label: "Objective & Description", type: "textarea" },
            { key: "campGtDoctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        },
        {
          title: "📍 Shraddhanand Marg, Delhi",
          desc: "Camp on 9 November 2025 at Shraddhanand Marg",
          fields: [
            { key: "campSnTitle", label: "Camp Title", type: "text" },
            { key: "campSnDateLoc", label: "Date & Location", type: "text" },
            { key: "campSnDesc", label: "Objective & Description", type: "textarea" },
            { key: "campSnDoctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        },
        {
          title: "📍 Bhati Mines, New Delhi",
          desc: "Abhyudaya, Sanjay Colony, Bhati Mines camp details",
          fields: [
            { key: "camp1Title", label: "Camp Title", type: "text" },
            { key: "camp1DateLoc", label: "Date & Location", type: "text" },
            { key: "camp1Desc", label: "Objective & Description", type: "textarea" },
            { key: "camp1Doctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        },
        {
          title: "📍 Kusumpur Pahari, New Delhi",
          desc: "Sherawali Mata Mandir, Kusumpur Pahari camp details",
          fields: [
            { key: "camp2Title", label: "Camp Title", type: "text" },
            { key: "camp2DateLoc", label: "Date & Location", type: "text" },
            { key: "camp2Desc", label: "Objective & Description", type: "textarea" },
            { key: "camp2Doctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        },
        {
          title: "📍 Mewla Maharajpur, Faridabad",
          desc: "Deepak Bensla Baithak, Mewla Maharajpur camp details",
          fields: [
            { key: "camp3Title", label: "Camp Title", type: "text" },
            { key: "camp3DateLoc", label: "Date & Location", type: "text" },
            { key: "camp3Desc", label: "Objective & Description", type: "textarea" },
            { key: "camp3Doctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        },
        {
          title: "📍 Comprehensive Follow-up Camp",
          desc: "Follow-up and second-stage spectacles dispensing",
          fields: [
            { key: "camp4Title", label: "Camp Title", type: "text" },
            { key: "camp4DateLoc", label: "Date & Location", type: "text" },
            { key: "camp4Desc", label: "Objective & Description", type: "textarea" },
            { key: "camp4Doctor", label: "Medical Team / Senior Surgeon", type: "text" }
          ]
        }
      ]
    },
    {
      id: "about",
      label: "📖 About Tandicia",
      description: "Origin story, Who We Are, Guiding Quote, Vision Quote & Core Objectives",
      groups: [
        {
          title: "🌟 About Hero Banner",
          desc: "The header of the /about page",
          fields: [
            { key: "aboutHeading", label: "Page Heading", type: "text" },
            { key: "aboutTagline", label: "Page Tagline", type: "text" },
            { key: "aboutSubtext", label: "Page Subtext / Intro", type: "textarea" }
          ]
        },
        {
          title: "👥 Who We Are & Guiding Light",
          desc: "The detailed backstory and founding principles",
          fields: [
            { key: "aboutWhoHeading", label: "Section Heading", type: "text" },
            { key: "aboutWhoP1", label: "Paragraph 1 (Organisational Background)", type: "textarea" },
            { key: "aboutWhoP2", label: "Paragraph 2 (Ground-level philosophy)", type: "textarea" },
            { key: "aboutWhoQuote", label: "Guiding Quote", type: "textarea" }
          ]
        }
      ]
    },
    {
      id: "donate",
      label: "💳 Donate & Bank Details",
      description: "Support page header and verified bank account, IFSC & UPI details",
      groups: [
        {
          title: "💖 Support Our Work Banner",
          desc: "Header of /donate",
          fields: [
            { key: "donateBadge", label: "Page Badge", type: "text" },
            { key: "donateTitle", label: "Page Title", type: "text" },
            { key: "donateTagline", label: "Page Tagline", type: "text" },
            { key: "donateDesc", label: "Page Description", type: "textarea" }
          ]
        },
        {
          title: "🏦 Official Bank Account & UPI",
          desc: "Official bank credentials displayed for direct contributions",
          fields: [
            { key: "bankAccountName", label: "Account Holder Name", type: "text" },
            { key: "bankName", label: "Bank Name", type: "text" },
            { key: "bankAccountNumber", label: "Account Number", type: "text" },
            { key: "bankIfsc", label: "IFSC Code", type: "text" },
            { key: "bankUpi", label: "UPI ID / VPA", type: "text" }
          ]
        }
      ]
    },
    {
      id: "nai",
      label: "🌱 Nai Pehal Page",
      description: "Header and 4 dynamic community initiatives",
      groups: [
        {
          title: "🌟 Nai Pehal Page Header",
          desc: "Banner on /nai-pehal",
          fields: [
            { key: "naiBadge", label: "Header Badge", type: "text" },
            { key: "naiTitle", label: "Header Title", type: "text" },
            { key: "naiSubtitle", label: "Header Tagline", type: "text" }
          ]
        },
        {
          title: "👵 Community Initiatives Breakdown",
          desc: "Details of the individual programmes",
          fields: [
            { key: "naiInit1Title", label: "Initiative 1 Title (Senior Citizens)", type: "text" },
            { key: "naiInit1Desc", label: "Initiative 1 Details", type: "textarea" },
            { key: "naiInit2Title", label: "Initiative 2 Title (Single Parents)", type: "text" },
            { key: "naiInit2Desc", label: "Initiative 2 Details", type: "textarea" },
            { key: "naiInit3Title", label: "Initiative 3 Title (Community Aid)", type: "text" },
            { key: "naiInit3Desc", label: "Initiative 3 Details", type: "textarea" },
            { key: "naiInit4Title", label: "Initiative 4 Title (Health Awareness)", type: "text" },
            { key: "naiInit4Desc", label: "Initiative 4 Details", type: "textarea" }
          ]
        }
      ]
    },
    {
      id: "impact",
      label: "📊 Impact & Accountability",
      description: "Impact page banner, report text and transparency guarantees",
      groups: [
        {
          title: "📈 Impact Page Banner",
          desc: "Header on /impact",
          fields: [
            { key: "impactPageBadge", label: "Header Badge", type: "text" },
            { key: "impactPageTitle", label: "Header Title", type: "text" },
            { key: "impactPageTagline", label: "Header Tagline", type: "text" },
            { key: "impactPageDesc", label: "Header Description", type: "textarea" },
            { key: "impactAccountabilityTitle", label: "Accountability Title", type: "text" },
            { key: "impactAccountabilityDesc", label: "Accountability Description", type: "textarea" }
          ]
        }
      ]
    },
    {
      id: "contact",
      label: "📞 Contact & Footer",
      description: "Official contact details, office address, and footer text",
      groups: [
        {
          title: "🏢 Official Contact Info",
          desc: "Displayed on Contact page, Footer, and Header",
          fields: [
            { key: "contactBadge", label: "Contact Page Badge", type: "text" },
            { key: "contactTitle", label: "Contact Page Title", type: "text" },
            { key: "contactTagline", label: "Contact Page Tagline", type: "text" },
            { key: "contactDesc", label: "Contact Page Description", type: "textarea" },
            { key: "orgName", label: "Organisation Name", type: "text" },
            { key: "orgEmail", label: "Official Email Address", type: "text" },
            { key: "orgPhone", label: "Official Phone Number", type: "text" },
            { key: "orgAddress", label: "Registered Office Address", type: "text" },
            { key: "orgWorkingHours", label: "Office Working Hours", type: "text" }
          ]
        },
        {
          title: "📑 Footer Bios & Copyright",
          desc: "Bottom footer content across all pages",
          fields: [
            { key: "footerBio", label: "Footer Summary Bio", type: "textarea" },
            { key: "footerCopyright", label: "Footer Copyright Line", type: "text" }
          ]
        }
      ]
    },
    {
      id: "docs",
      label: "📜 Documents & FAQ Text",
      description: "Transparency documents page and FAQ page texts",
      groups: [
        {
          title: "📑 Documents Page Header",
          desc: "Header on /documents",
          fields: [
            { key: "docsPageBadge", label: "Documents Badge", type: "text" },
            { key: "docsPageTitle", label: "Documents Title", type: "text" },
            { key: "docsPageSubtitle", label: "Documents Description", type: "textarea" }
          ]
        },
        {
          title: "❓ FAQ Page Header",
          desc: "Header on /faq",
          fields: [
            { key: "faqPageBadge", label: "FAQ Badge", type: "text" },
            { key: "faqPageTitle", label: "FAQ Title", type: "text" },
            { key: "faqPageSubtitle", label: "FAQ Description", type: "textarea" }
          ]
        }
      ]
    }
  ], []);

  // Filter fields if search query is active
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories.filter(c => c.id === activeCategory);
    }
    const q = searchQuery.toLowerCase();
    return categories
      .map(cat => ({
        ...cat,
        groups: cat.groups
          .map(grp => ({
            ...grp,
            fields: grp.fields.filter(f =>
              f.label.toLowerCase().includes(q) ||
              f.key.toLowerCase().includes(q) ||
              (siteContent[f.key] && String(siteContent[f.key]).toLowerCase().includes(q))
            )
          }))
          .filter(grp => grp.fields.length > 0)
      }))
      .filter(cat => cat.groups.length > 0);
  }, [categories, activeCategory, searchQuery, siteContent]);

  // Total fields count
  const totalFieldsCount = useMemo(() => {
    let count = 0;
    categories.forEach(c => {
      c.groups.forEach(g => {
        count += g.fields.length;
      });
    });
    return count;
  }, [categories]);

  // Export content JSON backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteContent, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `tandicia_content_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
    showToast("Downloaded website content backup JSON!");
  };

  // Import content JSON backup
  const handleImportBackup = (e) => {
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

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customKey.trim()) return;
    const cleanKey = customKey.trim().replace(/\s+/g, "_");
    setSiteContent(prev => ({
      ...prev,
      [cleanKey]: customVal
    }));
    setCustomKey("");
    setCustomVal("");
    showToast(`Added custom key "${cleanKey}". Click Save to persist.`);
  };

  return (
    <div className="space-y-6">
      {/* Sticky Action Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-4 z-20 backdrop-blur-md bg-white/95">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>✍️ Master Website Content Editor</span>
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold font-mono">
              {totalFieldsCount}+ Fields Live
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Edit all headings, taglines, camp details, beneficiary quotes & contact info across the entire website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportBackup}
            title="Download JSON backup"
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>📥 Backup</span>
          </button>

          <label
            title="Restore from JSON backup"
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>📤 Restore</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            type="button"
            onClick={handleResetAllContent}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors cursor-pointer"
          >
            <span>↩ Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAllContent}
            disabled={isSavingContent}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md hover:shadow-emerald-900/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSavingContent ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>💾 Save All Text Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any text across website (e.g. 'Bhati', 'Spectacles', 'Bank')..."
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

        {searchQuery ? (
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl">
            Filtering across all website sections
          </div>
        ) : (
          <div className="text-xs text-slate-400">
            Select a section below to browse
          </div>
        )}
      </div>

      {/* Category Pills (Visible when not searching) */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveCategory("custom")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "custom"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>➕ All & Custom Keys</span>
          </button>
        </div>
      )}

      {/* Category Content Groups */}
      <form onSubmit={handleSaveAllContent} className="space-y-6">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="space-y-6">
            {cat.groups.map((group, grpIdx) => (
              <div key={grpIdx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="pb-4 mb-6 border-b border-slate-100 flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{group.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{group.desc}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                    {group.fields.length} {group.fields.length === 1 ? "field" : "fields"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.fields.map((field) => (
                    <div
                      key={field.key}
                      className={field.type === "textarea" ? "md:col-span-2" : "col-span-1"}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {field.label}
                        </label>
                        <code className="text-[10px] text-slate-400 font-mono">
                          {field.key}
                        </code>
                      </div>

                      {field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          value={siteContent[field.key] || ""}
                          onChange={(e) => handleContentFieldChange(field.key, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm leading-relaxed"
                        />
                      ) : (
                        <input
                          type="text"
                          value={siteContent[field.key] || ""}
                          onChange={(e) => handleContentFieldChange(field.key, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm font-medium"
                        />
                      )}
                      {field.helper && (
                        <p className="text-[11px] text-slate-400 mt-1">{field.helper}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Custom / Advanced Keys Tab */}
        {(!searchQuery && activeCategory === "custom") && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Custom Key & Advanced Field Creator</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add any new custom text key or edit existing raw properties directly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Text Field</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="Key Name (e.g. newNoticeText)"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                />
                <input
                  type="text"
                  value={customVal}
                  onChange={(e) => setCustomVal(e.target.value)}
                  placeholder="Content / Value"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
              <button
                type="button"
                onClick={handleAddCustom}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                + Add Field to Content Store
              </button>
            </div>

            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                All Active Content Keys ({Object.keys(siteContent).length})
              </h4>
              <div className="max-h-96 overflow-y-auto space-y-3 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                {Object.keys(siteContent).map((key) => (
                  <div key={key} className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-800 min-w-48">{key}:</span>
                    <input
                      type="text"
                      value={siteContent[key] || ""}
                      onChange={(e) => handleContentFieldChange(key, e.target.value)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleResetAllContent}
            className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
          >
            ↩ Reset to Original Defaults
          </button>
          <button
            type="submit"
            disabled={isSavingContent}
            className="px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md hover:shadow-emerald-900/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSavingContent ? "Saving Changes..." : "💾 Save All Text Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
