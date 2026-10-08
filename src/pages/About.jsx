import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../utils/contentStore";

// =========================================================================
// BACKGROUND HERO SLIDESHOW IMAGES
// =========================================================================
const HERO_IMAGES = [
  { url: "/camps/camp3/3rd camp/E3-12.jpeg", alt: "Community Eye Camp gathering" },
  { url: "/camps/gao_thora/gao_thora_1.jpg", alt: "Gao Thora Eye Camp doctor examination" },
  { url: "/sewa_rasoi/sewa_rasoi_3.jpg", alt: "Sewa Rasoi fresh meal preparation" },
  { url: "/camps/shradnand_marg/shradnand_4.jpg", alt: "Shraddhanand Marg vision screening" },
  { url: "/camps/camp1/1st Camp/E1-1.jpeg", alt: "Free clinical eye checkup" },
  { url: "/sewa_rasoi/sewa_rasoi_7.jpg", alt: "Sewa Rasoi warm community service" },
];

export default function About() {
  const content = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main>
        {/* ========================================================
            1. HERO SECTION — IMMERSIVE SLIDESHOW & PRESTIGIOUS
            ======================================================== */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
          {/* Animated Background Image Slideshow with Smooth Crossfade & Subtle Zoom */}
          <div className="absolute inset-0 z-0">
            {HERO_IMAGES.map((img, idx) => {
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
                    className={`w-full h-full object-cover filter brightness-[0.32] contrast-[1.1] transition-transform duration-[7000ms] ease-out ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
              );
            })}
            {/* Rich atmospheric gradients for text contrast */}
            <div className="absolute inset-0 z-2 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950 pointer-events-none" />
            <div className="absolute inset-0 z-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent pointer-events-none" />
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
              {content.aboutSubtext || "Tandicia Association is a community-driven organisation bringing together volunteers, professionals, doctors, supporters, and everyday community members to address real social and community needs."}
            </p>

            {/* Subtle Slideshow Navigation Indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {HERO_IMAGES.map((_, idx) => (
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
        </section>







      </main>

      <Footer />
    </div>
  );
}