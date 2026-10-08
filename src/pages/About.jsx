import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../utils/contentStore";

// =========================================================================
// CRISP MODERN SVG ICONS
// =========================================================================
function IconHospital({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function IconUsers({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function IconHandHeart({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  );
}

function IconSparkles({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function IconEye({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export default function About() {
  const content = useContent();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main>
        {/* ========================================================
            1. HERO SECTION — IMMERSIVE & PRESTIGIOUS
            ======================================================== */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
          {/* Background Image with Rich Tinted Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/camps/camp3/3rd camp/E3-12.jpeg"
              alt="Tandicia community camp gathering"
              className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.1] scale-105 transform motion-safe:animate-pulse duration-[12000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {content.aboutHeading || "About Tandicia Association"}
            </h1>

            {/* Elegant Tagline */}
            <p className="text-2xl sm:text-3xl lg:text-4xl text-amber-300 font-serif font-light mb-6 drop-shadow-xs">
              {content.aboutTagline || "Our Vision: Perfect Vision for All"}
            </p>

            {/* Subtext */}
            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              {content.aboutSubtext || "Connecting People. Serving Communities. Being There for Each Other."}
            </p>
          </div>
        </section>

        {/* ========================================================
            2. SECTION — WHO WE ARE (2-COLUMN EDITORIAL STORY)
            ======================================================== */}
        <section id="who-we-are" className="py-24 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Narrative Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                  <IconEye className="w-4 h-4 text-emerald-700" />
                  Grassroots Commitment
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                  {content.aboutWhoHeading || "Who We Are"}
                </h2>

                <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 rounded-full" />

                <p className="text-xl text-slate-800 font-medium leading-relaxed pt-2">
                  {content.aboutWhoP1 || "Tandicia Association is a community-driven organisation bringing together volunteers, professionals, doctors, supporters, and everyday community members to address real social and community needs."}
                </p>

                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  {content.aboutWhoP2 || "We believe that the most powerful social change does not happen from distant offices, but on the ground—where people meet as equals. Whether it is screening the eyes of an elder who cannot afford an examination, serving a hot meal with genuine dignity, or standing by a family navigating crisis, Tandicia exists to be there."}
                </p>

                {/* Highlight Quote Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-amber-50/50 border-l-4 border-emerald-700 text-slate-800 shadow-xs">
                  <p className="italic text-base sm:text-lg leading-relaxed font-serif text-slate-800">
                    {content.aboutWhoQuote || `"Our guiding light is simple: service rooted in respect, friendships that cross social boundaries, and a sense of shared belonging that leaves no one behind."`}
                  </p>
                  <p className="text-xs uppercase tracking-wider font-bold text-emerald-800 mt-3">
                    — Tandicia Association Founding Ethos
                  </p>
                </div>

                {/* Feature Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">✓</span>
                    <span>100% Volunteer Driven</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">✓</span>
                    <span>Direct On-Site Care</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">✓</span>
                    <span>Zero Profit Mission</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Visual Collage */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                  <img
                    src="/camps/camp3/3rd camp/E3-12.jpeg"
                    alt="Volunteers and Doctors at work"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Stat Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
                      <IconEye className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-extrabold text-slate-900">15+ Eye Camps</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Over 6,950+ screened & 4,713+ spectacles fitted</p>
                    </div>
                  </div>
                </div>

                {/* Secondary Inset Image */}
                <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-200">
                  <img
                    src="/camps/camp1/1st Camp/E1-1.jpeg"
                    alt="Doctors examining patient"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            3. SECTION — IMPACT DASHBOARD (HIGH-TECH GLASS CARDS)
            ======================================================== */}
        <section id="impact" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white scroll-mt-20 relative overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {content.impactBadge || "VERIFIED RECORDS"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
                {content.impactHeading || "Impact Dashboard"}
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                Transparent data logged directly from ground registries and clinical camps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1 - Eye Camps */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400/70 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-emerald-950/50 backdrop-blur-sm flex flex-col justify-between">
                <div className="absolute top-0 right-8 transform -translate-y-1/2 w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <IconHospital className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-5xl font-black font-mono tracking-tight text-emerald-400 block mb-2 group-hover:scale-105 transition-transform origin-left">
                    {content.stat2Number || "15+"}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {content.stat2Label || "Eye Camps"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat2Desc || "Full-day clinical diagnostic screening camps"}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Verified Field Camps</span>
                  <span>→</span>
                </div>
              </div>

              {/* Card 2 - People Screened */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-amber-950/50 backdrop-blur-sm flex flex-col justify-between">
                <div className="absolute top-0 right-8 transform -translate-y-1/2 w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                  <IconUsers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-5xl font-black font-mono tracking-tight text-amber-400 block mb-2 group-hover:scale-105 transition-transform origin-left">
                    {content.stat1Number || "6,950+"}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {content.stat1Label || "People Screened"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat1Desc || "Direct beneficiaries examined across communities"}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                  <span>Individual OPD Logbooks</span>
                  <span>→</span>
                </div>
              </div>

              {/* Card 3 - Spectacles Distributed */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-sky-500/30 hover:border-sky-400/70 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-sky-950/50 backdrop-blur-sm flex flex-col justify-between">
                <div className="absolute top-0 right-8 transform -translate-y-1/2 w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <IconEye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-5xl font-black font-mono tracking-tight text-sky-400 block mb-2 group-hover:scale-105 transition-transform origin-left">
                    {content.stat3Number || "4,713+"}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {content.stat3Label || "Spectacles Distributed"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat3Desc || "Free precision prescription corrective eyeglasses"}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-sky-400 font-semibold flex items-center gap-1">
                  <span>Custom Fitted On-Site</span>
                  <span>→</span>
                </div>
              </div>

              {/* Card 4 - Volunteers & Doctors */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-rose-500/30 hover:border-rose-400/70 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-rose-950/50 backdrop-blur-sm flex flex-col justify-between">
                <div className="absolute top-0 right-8 transform -translate-y-1/2 w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <IconHandHeart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-5xl font-black font-mono tracking-tight text-rose-400 block mb-2 group-hover:scale-105 transition-transform origin-left">
                    {content.stat4Number || "169+"}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {content.stat4Label || "Volunteers & Doctors"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat4Desc || "Dedicated ophthalmologists, specialists & field volunteers"}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-rose-400 font-semibold flex items-center gap-1">
                  <span>Equal Voluntary Service</span>
                  <span>→</span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ========================================================
            5. SECTION — OUR JOURNEY (ELEVATED VISUAL ROADMAP)
            ======================================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Historical Milestones
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mt-3">
                Our Journey on the Ground
              </h2>
              <p className="text-slate-600 text-base mt-2">
                Key verified milestones achieved through community solidarity.
              </p>
            </div>

            {/* Visual Timeline */}
            <div className="relative border-l-2 border-emerald-600/30 ml-4 md:ml-12 space-y-16">
              
              {/* Milestone 1 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-emerald-700 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Phase 1</span>
                  <span>•</span>
                  <span>Inception</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Formation of Tandicia Association
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mt-2 mb-5 max-w-2xl">
                  Born from a shared realization that accessible healthcare and clear sight are fundamental human rights, professionals and community volunteers united with a single mission: <span className="font-semibold text-slate-800">Our Vision — Perfect Vision for All</span>.
                </p>
                <div className="rounded-2xl overflow-hidden border-2 border-white shadow-lg max-w-xl group-hover:shadow-xl transition-shadow">
                  <img src="/camps/camp1/1st Camp/E1-1.jpeg" alt="Inception core team" className="w-full h-56 object-cover" />
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-sky-700 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Phase 2</span>
                  <span>•</span>
                  <span>Clinical Outreach</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Launch of Community Eye Care Camps
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mt-2 mb-5 max-w-2xl">
                  Mobilized certified ophthalmologists and volunteers to conduct free diagnostic eye screening camps across Delhi communities (Kusumpur Pahari & Bhati Mines), distributing prescription spectacles and identifying surgical cases.
                </p>
                <div className="rounded-2xl overflow-hidden border-2 border-white shadow-lg max-w-xl group-hover:shadow-xl transition-shadow">
                  <img src="/camps/camp3/3rd camp/E3-3.jpeg" alt="Eye camp launch and doctor examination" className="w-full h-56 object-cover" />
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-amber-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Phase 3</span>
                  <span>•</span>
                  <span>Community Expansion</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Expansion of Grassroots Health & Relief Drives
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mt-2 mb-5 max-w-2xl">
                  Commenced volunteer-driven outreach programmes providing free vision care, patient support, and health relief directly to underserved neighbourhoods across NCR and Haryana.
                </p>
                <div className="rounded-2xl overflow-hidden border-2 border-white shadow-lg max-w-xl group-hover:shadow-xl transition-shadow">
                  <img src="/camps/camp2/2nd Camp/E2-3.jpeg" alt="Grassroots health drives" className="w-full h-56 object-cover" />
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-indigo-700 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Phase 4</span>
                  <span>•</span>
                  <span>Broadening Horizons</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Inauguration of Nai Pehal Platform
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mt-2 mb-5 max-w-2xl">
                  Expanded beyond healthcare to support elderly citizens living alone, assist single-parent households, and run community welfare networks through specialized social circles.
                </p>
                <div className="rounded-2xl overflow-hidden border-2 border-white shadow-lg max-w-xl group-hover:shadow-xl transition-shadow">
                  <img src="/story2.png" alt="Nai Pehal expansion" className="w-full h-56 object-cover" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            6. FINAL INVITATION CTA
            ======================================================== */}
        <section className="relative py-24 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs uppercase tracking-widest font-bold">
              <IconSparkles className="w-4 h-4 text-emerald-300" />
              Walk With Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Be Part of This Community Movement
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Whether you are a medical doctor, an optometry student, a working professional, or simply a caring citizen, there is a place of honor for you at Tandicia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                to="/contact?interest=Volunteering"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
              >
                Join as Volunteer
              </Link>
              <Link
                to="/donate"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Support Our Work</span>
                <span className="text-amber-300">♥</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}