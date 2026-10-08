import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTeamMembers } from "../utils/teamStore";
import { useContent } from "../utils/contentStore";

const HOME_HERO_IMAGES = [
  { url: "/camps/camp2/2nd Camp/E2-3.jpeg", alt: "Tandicia Volunteers and Community Activity" },
  { url: "/camps/gao_thora/gao_thora_1.jpg", alt: "Gao Thora Eye Camp Consultation" },
  { url: "/sewa_rasoi/sewa_rasoi_3.jpg", alt: "Sewa Rasoi Food Service" },
  { url: "/camps/camp3/3rd camp/E3-12.jpeg", alt: "Tandicia Community Camp Gathering" },
  { url: "/camps/shradnand_marg/shradnand_4.jpg", alt: "Shraddhanand Marg Vision Camp" },
];

const AWARENESS_POSTERS = [
  {
    id: "diabetic-retinopathy",
    title: "मधुमेह से आँखों की रक्षा",
    badge: "Diabetic Retinopathy",
    image: "/awareness/diabetic_retinopathy.jpg",
  },
  {
    id: "glaucoma",
    title: "ग्लूकोमा के लक्षण पहचानें और तुरंत कराएं इलाज",
    badge: "Glaucoma Awareness",
    image: "/awareness/glaucoma_awareness.jpg",
  },
  {
    id: "blood-sugar",
    title: "हाई ब्लड शुगर को पहचानें, नियंत्रित करें",
    badge: "Blood Sugar Control",
    image: "/awareness/blood_sugar_awareness.jpg",
  },
  {
    id: "diabetes-10-causes",
    title: "डायबिटीज होने के 10 कारण पहचान लें",
    badge: "Diabetes Prevention",
    image: "/awareness/diabetes_10_causes.jpg",
  },
  {
    id: "diabetes-vertical",
    title: "डायबिटीज होने के 10 कारण (विस्तृत पोस्टर)",
    badge: "Health Awareness",
    image: "/awareness/diabetes_vertical.jpg",
  },
];

const EYE_CAMP_FEATURE_SLIDES = [
  {
    image: "/camps/camp1/1st Camp/E1-4.jpeg",
    alt: "Doctor screening an elderly beneficiary at Tandicia Eye Camp",
    caption: "On-site diagnostic screening by qualified eye specialists",
  },
  {
    image: "/camps/camp2/2nd Camp/E2-3.jpeg",
    alt: "Computerized autorefractor examination at Kusumpur Pahari",
    caption: "Computerized autorefractor examination & vision diagnostics",
  },
  {
    image: "/camps/camp3/3rd camp/E3-10.jpeg",
    alt: "Doctor performing eye checkup at Tandicia camp",
    caption: "Diagnostic eye checkups and customized prescription testing",
  },
  {
    image: "/camps/budh_vihar/budh_vihar_1.jpg",
    alt: "Doctor consultation and spectacles distribution at Budh Vihar",
    caption: "Free custom prescription spectacles fitting & distribution",
  },
  {
    image: "/camps/gao_thora/gao_thora_1.jpg",
    alt: "Direct grassroots healthcare outreach at Gao Thora",
    caption: "Direct healthcare outreach serving grassroots communities",
  },
  {
    image: "/camps/shradnand_marg/shradnand_3.jpg",
    alt: "Compassionate specialist medical care at Shradhanand Marg",
    caption: "Compassionate specialist medical care and cataract referrals",
  },
];

export default function Home() {
  const content = useContent();
  const teamMembers = useTeamMembers();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campPhotoSlide, setCampPhotoSlide] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCampPhotoSlide((prev) => (prev + 1) % EYE_CAMP_FEATURE_SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans">
      <Navbar />

      <main>
        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950">
          {/* Animated Background Image Slideshow with Smooth Crossfade & Subtle Zoom */}
          <div className="absolute inset-0 z-0">
            {HOME_HERO_IMAGES.map((img, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={img.url}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className={`w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.1] saturate-[0.95] transition-transform duration-[7000ms] ease-out ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
              );
            })}
            {/* Warm cinematic gradient overlay */}
            <div className="absolute inset-0 z-2 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 pointer-events-none" />
            <div className="absolute inset-0 z-2 bg-gradient-to-b from-emerald-950/25 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
            

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-5 drop-shadow-[0_2px_20px_rgba(255,255,255,0.08)]">
              <span className="block">{content.heroHeading1}</span>
              <span className="block mt-1 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">{content.heroHeading2}</span>
            </h1>

            {/* Sub-headline with italic elegance */}
            <p className="text-lg sm:text-2xl font-serif italic text-amber-200/90 font-normal tracking-wide max-w-3xl mx-auto mb-4 leading-relaxed">
              {content.heroTagline || "Our Vision: Perfect Vision for All"}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="h-[1px] w-8 bg-amber-400/40" />
              <span className="text-amber-400/60 text-xs">✦</span>
              <span className="h-[1px] w-8 bg-amber-400/40" />
            </div>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              {content.heroSubtext || "Tandicia Association is a community-driven organisation bringing together volunteers, professionals, doctors, supporters, and everyday community members to address real social and community needs."}
            </p>

            {/* Subtle Slideshow Navigation Indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {HOME_HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentSlide
                      ? "w-8 bg-amber-400 shadow-sm shadow-amber-400/50"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none" />
        </section>
        {/* ========================================================
            SECTION 3 — OUR WORK
            ======================================================== */}
        <section className="py-20 bg-stone-50 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  {content.programmesBadge || "Field Programmes"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                  {content.programmesHeading || "Our Work"}
                </h2>
              </div>
              <p className="text-slate-600 max-w-md mt-4 md:mt-0 text-sm">
                {content.programmesSubtext || "Authentic, on-ground programmes designed to deliver tangible medical care, community wellness, and social solidarity."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Eye Camps Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src="/camps/camp3/3rd camp/E3-8.jpeg"
                    alt="Doctor examining elderly beneficiary at Eye Camp"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-sky-950/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs">
                    Healthcare
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{content.progEyeTitle || "Eye Camps"}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {content.progEyeDesc || "Accessible eye care, comprehensive screening, custom spectacles distribution, and medical doctor consultation for underserved communities."}
                    </p>
                  </div>
                  <Link
                    to="/eye-camps"
                    className="inline-flex items-center text-sm font-semibold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1 transition-all"
                  >
                    {content.progEyeLinkText || "Explore Eye Camps →"}
                  </Link>
                </div>
              </div>

              {/* Sewa Rasoi Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src="/sewa_rasoi/sewa_rasoi_3.jpg"
                    alt="Sewa Rasoi Daily Food Distribution"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-900/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs">
                    Community Kitchen
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{content.progSewaTitle || "Sewa Rasoi"}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {content.progSewaDesc || "Daily community langar and nutritional support at Madhuban Chowk, serving hot, wholesome meals to hospital attendants, daily wagers, and needy families."}
                    </p>
                  </div>
                  <Link
                    to="/sewa-rasoi"
                    className="inline-flex items-center text-sm font-semibold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1 transition-all"
                  >
                    {content.progSewaLinkText || "Explore Sewa Rasoi →"}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            जन जागरूकता अभियान — HEALTH & EYE AWARENESS POSTERS
            ======================================================== */}
        <section className="py-20 bg-stone-100 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold block">
                Tandicia Association
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                जन जागरूकता अभियान
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                स्वस्थ समाज • जागरूक समाज • सशक्त समाज
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {AWARENESS_POSTERS.map((poster) => (
                <div
                  key={poster.id}
                  onClick={() => setSelectedPoster(poster)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-transparent transition-colors" />
                    <span className="absolute top-3 right-3 bg-slate-950/80 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 font-medium shadow-xs">
                      🔍 बड़ा देखें
                    </span>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">
                        {poster.badge}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
                        {poster.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 5 — EYE CAMPS SPOTLIGHT
            ======================================================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              
              {/* Rotating photograph on left */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 aspect-4/3 group bg-slate-900">
                  {EYE_CAMP_FEATURE_SLIDES.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        idx === campPhotoSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
                        <p className="text-white text-sm font-medium drop-shadow-sm pr-20">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Slide Indicators / Dots */}
                  <div className="absolute bottom-4 right-5 z-20 flex gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1.5 rounded-full">
                    {EYE_CAMP_FEATURE_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCampPhotoSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === campPhotoSlide
                            ? "w-5 bg-white"
                            : "w-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Left / Right mini navigation buttons */}
                  <button
                    onClick={() => setCampPhotoSlide((prev) => (prev - 1 + EYE_CAMP_FEATURE_SLIDES.length) % EYE_CAMP_FEATURE_SLIDES.length)}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCampPhotoSlide((prev) => (prev + 1) % EYE_CAMP_FEATURE_SLIDES.length)}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Content on right */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Dedicated Programme
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  {content.eyeCampsHeading}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {content.eyeCampsSubtext}
                </p>

                {/* 4 Pillars */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-sky-900 uppercase tracking-wide block mb-1">Pillar 1</span>
                    <h4 className="text-base font-bold text-slate-900">Screening</h4>
                    <p className="text-xs text-slate-500 mt-1">Comprehensive vision checks</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wide block mb-1">Pillar 2</span>
                    <h4 className="text-base font-bold text-slate-900">Spectacles</h4>
                    <p className="text-xs text-slate-500 mt-1">Prescription corrective eyewear</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-amber-900 uppercase tracking-wide block mb-1">Pillar 3</span>
                    <h4 className="text-base font-bold text-slate-900">Medical Consultation</h4>
                    <p className="text-xs text-slate-500 mt-1">Qualified doctors & advice</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wide block mb-1">Pillar 4</span>
                    <h4 className="text-base font-bold text-slate-900">Referrals</h4>
                    <p className="text-xs text-slate-500 mt-1">Hospital tie-ups for surgery</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/eye-camps"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    View All Eye Camps →
                  </Link>
                </div>
              </div>

            </div>

            {/* UPCOMING CAMP BANNER SPOTLIGHT */}
            <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 border-2 border-emerald-500/50 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-emerald-400/30 shadow-lg bg-slate-900">
                    <img
                      src="/shakurpur-eye-camp-banner.jpg"
                      alt="Upcoming Shakurpur Eye Camp 11-Oct-2026"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>★ Upcoming Eye Camp • 11-Oct-2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    नि:शुल्क नेत्र जाँच शिविर — शकूरपुर कॉलोनी
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    ब्लॉक G, शकूरपुर कॉलोनी, नई दिल्ली (110034) • रविवार, 11 अक्टूबर 2026 (सुबह 10:00 से दोपहर 2:00 बजे तक)
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold pt-1">
                    <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-3 py-1 rounded-lg">✓ निःशुल्क नेत्र जाँच</span>
                    <span className="bg-amber-900/60 text-amber-300 border border-amber-700/50 px-3 py-1 rounded-lg">✓ नज़र के चश्में भी मुफ्त</span>
                    <span className="bg-sky-900/60 text-sky-300 border border-sky-700/50 px-3 py-1 rounded-lg">✓ सेवा भारती संयुक्त उपक्रम</span>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to="/eye-camps"
                      className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Camp Details & Timings</span>
                      <span>→</span>
                    </Link>
                    <Link
                      to="/contact?interest=Camp-Volunteer"
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-all"
                    >
                      Volunteer for This Camp
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Camp Cards with Real Photos & Verified Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {/* Camp - Budh Vihar */}
              <div className="rounded-3xl border border-slate-200 p-5 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ring-1 ring-emerald-500/20">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img src="/camps/budh_vihar/budh_vihar_1.jpg" alt="Budh Vihar Camp Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                      Eye Camp
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-slate-950/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      20 Sep 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                    <span>📍</span>
                    <span>Budh Vihar, North West Delhi</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                    Budh Vihar Camp
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Comprehensive community eye screening, computerized autorefraction, prescription eyewear, and senior doctor consultations.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">✓ Eye Screening</span>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md">✓ Free Eyewear</span>
                    <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">✓ Video Live</span>
                  </div>
                </div>
                <Link
                  to="/eye-camps"
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Explore Camp Details</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Camp - Gao Thora */}
              <div className="rounded-3xl border border-slate-200 p-5 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ring-1 ring-emerald-500/20">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img src="/camps/gao_thora/gao_thora_1.jpg" alt="Gao Thora Camp Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                      Eye Camp
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-slate-950/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      14 Jun 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                    <span>📍</span>
                    <span>Gao Thora, Near Jewar, UP</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                    Gao Thora Camp
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Rural vision diagnostic checkups, autorefraction testing, senior doctor consultations, and free prescription spectacles for village elders.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">✓ Autorefraction</span>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md">✓ Free Eyeglasses</span>
                    <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">✓ Video Live</span>
                  </div>
                </div>
                <Link
                  to="/eye-camps"
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Explore Camp Details</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Camp 3 - Mewla Maharajpur */}
              <div className="rounded-3xl border border-slate-200 p-5 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img src="/camps/camp3/3rd camp/E3-3.jpeg" alt="Mewla Maharajpur Camp Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                      Eye Camp
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-slate-950/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      12 Oct 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                    <span>📍</span>
                    <span>Mewla Maharajpur, Faridabad, Haryana</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                    Mewla Maharajpur Camp
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Deepak Bensla Baithak. Cross-border Haryana eye camp with retinoscopy, prescription eyeglasses, and news coverage.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">✓ Retinoscopy</span>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md">✓ Frame Dispensing</span>
                    <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">✓ Media Coverage</span>
                  </div>
                </div>
                <Link
                  to="/eye-camps"
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Explore Camp Details</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Camp 2 - Kusumpur Pahari */}
              <div className="rounded-3xl border border-slate-200 p-5 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img src="/camps/camp2/2nd Camp/E2-3.jpeg" alt="Kusumpur Pahari Camp Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                      Eye Camp
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-slate-950/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      14 Sep 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                    <span>📍</span>
                    <span>Kusumpur Pahari, Block-C, New Delhi</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                    Kusumpur Pahari Camp
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Sherawali Mata Mandir. High-turnout camp with AR-9 Autorefractors, vision checkups, and free medicines.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">✓ AR-9 Refraction</span>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md">✓ Free Eyewear</span>
                    <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">✓ Cataract Referrals</span>
                  </div>
                </div>
                <Link
                  to="/eye-camps"
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Explore Camp Details</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Camp 1 - Bhati Mines */}
              <div className="rounded-3xl border border-slate-200 p-5 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img src="/camps/camp1/1st Camp/E1-4.jpeg" alt="Bhati Mines Camp Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                      Eye Camp
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-slate-950/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      29 Aug 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                    <span>📍</span>
                    <span>Bhati Mines, Sanjay Colony, New Delhi</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                    Bhati Mines Camp
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    Abhyudaya A-116/A. Comprehensive eye diagnostics, free prescription spectacles, and doctor consultations.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">✓ Eye Screening</span>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md">✓ Free Spectacles</span>
                    <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">✓ Dr. Atul Garg</span>
                  </div>
                </div>
                <Link
                  to="/eye-camps"
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Explore Camp Details</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 8 — MEDIA
            ======================================================== */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  {content.storiesBadge || "Moments & Coverage"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                  {content.storiesHeading || "Stories from the Field"}
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link to="/media" className="text-sm font-semibold text-emerald-800 hover:underline">
                  Read Stories →
                </Link>
                <Link to="/media#gallery" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                  View Gallery →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured Large Story */}
              <div className="lg:col-span-7 bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 flex flex-col">
                <img
                  src="/story1.png"
                  alt="Beneficiary story"
                  className="w-full h-80 object-cover"
                />
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-2">
                      Featured Field Story
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {content.storyMainTitle || "Restoring Clear Sight to Smt. Ram Dulari"}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {content.storyMainQuote || `"I could not thread a needle or recognize my grandchildren from across the verandah. Today, with the spectacles from Tandicia doctors, the entire world is clear again."`}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link to="/media" className="text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3 Smaller Story Cards */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 flex gap-4 items-center">
                  <img src="/gallery/image4.png" alt="Volunteer session" className="w-24 h-24 object-cover rounded-xl" />
                  <div>
                    <span className="text-xs text-emerald-800 font-semibold">Eye Care Mission</span>
                    <h4 className="text-base font-bold text-slate-900">{content.story2Title || "Sunday Free Vision Diagnostic"}</h4>
                    <p className="text-xs text-slate-500 mt-1">{content.story2Desc || "Over a hundred residents examined by our voluntary team."}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 flex gap-4 items-center">
                  <img src="/camps/camp2/2nd camp/E2-5.jpeg" alt="Spectacles distribution" className="w-24 h-24 object-cover rounded-xl" />
                  <div>
                    <span className="text-xs text-sky-800 font-semibold">Vision Assistance</span>
                    <h4 className="text-base font-bold text-slate-900">{content.story3Title || "Free Spectacles Distribution"}</h4>
                    <p className="text-xs text-slate-500 mt-1">{content.story3Desc || "Providing precision corrective eyewear to elderly residents."}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 flex gap-4 items-center">
                  <img src="/gallery/image6.png" alt="Community gathering" className="w-24 h-24 object-cover rounded-xl" />
                  <div>
                    <span className="text-xs text-sky-800 font-semibold">Community Circle</span>
                    <h4 className="text-base font-bold text-slate-900">{content.story4Title || "Standing With Single Mothers"}</h4>
                    <p className="text-xs text-slate-500 mt-1">{content.story4Desc || "Providing moral support, counseling, and guidance."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 9 — TEAM
            ======================================================== */}
        <section className="py-20 bg-stone-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/camps/camp1/1st Camp/E1-1.jpeg"
                  alt="Tandicia Team and Volunteers"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Our Community
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  The People Behind Tandicia
                </h2>
                <p className="text-slate-600 text-base leading-relaxed italic">
                  "Tandicia is powered by people who believe that meaningful change begins when we come together."
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  From experienced medical doctors and field coordinators to devoted citizens giving their time, our collective strength lies in pure service and empathy.
                </p>
                <div className="pt-2">
                  <Link
                    to="/team"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                  >
                    <span>Meet All {teamMembers.length} Volunteers</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POSTER LIGHTBOX MODAL */}
        {selectedPoster && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPoster(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    {selectedPoster.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {selectedPoster.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPoster(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center cursor-pointer transition-colors shrink-0"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="pt-4 flex items-center justify-center overflow-auto max-h-[80vh]">
                <img
                  src={selectedPoster.image}
                  alt={selectedPoster.title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-md"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}