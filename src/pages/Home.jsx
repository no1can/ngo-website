import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../utils/contentStore";

const HOME_HERO_IMAGES = [
  { url: "/camps/shradnand_marg/shradnand_full_team.jpg", alt: "Tandicia Association Eye Camp Team and Doctors" },
  { url: "/camps/shradnand_marg/shradnand_police_memento.jpg", alt: "79th Delhi Police Week Memento Presentation" },
  { url: "/camps/camp2/2nd Camp/E2-3.jpeg", alt: "Tandicia Volunteers and Community Activity" },
  { url: "/camps/gao_thora/gao_thora_1.jpg", alt: "Gao Thora Eye Camp Consultation" },
  { url: "/sewa_rasoi/sewa_rasoi_main.jpg", alt: "Sewa Rasoi Food Service" },
  { url: "/camps/camp3/3rd camp/E3-12.jpeg", alt: "Tandicia Community Camp Gathering" },
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
    image: "/camps/shradnand_marg/shradnand_police_checkup.jpg",
    alt: "Doctor screening and trial frame eye checkup at Shradhanand Marg",
    caption: "Comprehensive eye screening and refraction testing at Shradhanand Marg",
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

const SHRADNAND_CAMP_PHOTOS = [
  {
    image: "/camps/shradnand_marg/shradnand_full_team.jpg",
    title: "समस्त मेडिकल टीम, वॉलंटियर्स एवं दिल्ली पुलिस सेन्ट्रल जिला टीम",
    badge: "मुख्य टीम एवं डॉक्टर्स • Shradhanand Marg",
    caption: "श्रद्धानन्द मार्ग महिला पुलिस चौकी पर आयोजित ऐतिहासिक स्वास्थ्य एवं नेत्र जांच शिविर",
    colSpan: "sm:col-span-2 lg:col-span-2",
  },
  {
    image: "/camps/shradnand_marg/shradnand_police_checkup.jpg",
    title: "विशेषज्ञ नेत्र परीक्षण एवं विज़न जांच",
    badge: "नेत्र परीक्षण • Eye Checkup",
    caption: "सब-इंस्पेक्टर किरण सेठी जी एवं महिलाओं का दृष्टि परीक्षण",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    image: "/camps/shradnand_marg/shradnand_police_memento.jpg",
    title: "79वें दिल्ली पुलिस सप्ताह पर तांदिशिया एसोसिएशन को सम्मान स्मृति चिन्ह",
    badge: "79वाँ दिल्ली पुलिस सप्ताह • Special Honor",
    caption: "उत्कृष्ट स्वास्थ्य व जनसेवा शिविर हेतु दिल्ली पुलिस द्वारा स्मृति चिन्ह भेंट",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    image: "/camps/shradnand_marg/shradnand_police_talk.jpg",
    title: "स्वास्थ्य, सुरक्षा व सशक्तिकरण पर विशेष जनसंवाद",
    badge: "जनसंवाद एवं मार्गदर्शन • Community Outreach",
    caption: "महिला पुलिस चौकी प्रांगण में महिलाओं व बच्चों को मार्गदर्शन एवं स्वास्थ्य सलाह",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
  {
    image: "/camps/shradnand_marg/shradnand_police_ceremony.jpg",
    title: "प्रोजेक्ट साहस एवं प्रोजेक्ट नव्या के तहत संयुक्त मंच",
    badge: "प्रोजेक्ट साहस व नव्या • Joint Initiative",
    caption: "लाभार्थी महिलाओं व दिल्ली पुलिस टीम के साथ सशक्तिकरण एवं सम्मान समारोह",
    colSpan: "sm:col-span-1 lg:col-span-1",
  },
];

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

function IconEye({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export default function Home() {
  const content = useContent();
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
        <section className="relative min-h-[75vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950">
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

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center text-white">
            

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-5 drop-shadow-[0_2px_20px_rgba(255,255,255,0.08)]">
              <span className="block">{content.heroHeading1}</span>
              <span className="block mt-1 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">{content.heroHeading2}</span>
            </h1>

            {/* Sub-headline with italic elegance */}
            <p className="text-base sm:text-2xl font-serif italic text-amber-200/90 font-normal tracking-wide max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed">
              {content.heroTagline || "Our Vision: Perfect Vision for All"}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <span className="h-[1px] w-8 bg-amber-400/40" />
              <span className="text-amber-400/60 text-xs">✦</span>
              <span className="h-[1px] w-8 bg-amber-400/40" />
            </div>

            {/* Supporting text */}
            <p className="text-sm sm:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-light">
              {content.heroSubtext || "Tandicia Association is a community-driven organisation bringing together volunteers, professionals, doctors, supporters, and everyday community members to address real social and community needs."}
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
              <Link
                to="/eye-camps"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{content.heroCta1Text || "Explore Eye Camps"}</span>
                <span className="text-base leading-none">→</span>
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{content.heroCta2Text || "Join Tandicia"}</span>
              </Link>
            </div>

            {/* Subtle Slideshow Navigation Indicators */}
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
              {HOME_HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentSlide
                      ? "w-7 sm:w-8 bg-amber-400 shadow-sm shadow-amber-400/50"
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
        <section className="py-12 sm:py-20 bg-stone-50 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  {content.programmesBadge || "Field Programmes"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                  {content.programmesHeading || "Our Work"}
                </h2>
              </div>
              <p className="text-slate-600 max-w-md mt-2 md:mt-0 text-xs sm:text-sm">
                {content.programmesSubtext || "Authentic, on-ground programmes designed to deliver tangible medical care, community wellness, and social solidarity."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              
              {/* Eye Camps Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src="/camps/camp3/3rd camp/E3-8.jpeg"
                    alt="Doctor examining elderly beneficiary at Eye Camp"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md">
                    Healthcare
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">{content.progEyeTitle || "Eye Camps"}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {content.progEyeDesc || "Accessible eye care, comprehensive screening, custom spectacles distribution, and medical doctor consultation for underserved communities."}
                    </p>
                  </div>
                  <Link
                    to="/eye-camps"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1.5 transition-all"
                  >
                    <span>{content.progEyeLinkText || "Explore Eye Camps →"}</span>
                  </Link>
                </div>
              </div>

              {/* Sewa Rasoi Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src="/sewa_rasoi/sewa_rasoi_main.jpg"
                    alt="Sewa Rasoi Daily Food Distribution"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-400/30 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md">
                    Community Kitchen
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">{content.progSewaTitle || "Sewa Rasoi"}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {content.progSewaDesc || "Daily community langar and nutritional support at Madhuban Chowk, serving hot, wholesome meals to hospital attendants, daily wagers, and needy families."}
                    </p>
                  </div>
                  <Link
                    to="/sewa-rasoi"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1.5 transition-all"
                  >
                    <span>{content.progSewaLinkText || "Explore Sewa Rasoi →"}</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 4 — IMPACT DASHBOARD (HIGH-TECH GLASS CARDS)
            ======================================================== */}
        <section id="impact" className="py-14 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white scroll-mt-20 relative overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {content.impactBadge || "VERIFIED RECORDS"}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-3 sm:mt-4">
                {content.impactHeading || "Impact Dashboard"}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3">
                Transparent data logged directly from ground registries and clinical camps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              
              {/* Card 1 - Eye Camps */}
              <div className="group relative p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-emerald-950/50 backdrop-blur-md flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/90 text-white flex items-center justify-center shadow-md">
                    <IconHospital className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    Live Record
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-emerald-400 block mb-1.5 group-hover:scale-105 transition-transform origin-left">
                    {content.stat2Number || "15+"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {content.stat2Label || "Eye Camps"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat2Desc || "Full-day clinical diagnostic screening camps"}
                  </p>
                </div>
                <Link to="/eye-camps" className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center justify-between group-hover:text-emerald-300 transition-colors">
                  <span>Verified Field Camps</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Card 2 - People Screened */}
              <div className="group relative p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-amber-950/50 backdrop-blur-md flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/90 text-white flex items-center justify-center shadow-md">
                    <IconUsers className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                    Beneficiaries
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-amber-400 block mb-1.5 group-hover:scale-105 transition-transform origin-left">
                    {content.stat1Number || "6,950+"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {content.stat1Label || "People Screened"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat1Desc || "Direct beneficiaries examined across communities"}
                  </p>
                </div>
                <Link to="/eye-camps" className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-amber-400 font-semibold flex items-center justify-between group-hover:text-amber-300 transition-colors">
                  <span>Individual OPD Logbooks</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Card 3 - Spectacles Distributed */}
              <div className="group relative p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-sky-500/30 hover:border-sky-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-sky-950/50 backdrop-blur-md flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-sky-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-600/90 text-white flex items-center justify-center shadow-md">
                    <IconEye className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/80 bg-sky-950/80 px-2 py-0.5 rounded-md border border-sky-500/30">
                    Eyewear
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-sky-400 block mb-1.5 group-hover:scale-105 transition-transform origin-left">
                    {content.stat3Number || "4,713+"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {content.stat3Label || "Spectacles Distributed"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat3Desc || "Free precision prescription corrective eyeglasses"}
                  </p>
                </div>
                <Link to="/eye-camps" className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-sky-400 font-semibold flex items-center justify-between group-hover:text-sky-300 transition-colors">
                  <span>Custom Fitted On-Site</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Card 4 - Volunteers & Doctors */}
              <div className="group relative p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-rose-500/30 hover:border-rose-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-rose-950/50 backdrop-blur-md flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/90 text-white flex items-center justify-center shadow-md">
                    <IconHandHeart className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400/80 bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-500/30">
                    Field Team
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-rose-400 block mb-1.5 group-hover:scale-105 transition-transform origin-left">
                    {content.stat4Number || "169+"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {content.stat4Label || "Volunteers & Doctors"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {content.stat4Desc || "Dedicated ophthalmologists, specialists & field volunteers"}
                  </p>
                </div>
                <Link to="/team" className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-rose-400 font-semibold flex items-center justify-between group-hover:text-rose-300 transition-colors">
                  <span>Equal Voluntary Service</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            जन जागरूकता अभियान — HEALTH & EYE AWARENESS POSTERS
            ======================================================== */}
        <section className="py-12 sm:py-20 bg-stone-100 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold block">
                Tandicia Association
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                जन जागरूकता अभियान
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2">
                स्वस्थ समाज • जागरूक समाज • सशक्त समाज
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {AWARENESS_POSTERS.map((poster) => (
                <div
                  key={poster.id}
                  onClick={() => setSelectedPoster(poster)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-500/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-transparent transition-colors" />
                    <span className="absolute top-3 right-3 bg-slate-950/80 text-white text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1 font-semibold shadow-md">
                      🔍 बड़ा देखें
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">
                        {poster.badge}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                        {poster.title}
                      </h4>
                    </div>
                    <span className="text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all text-sm font-bold">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 5 — EYE CAMPS SPOTLIGHT
            ======================================================== */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-16">
              
              {/* Rotating photograph on left */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-100 aspect-4/3 group bg-slate-900">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4 sm:p-6">
                        <p className="text-white text-xs sm:text-sm font-medium drop-shadow-sm pr-14 sm:pr-20">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Slide Indicators / Dots */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 z-20 flex gap-1.5 bg-black/40 backdrop-blur-xs px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full">
                    {EYE_CAMP_FEATURE_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCampPhotoSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === campPhotoSlide
                            ? "w-4 sm:w-5 bg-white"
                            : "w-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Left / Right mini navigation buttons */}
                  <button
                    onClick={() => setCampPhotoSlide((prev) => (prev - 1 + EYE_CAMP_FEATURE_SLIDES.length) % EYE_CAMP_FEATURE_SLIDES.length)}
                    aria-label="Previous slide"
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-sm"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCampPhotoSlide((prev) => (prev + 1) % EYE_CAMP_FEATURE_SLIDES.length)}
                    aria-label="Next slide"
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-75 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-sm"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Content on right */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Dedicated Programme
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  {content.eyeCampsHeading}
                </h2>
                <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                  {content.eyeCampsSubtext}
                </p>

                {/* 4 Pillars */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 border-t-2 border-t-sky-500 shadow-xs hover:shadow-md transition-all">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-800 uppercase tracking-wide block mb-0.5 sm:mb-1">Pillar 1</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Screening</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Comprehensive vision checks</p>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 border-t-2 border-t-emerald-500 shadow-xs hover:shadow-md transition-all">
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-0.5 sm:mb-1">Pillar 2</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Spectacles</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Prescription eyewear</p>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 border-t-2 border-t-amber-500 shadow-xs hover:shadow-md transition-all">
                    <span className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase tracking-wide block mb-0.5 sm:mb-1">Pillar 3</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Consultation</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Qualified doctors & advice</p>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 border-t-2 border-t-indigo-500 shadow-xs hover:shadow-md transition-all">
                    <span className="text-[10px] sm:text-xs font-bold text-indigo-800 uppercase tracking-wide block mb-0.5 sm:mb-1">Pillar 4</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Referrals</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">Hospital tie-ups</p>
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <Link
                    to="/eye-camps"
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 group"
                  >
                    <span>View All Eye Camps</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* UPCOMING CAMP BANNER SPOTLIGHT */}
            <div className="mb-10 sm:mb-14 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 border border-emerald-500/40 p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-emerald-400/30 shadow-2xl bg-slate-900 group">
                    <img
                      src="/shakurpur-eye-camp-banner.jpg"
                      alt="Upcoming Shakurpur Eye Camp 11-Oct-2026"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>★ Upcoming Eye Camp • 11-Oct-2026</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                    नि:शुल्क नेत्र जाँच शिविर — शकूरपुर कॉलोनी
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    ब्लॉक G, शकूरपुर कॉलोनी, नई दिल्ली (110034) • रविवार, 11 अक्टूबर 2026 (सुबह 10:00 से दोपहर 2:00 बजे तक)
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold pt-1">
                    <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-2.5 py-1 rounded-lg">✓ निःशुल्क नेत्र जाँच</span>
                    <span className="bg-amber-900/60 text-amber-300 border border-amber-700/50 px-2.5 py-1 rounded-lg">✓ नज़र के चश्में मुफ्त</span>
                    <span className="bg-sky-900/60 text-sky-300 border border-sky-700/50 px-2.5 py-1 rounded-lg">✓ सेवा भारती उपक्रम</span>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <Link
                      to="/eye-camps"
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Camp Details & Timings</span>
                      <span>→</span>
                    </Link>
                    <Link
                      to="/contact?interest=Camp-Volunteer"
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-all"
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
            SECTION 7 — ON-GROUND VIDEO SPOTLIGHT
            ======================================================== */}
        <section className="py-14 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
          {/* Ambient glow effects */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-[11px] sm:text-xs uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Live On-Ground Video
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
                महिला सशक्तिकरण एवं स्वास्थ्य अभियान — श्रद्धानन्द मार्ग
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
                महिला पुलिस चौकी, दिल्ली पुलिस सेन्ट्रल जिला (श्रद्धानन्द मार्ग, अजमेरी गेट) • प्रोजेक्ट साहस एवं प्रोजेक्ट नव्या के तहत संवेदना, सहयोग और सशक्तिकरण का साझा प्रयास।
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/20 via-amber-500/10 to-emerald-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black group">
                <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  >
                    <source src="/videos/shradnand_marg_special_video.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
                <div className="p-4 sm:p-6 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-0.5">
                      Delhi Police Central District • Special Initiative
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                      Tandicia Association एवं दिल्ली पुलिस का संयुक्त स्वास्थ्य, विज़न एवं पुनर्वास जागरूकता सत्र
                    </p>
                  </div>
                  <Link
                    to="/eye-camps"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 self-start sm:self-auto"
                  >
                    <span>Explore All Camps</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 5-Photo On-Ground Gallery Grid */}
            <div className="mt-12 sm:mt-16">
              <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-[11px] sm:text-xs uppercase tracking-widest font-bold">
                  On-Ground Photo Gallery
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
                  शिविर की ऐतिहासिक झलकियाँ
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
                  फोटो पर क्लिक करके फुल स्क्रीन में देखें (Click any photo to enlarge)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {SHRADNAND_CAMP_PHOTOS.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPoster({ title: item.title, badge: item.badge, image: item.image })}
                    className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-950/30 hover:-translate-y-1 flex flex-col ${item.colSpan || ''}`}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold text-emerald-300 shadow-md">
                          {item.badge}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md rounded-full p-2 text-white shadow-md">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {item.caption}
                        </p>
                      </div>
                      <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                        <span>फोटो बड़ा करके देखें</span>
                        <span className="group-hover:translate-x-1 transition-transform">🔍 →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 8 — MEDIA
            ======================================================== */}
        <section className="py-14 sm:py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  {content.storiesBadge || "Moments & Coverage"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                  {content.storiesHeading || "Stories from the Field"}
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-3 md:mt-0">
                <Link to="/media" className="text-xs sm:text-sm font-semibold text-emerald-800 hover:underline">
                  Read Stories →
                </Link>
                <Link to="/media#gallery" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900">
                  View Gallery →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Featured Large Story */}
              <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-60 sm:h-80 overflow-hidden bg-slate-900">
                  <img
                    src="/story1.png"
                    alt="Beneficiary story"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1.5 sm:mb-2">
                      Featured Field Story
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-emerald-800 transition-colors">
                      {content.storyMainTitle || "Restoring Clear Sight to Smt. Ram Dulari"}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-serif">
                      {content.storyMainQuote || `"I could not thread a needle or recognize my grandchildren from across the verandah. Today, with the spectacles from Tandicia doctors, the entire world is clear again."`}
                    </p>
                  </div>
                  <div className="pt-4 sm:pt-6">
                    <Link to="/media" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1 transition-all">
                      <span>Read Full Story</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3 Smaller Story Cards */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-md transition-all flex gap-4 items-center group">
                  <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img src="/gallery/image4.png" alt="Volunteer session" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-emerald-800 font-bold uppercase tracking-wider">Eye Care Mission</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition-colors mt-0.5">{content.story2Title || "Sunday Free Vision Diagnostic"}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{content.story2Desc || "Over a hundred residents examined by our voluntary team."}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-md transition-all flex gap-4 items-center group">
                  <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img src="/camps/budh_vihar/budh_vihar_1.jpg" alt="Spectacles distribution" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-sky-800 font-bold uppercase tracking-wider">Vision Assistance</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition-colors mt-0.5">{content.story3Title || "Free Spectacles Distribution"}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{content.story3Desc || "Providing precision corrective eyewear to elderly residents."}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-md transition-all flex gap-4 items-center group">
                  <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img src="/gallery/image6.png" alt="Community gathering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-indigo-800 font-bold uppercase tracking-wider">Community Circle</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition-colors mt-0.5">{content.story4Title || "Standing With Single Mothers"}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{content.story4Desc || "Providing moral support, counseling, and guidance."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POSTER LIGHTBOX MODAL */}
        {selectedPoster && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedPoster(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-7 flex flex-col my-4 sm:my-8 border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div>
                  <span className="text-[11px] sm:text-xs text-emerald-800 font-extrabold uppercase tracking-wider block mb-0.5">
                    {selectedPoster.badge}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900">
                    {selectedPoster.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPoster(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 font-bold flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-xs"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="pt-4 flex items-center justify-center overflow-auto max-h-[80vh]">
                <img
                  src={selectedPoster.image}
                  alt={selectedPoster.title}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-lg"
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