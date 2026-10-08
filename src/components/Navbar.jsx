import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO & BRAND */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Tandicia Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-900 transition-colors">
                Tandicia Association
              </span>
              <span className="text-xs text-emerald-800 font-semibold tracking-wide">
                Our Vision: Perfect Vision for All
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-sm xl:text-[15px] font-medium text-slate-700">
            <Link
              to="/about"
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive("/about")
                  ? "text-sky-950 font-bold bg-slate-100"
                  : "hover:text-sky-950 hover:bg-slate-50"
              }`}
            >
              About Tandicia
            </Link>

            <Link
              to="/eye-camps"
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive("/eye-camps")
                  ? "text-emerald-900 font-bold bg-emerald-50"
                  : "hover:text-emerald-900 hover:bg-slate-50"
              }`}
            >
              Eye Camps
            </Link>

            <Link
              to="/sewa-rasoi"
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive("/sewa-rasoi")
                  ? "text-amber-900 font-bold bg-amber-50"
                  : "hover:text-amber-900 hover:bg-slate-50"
              }`}
            >
              Sewa Rasoi
            </Link>

            <Link
              to="/donate"
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive("/donate")
                  ? "text-emerald-900 font-bold bg-emerald-50"
                  : "hover:text-emerald-900 hover:bg-slate-50"
              }`}
            >
              Support Our Work
            </Link>

            <Link
              to="/team"
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive("/team")
                  ? "text-sky-950 font-bold bg-slate-100"
                  : "hover:text-sky-950 hover:bg-slate-50"
              }`}
            >
              Team
            </Link>

            <Link
              to="/contact"
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive("/contact")
                  ? "text-sky-950 font-bold bg-slate-100"
                  : "hover:text-sky-950 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* DESKTOP GLOBAL CTA BUTTONS */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link
              to="/contact?interest=Volunteering"
              className="text-xs xl:text-sm font-semibold text-emerald-800 hover:text-emerald-950 px-3 xl:px-3.5 py-2 xl:py-2.5 rounded-full border border-emerald-700/30 hover:border-emerald-700/70 hover:bg-emerald-50/50 transition-all whitespace-nowrap"
            >
              Join Us
            </Link>
            <Link
              to="/donate"
              className="text-xs xl:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Donate</span>
              <span className="text-amber-300">♥</span>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            to="/about"
            className="block py-2.5 text-base font-semibold text-slate-800 hover:text-emerald-800"
          >
            About Tandicia
          </Link>

          <Link
            to="/eye-camps"
            className="block py-2.5 text-base font-semibold text-slate-800 hover:text-emerald-800"
          >
            Eye Camps
          </Link>

          <Link
            to="/sewa-rasoi"
            className="block py-2.5 text-base font-semibold text-slate-800 hover:text-amber-800"
          >
            Sewa Rasoi
          </Link>

          <Link
            to="/donate"
            className="block py-2.5 text-base font-semibold text-slate-800 hover:text-emerald-800"
          >
            Support Our Work
          </Link>

          <Link
            to="/team"
            className="block py-2.5 text-base font-semibold text-slate-800 hover:text-emerald-800"
          >
            Team
          </Link>

          <Link
            to="/contact"
            className="block py-2.5 text-base font-semibold text-slate-800 hover:text-emerald-800"
          >
            Contact
          </Link>

          <div className="pt-3 flex flex-col gap-2.5 border-t border-slate-100">
            <Link
              to="/contact?interest=Volunteering"
              className="text-center w-full py-2.5 text-sm font-semibold text-emerald-800 border border-emerald-800/40 rounded-xl"
            >
              Join Tandicia
            </Link>
            <Link
              to="/donate"
              className="text-center w-full py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-xl shadow-xs"
            >
              Support Our Work ♥
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}