import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTeamMembers } from "../utils/teamStore";
import { useContent } from "../utils/contentStore";

export default function Team() {
  const content = useContent();
  const teamMembers = useTeamMembers();
  const filteredMembers = teamMembers;

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
              src="/camps/camp1/1st Camp/E1-4.jpeg"
              alt="Tandicia Team and Volunteers at Camp"
              className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 block">
              {content.teamPageBadge || "The Dedicated Faces of Tandicia"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              {content.teamPageTitle || "The People Behind Tandicia"}
            </h1>
            <p className="text-xl sm:text-2xl text-amber-200/90 font-serif mb-6">
              {content.teamPageTagline || "People who give their time, expertise and heart to serve the community."}
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {content.teamPageDesc || "Tandicia is powered by everyday citizens and compassionate volunteers who step forward with verified dedication."}
            </p>
          </div>
        </section>

        {/* ========================================================
            ALL VOLUNTEERS DIRECTORY (EVERYONE EQUAL)
            ======================================================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                On-Ground Volunteers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                Tandicia Volunteers
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Dedicated citizens, doctors, and community pillars serving with equality, empathy, and dignity.
              </p>
            </div>

            {/* Volunteers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-slate-200/90 bg-stone-50/40 hover:bg-white hover:shadow-lg transition-all p-4 flex flex-col items-center text-center group"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xs border border-slate-200 mb-3 bg-slate-100 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {member.name}
                  </h4>

                  <p className="text-xs font-semibold text-emerald-800 mt-1">
                    Volunteer
                  </p>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No volunteers found matching your search.
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            VOLUNTEER COMMUNITY CELEBRATION
            ======================================================== */}
        <section className="py-20 bg-emerald-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
              Sewa • Service • Humanity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              You Can Be Part of This Team
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
              Our volunteers come from diverse walks of life—from medicine and business to college students and homemakers. Every pair of hands makes a real difference.
            </p>
            <div className="pt-4">
              <Link
                to="/contact?interest=Volunteering"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-all shadow-md"
              >
                <span>Become a Volunteer</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
