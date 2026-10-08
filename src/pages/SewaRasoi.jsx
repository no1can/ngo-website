import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../utils/contentStore";

export default function SewaRasoi() {
  const content = useContent();

  const sewaPhotos = [
    { src: "/sewa_rasoi/sewa_rasoi_1.jpg", title: "Fresh Preparation", desc: "Volunteers preparing and cooking wholesome meals from dawn." },
    { src: "/sewa_rasoi/sewa_rasoi_4.jpg", title: "Warm Meal Handover", desc: "Serving warm, nutritious food with utmost dignity and care." },
    { src: "/sewa_rasoi/sewa_rasoi_2.jpg", title: "Kitchen Seva", desc: "Hygienic community cooking powered entirely by volunteers." },
    { src: "/sewa_rasoi/sewa_rasoi_5.jpg", title: "Field Distribution", desc: "Handing packed food to hospital attendants and workers." },
    { src: "/sewa_rasoi/sewa_rasoi_3.jpg", title: "Community Meals", desc: "Reaching families and ensuring no one sleeps hungry." },
    { src: "/sewa_rasoi/sewa_rasoi_6.jpg", title: "Volunteer Action", desc: "Dedicated grassroots coordinators managing meal queues." },
    { src: "/sewa_rasoi/sewa_rasoi_7.jpg", title: "Hospital Relief", desc: "Providing nourishment outside major hospital gates." },
    { src: "/sewa_rasoi/sewa_rasoi_8.jpg", title: "Dignity & Respect", desc: "Honoring every recipient as an honored guest." }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans">
      <Navbar />

      <main>
        {/* ========================================================
            1. HERO
            ======================================================== */}
        <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/sewa_rasoi/sewa_rasoi_4.jpg"
              alt="Volunteers serving meals at Sewa Rasoi"
              className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 block">
              {content.sewaBadge || "Nutritional Relief & Dignity"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              {content.sewaHeading || "Sewa Rasoi"}
            </h1>
            <p className="text-xl sm:text-2xl text-emerald-300 font-serif mb-6">
              {content.sewaTagline || "Food with Dignity. Service with Compassion."}
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {content.sewaSubtext || "No one should have to sleep on an empty stomach or endure hunger while tending to an ill family member. Sewa Rasoi is our community commitment to ensure wholesome food for all."}
            </p>
          </div>
        </section>

        {/* ========================================================
            2. DASHBOARD / IMPACT STRIP (Top right after Hero)
            ======================================================== */}
        <section className="bg-emerald-950 text-white py-12 border-y border-emerald-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="text-3xl sm:text-5xl font-extrabold text-amber-400 font-mono block">
                  {content.sewaMealsCount || "2,500+"}
                </span>
                <span className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider font-semibold mt-2 block">
                  Meals Served
                </span>
                <span className="text-xs text-emerald-400/80 mt-1 block">Fresh & wholesome</span>
              </div>
              <div>
                <span className="text-3xl sm:text-5xl font-extrabold text-white font-mono block">
                  {content.sewaVolunteersCount || "45+"}
                </span>
                <span className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider font-semibold mt-2 block">
                  Volunteers Involved
                </span>
                <span className="text-xs text-emerald-400/80 mt-1 block">Cooking & serving</span>
              </div>
              <div>
                <span className="text-3xl sm:text-5xl font-extrabold text-amber-300 font-mono block">
                  {content.sewaDaysCount || "30+"}
                </span>
                <span className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider font-semibold mt-2 block">
                  Days of Service
                </span>
                <span className="text-xs text-emerald-400/80 mt-1 block">Regular field drives</span>
              </div>
              <div>
                <span className="text-3xl sm:text-5xl font-extrabold text-sky-400 font-mono block">
                  {content.sewaCommunitiesCount || "12+"}
                </span>
                <span className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider font-semibold mt-2 block">
                  Communities Reached
                </span>
                <span className="text-xs text-emerald-400/80 mt-1 block">Hospital & public hubs</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            OFFICIAL SEWA RASOI INITIATIVE POSTER
            ======================================================== */}
        <section className="py-16 bg-stone-100 border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold block">
                Official Programme Announcement
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                सेवा रसोई — एक प्रयास कोई भूखा न सोये
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                मधुबन चौक पर प्रतिदिन लंगर सेवा • अन्नदान महादान • सहयोग एवं हेल्पलाइन: 98112 09004
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2 sm:p-4">
              <img
                src="/sewa_rasoi/sewa_rasoi_poster.jpg"
                alt="Tandicia Association Sewa Rasoi Official Poster"
                className="w-full h-auto rounded-2xl object-contain shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ========================================================
            3. ON-GROUND VIDEO HIGHLIGHTS (Right below Dashboard)
            ======================================================== */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                Live From The Field
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                On-Ground Video Highlights
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                Unscripted footage of our volunteers preparing warm food and serving with love and respect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Video 1 */}
              <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-xl">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/sewa_rasoi/sewa_rasoi_video_1.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
                <div className="p-6">
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                    Kitchen Seva
                  </span>
                  <h4 className="text-lg font-bold text-white">Meal Preparation & Devotion</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Volunteers preparing fresh, pure meals from dawn to ensure high nutritional standards.
                  </p>
                </div>
              </div>

              {/* Video 2 */}
              <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-xl">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/sewa_rasoi/sewa_rasoi_video_2.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
                <div className="p-6">
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block mb-1">
                    Food Distribution
                  </span>
                  <h4 className="text-lg font-bold text-white">Serving with Warmth & Dignity</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Handing warm food plates directly to hospital attendants and workers in need.
                  </p>
                </div>
              </div>

              {/* Video 3 */}
              <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-xl">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/sewa_rasoi/sewa_rasoi_video_3.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
                <div className="p-6">
                  <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider block mb-1">
                    Community Solidarity
                  </span>
                  <h4 className="text-lg font-bold text-white">Grassroots Food Outreach</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Spreading compassion and ensuring no one in our reach sleeps on an empty stomach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. FIELD PHOTOGRAPHS (Below Videos)
            ======================================================== */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold block">
                Direct From The Field
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                Sewa Rasoi Field Photographs
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Authentic glimpses of meal preparation, hygienic packing, and respectful community distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sewaPhotos.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="h-60 overflow-hidden bg-slate-900 relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-slate-950/75 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      Sewa Rasoi
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            5. JOIN US — SERVE WITH US
            ======================================================== */}
        <section className="py-20 bg-emerald-950 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
              Make a Tangible Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Serve With Us
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Volunteer for a weekend food service shift or support the ration and raw material costs for an upcoming community kitchen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact?interest=Sewa%20Rasoi"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-all"
              >
                Volunteer
              </Link>
              <Link
                to="/donate"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm transition-all"
              >
                Support Sewa Rasoi
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
