import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../utils/contentStore";

export default function Contact() {
  const content = useContent();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "Volunteering",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync interest with query parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const interestParam = params.get("interest");
    if (interestParam) {
      setFormData(prev => ({ ...prev, interest: interestParam }));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailSubject = `Tandicia Inquiry: ${formData.interest} - ${formData.name}`;
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCity: ${formData.city}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`;

    try {
      await fetch("https://formsubmit.co/ajax/tandiciaassociation@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          interest: formData.interest,
          message: formData.message,
          _subject: emailSubject
        })
      });
    } catch (err) {
      console.warn("Direct submit fallback:", err);
      window.open(
        `mailto:tandiciaassociation@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
        "_blank"
      );
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

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
              src="/team/team.png"
              alt="Connect with Tandicia Association"
              className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 block">
              {content.contactBadge || "Reach Out & Engage"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              {content.contactTitle || "Let's Connect"}
            </h1>
            <p className="text-xl sm:text-2xl text-amber-200/90 font-serif mb-6">
              {content.contactTagline || "Every connection can become an opportunity to serve."}
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {content.contactDesc || "Whether you want to offer your time as a volunteer, collaborate on a community eye camp, or simply say hello, we look forward to hearing from you."}
            </p>
          </div>
        </section>

        {/* ========================================================
            CONTACT FORM & INFO
            ======================================================== */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Form on Left */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fill in your details and our team will get in touch with you shortly.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <span className="text-4xl block">✅</span>
                    <h4 className="text-xl font-bold text-emerald-950">Message Sent Successfully!</h4>
                    <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Your inquiry has been sent directly to <strong>tandiciaassociation@gmail.com</strong>. A representative from Tandicia Association will connect with you soon.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`mailto:tandiciaassociation@gmail.com?subject=${encodeURIComponent(`Tandicia Inquiry: ${formData.interest} - ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCity: ${formData.city}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`)}`}
                        className="px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        Open in Email App
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-50 transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City / Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Delhi, NCR, Faridabad"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          I am interested in *
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm bg-white"
                        >
                          <option value="Volunteering">Volunteering</option>
                          <option value="Eye Camps">Eye Camps</option>
                          <option value="Sewa Rasoi">Sewa Rasoi</option>
                          <option value="Nai Pehal">Nai Pehal</option>
                          <option value="Supporting Tandicia">Supporting Tandicia</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how you would like to engage or any question you have..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-700 disabled:opacity-75 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Sending Message...</span>
                      ) : (
                        <span>Send Message →</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Information & Map on Right */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Verified Info */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <h4 className="text-xl font-bold text-slate-900">
                    Contact Information
                  </h4>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📍</span>
                      <div>
                        <strong className="block text-slate-900">Registered Office:</strong>
                        <span>{content.orgAddress || "Tandicia Association, New Delhi, India"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">✉️</span>
                      <div>
                        <strong className="block text-slate-900">Email:</strong>
                        <a href={`mailto:${content.orgEmail || "tandiciaassociation@gmail.com"}`} className="text-sky-900 hover:underline font-medium">
                          {content.orgEmail || "tandiciaassociation@gmail.com"}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">🌐</span>
                      <div>
                        <strong className="block text-slate-900">Official Website:</strong>
                        <span className="text-slate-700">tandiciaassociation.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      Social Channels
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://www.linkedin.com/in/tandicia-association-029b433b2/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn
                      </a>
                      <a
                        href="https://www.instagram.com/tandicia_eye/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/p/Tandicia-Association-61582800004998/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            FINAL MESSAGE
            ======================================================== */}
        <section className="py-16 bg-white border-t border-slate-200 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold block">
              Moving Forward
            </span>
            <p className="text-xl sm:text-2xl font-serif text-slate-900">
              "Let's work together to create a more connected and compassionate community."
            </p>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              Our Vision: Perfect Vision for All
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
