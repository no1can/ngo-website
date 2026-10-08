import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCustomPhotos } from "../utils/photoStore";

const verifiedCamps = [
  {
    id: "camp-delhi-bhati-mines",
    campNumber: "Camp 1",
    tag: "CAMP 01",
    title: "Camp 1 — Bhati Mines, New Delhi",
    name: "Camp 1 — Bhati Mines Free Eye Screening Camp",
    year: "2025",
    location: "Abhyudaya, A-116/A, Sanjay Colony, Bhati Mines, New Delhi - 110074",
    date: "29 August 2025",
    peopleServed: "Verified On-Site Records",
    supportSummary: "नि:शुल्क नेत्र जांच शिविर — Diagnostic refraction, doctor consultation, and prescription spectacles",
    image: "/camps/camp1/1st Camp/E1-4.jpeg",
    video: "/camps/camp1/1st Camp/E1-9.mp4",
    objective: "Reaching daily wage earners, elder residents, and remote families in the Bhati Mines region with critical eye health diagnosis.",
    medicalTeam: "Dr. Atul Garg, M.B.B.S., M.S. (Eye), Senior Eye Surgeon, Centre for Eyes & Medical Volunteer Team",
    volunteers: "Tandicia Association Core Field Team & Sanjay Colony Local Youth",
    eventsList: [
      { name: "Visual Acuity & Refraction Screening", desc: "On-site eye testing using Snellen charts and diagnostic trial lenses." },
      { name: "Senior Surgeon Consultation", desc: "One-on-one ophthalmic diagnosis by Dr. Atul Garg (Centre for Eyes)." },
      { name: "Prescription Spectacles Fitting", desc: "Custom reading and distance corrective eyeglasses fitted on-site." },
      { name: "Essential Eye Medication", desc: "Free distribution of prophylactic eye drops, lubricants, and allergy drops." },
      { name: "Cataract Surgery Referrals", desc: "Identified advanced cataract cases provided formal OPD referral slips." }
    ],
    servicesProvided: "Visual acuity assessment, refraction correction, slit-lamp evaluation, eye drop distribution.",
    spectaclesDistributed: "Custom prescription corrective glasses provided free of cost.",
    referrals: "Specialist OPD referral slips issued in collaboration with Centre for Eyes.",
    mediaCoverage: "Documented in village community records and Tandicia field archives.",
    gallery: [
      "/camps/camp1/1st Camp/E1-4.jpeg",
      "/camps/camp1/1st Camp/E1-6.jpeg",
      "/camps/camp1/1st Camp/E1-8.jpeg",
      "/camps/camp1/1st Camp/E1-1.jpeg",
      "/camps/camp1/1st Camp/E1-3.jpeg",
      "/camps/camp1/1st Camp/E1-10.jpeg",
      "/camps/camp1/1st Camp/E1-11.jpeg",
      "/camps/camp1/1st Camp/E1-12.jpeg"
    ]
  },
  {
    id: "camp-delhi-kusumpur",
    campNumber: "Camp 2",
    tag: "CAMP 02",
    title: "Camp 2 — Kusumpur Pahari, New Delhi",
    name: "Camp 2 — Kusumpur Pahari Free Eye Screening & Spectacle Camp",
    year: "2025",
    location: "Sherawali Mata Mandir, Block-C, Kusumpur Pahari, New Delhi",
    date: "14 September 2025",
    peopleServed: "Verified On-Site Records",
    supportSummary: "नि:शुल्क नेत्र जांच शिविर — AR-9 Autorefractor screening, doctor checkup, and spectacles",
    image: "/camps/camp2/2nd Camp/E2-3.jpeg",
    video: "/camps/camp2/2nd Camp/E2-10.mp4",
    objective: "Delivering primary ophthalmic care and free vision correction directly to residents of Kusumpur Pahari with dignity and care.",
    medicalTeam: "Dr. Atul Garg, M.B.B.S., M.S. (Eye), Senior Eye Surgeon & Optometrists",
    volunteers: "Tandicia Association Core Team & Kusumpur Pahari Youth Volunteers",
    eventsList: [
      { name: "Community Mobilization & Registration", desc: "Systematic on-ground queue management and patient intake register." },
      { name: "AR-9 Autorefractor Computerized Diagnostics", desc: "Rapid, accurate automated refraction testing using AR-9 clinical equipment." },
      { name: "Doctor Examination & Cataract Assessment", desc: "Detailed examination of lens opacity, diabetic retinopathy symptoms, and glaucoma." },
      { name: "Spectacles Frame Selection & Dispensing", desc: "Beneficiaries tested and provided custom durable eyewear on-ground." },
      { name: "Free Eye Drops Distribution", desc: "Supplying antibiotics, lubricants, and post-screening ocular medications." }
    ],
    servicesProvided: "AR-9 autorefraction, intraocular pressure check, cataract screening, clinical consultations.",
    spectaclesDistributed: "Custom prescription corrective glasses provided free of cost.",
    referrals: "Identified cataract and advanced cases referred to partner surgical centres.",
    mediaCoverage: "Documented in official Tandicia field registers with verified camp photography.",
    gallery: [
      "/camps/camp2/2nd Camp/E2-3.jpeg",
      "/camps/camp2/2nd Camp/E2-4.jpeg",
      "/camps/camp2/2nd Camp/E2-6.jpeg",
      "/camps/camp2/2nd Camp/E2-7.jpeg",
      "/camps/camp2/2nd Camp/E2-9.jpeg",
      "/camps/camp2/2nd Camp/E2-14.jpeg",
      "/camps/camp2/2nd Camp/E2-15.jpeg",
      "/camps/camp2/2nd Camp/E2-18.jpeg",
      "/camps/camp2/2nd Camp/E2-20.jpeg"
    ]
  },
  {
    id: "camp-faridabad-mewla",
    campNumber: "Camp 3",
    tag: "CAMP 03",
    title: "Camp 3 — Mewla Maharajpur, Faridabad",
    name: "Camp 3 — Mewla Maharajpur Free Eye Screening Camp",
    year: "2025",
    location: "Deepak Bensla Baithak, Near Govt School, Mewla Maharajpur, Faridabad, Haryana",
    date: "12 October 2025",
    peopleServed: "Verified On-Site Records",
    supportSummary: "टेंडिशिया एसोसिएशन की तरफ से निःशुल्क नेत्र जाँच शिविर — Free screening, spectacles, medicines",
    image: "/camps/camp3/3rd camp/E3-3.jpeg",
    video: "/camps/camp3/3rd camp/E3-19.mp4",
    objective: "Extending Tandicia's eye care mission across state borders into rural Haryana communities with complete ophthalmic diagnosis.",
    medicalTeam: "Certified Ophthalmologists, Specialist Optometrists & Clinical Assistants",
    volunteers: "Tandicia Association Core Team & Mewla Maharajpur Community Leaders",
    eventsList: [
      { name: "Elderly Citizen Reception & Health Intake", desc: "Special seating and priority examination for village senior citizens." },
      { name: "Complete Retinoscopy & Diagnostic Refraction", desc: "Comprehensive refraction assessments conducted by certified optometrists." },
      { name: "Spectacle Power Fitting & Distribution", desc: "On-the-spot distribution of reading glasses and distance vision frames." },
      { name: "Free Medication Dispensing", desc: "Distribution of doctor-prescribed eye drops and medicinal treatments." },
      { name: "Press & Media Coverage", desc: "Featured in National Prahari newspaper and local community radio interviews." }
    ],
    servicesProvided: "Visual acuity testing, refraction, retinoscopy, spectacle fitting, medicine distribution.",
    spectaclesDistributed: "Free prescription reading and distance glasses.",
    referrals: "Specialist referrals for cataract and complex surgical cases.",
    mediaCoverage: "National Prahari newspaper coverage, radio interview, verified Tandicia records.",
    gallery: [
      "/camps/camp3/3rd camp/Banner.jpeg",
      "/camps/camp3/3rd camp/E3-3.jpeg",
      "/camps/camp3/3rd camp/E3-5.jpeg",
      "/camps/camp3/3rd camp/E3-7.jpeg",
      "/camps/camp3/3rd camp/E3-8.jpeg",
      "/camps/camp3/3rd camp/E3-10.jpeg",
      "/camps/camp3/3rd camp/E3-12.jpeg",
      "/camps/camp3/3rd camp/E3-14.jpeg",
      "/camps/camp3/3rd camp/F57.jpeg",
      "/camps/camp3/3rd camp/F98.jpeg",
      "/camps/camp3/3rd camp/News_paper_1.jpeg",
      "/camps/camp3/3rd camp/News_Paper_4.jpeg"
    ]
  },
  {
    id: "camp-delhi-gb-road",
    campNumber: "Camp 4",
    tag: "CAMP 04",
    title: "Camp 4 — GB Road Outreach, Central Delhi",
    name: "Camp 4 — GB Road Community Eye Care Outreach",
    year: "2025",
    location: "GB Road Community Area, Central Delhi",
    date: "2025",
    peopleServed: "Verified On-Site Records",
    supportSummary: "Targeted primary vision screening and eye care for vulnerable urban workers",
    image: "/camps/camp2/2nd Camp/E2-14.jpeg",
    video: null,
    objective: "Bringing primary eye care access to underserved urban workers and vulnerable communities near GB Road.",
    medicalTeam: "Volunteer Eye Specialists & Compassionate Support Staff",
    volunteers: "Tandicia Specialized Field Mobilization Volunteers",
    eventsList: [
      { name: "Dignified Community Reception", desc: "Safe, respectful space for marginalized women and workers to seek healthcare." },
      { name: "Confidential Vision Checkup", desc: "Full optical diagnosis and eye strain evaluations." },
      { name: "Protective & Corrective Glasses", desc: "Free eyewear provided to support livelihood and literacy." },
      { name: "Ocular Health Education", desc: "Hygiene and eye protection awareness sessions." },
      { name: "Direct Hospital Linkages", desc: "Referral network with partner hospitals for follow-up care." }
    ],
    servicesProvided: "Eye screening, vision testing, spectacle distribution, hygiene counseling.",
    spectaclesDistributed: "Free corrective eyewear.",
    referrals: "Partner hospital referrals for follow-up treatments.",
    mediaCoverage: "Documented in live Tandicia field register.",
    gallery: [
      "/camps/camp2/2nd Camp/E2-14.jpeg",
      "/camps/camp1/1st Camp/E1-6.jpeg"
    ]
  }
];

export default function EyeCamps() {
  const [filter, setFilter] = useState("All");
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [customCampPhotos, setCustomCampPhotos] = useState(() => 
    getCustomPhotos().filter(p => p.category === "Eye Camps")
  );

  useEffect(() => {
    const handleUpdate = () => {
      setCustomCampPhotos(getCustomPhotos().filter(p => p.category === "Eye Camps"));
    };
    window.addEventListener("tandicia_photos_updated", handleUpdate);
    return () => window.removeEventListener("tandicia_photos_updated", handleUpdate);
  }, []);

  const dynamicCamps = customCampPhotos.map(p => ({
    id: p.id,
    name: p.title,
    year: p.date ? p.date.substring(0, 4) : "2025",
    location: p.location,
    date: p.date,
    peopleServed: "Verified Field Entry",
    supportSummary: p.desc,
    image: p.src,
    objective: p.desc,
    medicalTeam: "Tandicia Healthcare Team & Volunteer Specialists",
    volunteers: "Field Volunteers",
    servicesProvided: "On-site eye checkup, screening, and vision correction assistance.",
    spectaclesDistributed: "Custom prescription corrective glasses.",
    referrals: "Direct partner OPD consultations scheduled for complex eye care.",
    mediaCoverage: "Documented in live Tandicia field register.",
    gallery: [p.src]
  }));

  const allCamps = [...dynamicCamps, ...verifiedCamps];

  const filteredCamps = filter === "All" 
    ? allCamps 
    : filter === "Earlier"
    ? allCamps.filter(c => parseInt(c.year) < 2025)
    : allCamps.filter(c => c.year === filter);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans">
      <Navbar />

      <main>
        {/* ========================================================
            HERO
            ======================================================== */}
        <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/camps/camp2/2nd Camp/E2-3.jpeg"
              alt="Eye Camp Doctor examining elderly beneficiary"
              className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 block">
              Primary Healthcare Initiative
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              Eye Camps
            </h1>
            <p className="text-xl sm:text-2xl text-amber-200/90 font-serif mb-6">
              Bringing Vision Closer to Those Who Need It
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Clear vision is not a luxury—it is fundamental to human dignity, safety, and self-reliance. We bring qualified doctors and free spectacles directly to grassroots communities.
            </p>
          </div>
        </section>

        {/* ========================================================
            IMPACT STRIP (Verified Placeholders)
            ======================================================== */}
        <section className="bg-sky-950 text-white py-10 border-b border-sky-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono block">
                  4+
                </span>
                <span className="text-xs sm:text-sm text-slate-200 uppercase tracking-wider font-semibold mt-1 block">
                  Camps Conducted
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono block">
                  XX+
                </span>
                <span className="text-xs sm:text-sm text-slate-200 uppercase tracking-wider font-semibold mt-1 block">
                  People Screened
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 font-mono block">
                  XX+
                </span>
                <span className="text-xs sm:text-sm text-slate-200 uppercase tracking-wider font-semibold mt-1 block">
                  Spectacles Distributed
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono block">
                  XX+
                </span>
                <span className="text-xs sm:text-sm text-slate-200 uppercase tracking-wider font-semibold mt-1 block">
                  Referrals / Surgeries
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CAMP ARCHIVE WITH FILTERS
            ======================================================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Field Documentation
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                  Our Eye Camps
                </h2>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                {["All", "2026", "2025", "Earlier"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      filter === f
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Camp Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCamps.map((camp, index) => {
                const campNum = camp.campNumber || `Camp ${index + 1}`;
                const campTag = camp.tag || `CAMP 0${index + 1}`;

                return (
                  <div
                    key={camp.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                  >
                    {/* Card Top Image & Badges */}
                    <div className="relative h-60 overflow-hidden bg-slate-900">
                      <img
                        src={camp.image}
                        alt={camp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

                      {/* Camp Number Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-emerald-600 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md tracking-wider">
                          {campTag}
                        </span>
                        {camp.video && (
                          <span className="bg-slate-900/90 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                            <span>▶ Video</span>
                          </span>
                        )}
                      </div>

                      <div className="absolute top-4 right-4 bg-slate-950/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
                        {camp.year}
                      </div>

                      {/* Date on image bottom */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                        <span className="font-semibold flex items-center gap-1.5">
                          <span>📅</span>
                          <span>{camp.date}</span>
                        </span>
                        <span className="text-[11px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono">
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-2">
                          <span>📍</span>
                          <span className="line-clamp-1">{camp.location}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                          {camp.title || camp.name}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                          {camp.supportSummary}
                        </p>

                        {/* Events / Highlights in this Camp */}
                        <div className="mb-4 pt-3 border-t border-slate-100">
                          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                            Events & Highlights:
                          </span>
                          <div className="space-y-1.5">
                            {camp.eventsList ? (
                              camp.eventsList.slice(0, 3).map((evt, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span className="line-clamp-1 font-medium">{evt.name}</span>
                                </div>
                              ))
                            ) : (
                              <>
                                <div className="flex items-start gap-2 text-xs text-slate-700">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span>Eye Screening & Refraction</span>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-slate-700">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span>Free Prescription Glasses</span>
                                </div>
                              </>
                            )}
                            {camp.eventsList && camp.eventsList.length > 3 && (
                              <p className="text-[11px] text-sky-800 font-semibold pl-4">
                                + {camp.eventsList.length - 3} more events inside
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Button */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">
                          {camp.gallery ? `${camp.gallery.length} Photos` : "Photos Included"}
                        </span>
                        <button
                          onClick={() => setSelectedCamp(camp)}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Explore {campNum} Events</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            HUMAN STORY — BEYOND THE NUMBERS
            ======================================================== */}
        <section className="py-20 bg-stone-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/camps/camp3/3rd camp/E3-8.jpeg"
                  alt="Doctor examining elderly patient at eye camp"
                  className="w-full h-full object-cover aspect-4/3"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Beyond the Numbers
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  "Now I can read again and hold my granddaughter's hand with confidence."
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  For over two years, 68-year-old Ram Dulari ji suffered from progressive blurry vision. Living on a modest pension, getting an eye checkup in the city meant significant expense and travel.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  At the Tandicia Community Eye Camp, volunteer optometrists conducted a detailed refractive test and provided her with custom eyeglasses free of charge. Today, she has regained her daily independence.
                </p>
                <span className="text-xs font-semibold text-slate-400 block pt-2">
                  Verified Beneficiary Interaction • Tandicia Eye Care Programme
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FINAL CTA
            ======================================================== */}
        <section className="py-20 bg-slate-950 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">
              Expand Our Reach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Help Us Reach More Communities
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              If you are an eye care professional, optometrist, or an organisation with space to host a free screening camp in your locality, join hands with Tandicia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact?interest=Volunteering"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm transition-all"
              >
                Volunteer With Us
              </Link>
              <Link
                to="/contact?interest=Partnership"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-all"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          CAMP DETAIL & EVENTS MODAL
          ======================================================== */}
      {selectedCamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-slate-100 relative my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCamp(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-lg font-bold cursor-pointer transition-colors z-10"
            >
              ✕
            </button>

            {/* Header with Tag & Title */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-emerald-700 px-3 py-1 rounded-full">
                {selectedCamp.tag || selectedCamp.campNumber || "Camp Event"}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md">
                {selectedCamp.year} Official Camp Record
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
              {selectedCamp.title || selectedCamp.name}
            </h2>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
              <span className="flex items-center gap-1 font-medium">📍 {selectedCamp.location}</span>
              <span className="flex items-center gap-1 font-medium">📅 {selectedCamp.date}</span>
            </div>

            {/* Main Camp Media */}
            <div className="mb-8 space-y-4">
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={selectedCamp.image}
                  alt={selectedCamp.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Player if available */}
              {selectedCamp.video && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <span>🎬</span>
                    <span>Live On-Ground Video Record</span>
                  </div>
                  <video
                    controls
                    className="w-full rounded-xl max-h-72 bg-black"
                    src={selectedCamp.video}
                  >
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
            </div>

            {/* Camp Objective & Summary */}
            <div className="mb-8 p-5 rounded-2xl bg-stone-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Camp Mission & Objective:</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedCamp.objective}
              </p>
            </div>

            {/* EVENTS CONDUCTED IN THIS CAMP */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📋</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Events & Activities Conducted in {selectedCamp.campNumber || "This Camp"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCamp.eventsList ? (
                  selectedCamp.eventsList.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{evt.name}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{evt.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600">
                    Full screening, prescription eyewear, and consultation events conducted.
                  </div>
                )}
              </div>
            </div>

            {/* Medical & Volunteer Team */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 mb-1">
                  👨‍⚕️ Medical Specialists
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedCamp.medicalTeam}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                  🤝 Volunteers & Field Coordination
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedCamp.volunteers}
                </p>
              </div>
            </div>

            {/* PHOTO GALLERY OF THIS CAMP */}
            {selectedCamp.gallery && selectedCamp.gallery.length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>📸</span>
                  <span>{selectedCamp.campNumber || "Camp"} Photograph Gallery ({selectedCamp.gallery.length})</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedCamp.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group relative"
                    >
                      <img
                        src={img}
                        alt={`Camp photograph ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => { e.target.src = '/image.png'; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800">
                Status: {selectedCamp.peopleServed}
              </span>
              <button
                onClick={() => setSelectedCamp(null)}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer transition-colors"
              >
                Close Camp Record
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
