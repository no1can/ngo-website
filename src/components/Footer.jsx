import { Link } from "react-router-dom";
import { useContent } from "../utils/contentStore";

export default function Footer() {
  const content = useContent();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* BRAND INFO */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
                <img src="/logo.png" alt="Tandicia Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  {content.orgName || "Tandicia Association"}
                </span>
                <p className="text-xs text-emerald-400 font-medium">
                  {content.heroBadge || "Our Vision: Perfect Vision for All"}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {content.footerBio || "Connecting People. Serving Communities. Being There for Each Other. A community-driven social-impact initiative committed to accessible healthcare, dignity, and real compassion."}
            </p>
          </div>

          {/* CONTACT & LOCATION */}
          <div className="flex flex-col sm:flex-row md:justify-end items-start sm:items-center gap-6 sm:gap-10 text-sm">
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Email</span>
              <a 
                href={`mailto:${content.orgEmail || "connect@tandiciaassociation.com"}`} 
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
              >
                {content.orgEmail || "connect@tandiciaassociation.com"}
              </a>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Registered Address</span>
              <p className="text-slate-300 font-medium">
                {content.orgAddress || "Abhyudaya, Sanjay Colony, Bhati Mines & New Delhi, India"}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>{content.footerCopyright || `© ${new Date().getFullYear()} Tandicia Association. All rights reserved.`}</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link to="/donate" className="hover:text-slate-300 transition-colors">
              Donate
            </Link>
            <Link to="/admin" className="text-slate-400 hover:text-slate-200 transition-colors">
              Admin Portal 🔐
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
