/**
 * contentStore.js — Central text & content management for Tandicia website
 * Enables live editing of ALL website texts, headlines, taglines, paragraphs,
 * camp descriptions, impact statistics, and contact info from the Admin Panel.
 */
import { useState, useEffect } from "react";

export const DEFAULT_CONTENT = {
  // ==========================================
  // 1. ORGANISATION & GLOBAL BRANDING
  // ==========================================
  orgName: "Tandicia Association",
  orgTagline: "Our Vision: Perfect Vision for All",
  orgEmail: "connect@tandiciaassociation.com",
  orgPhone: "+91 98716 74098",
  orgAddress: "Abhyudaya, Sanjay Colony, Bhati Mines & New Delhi, India",
  orgWorkingHours: "Monday – Saturday: 9:00 AM – 6:00 PM",
  footerBio: "Connecting People. Serving Communities. Being There for Each Other. A community-driven social-impact initiative committed to accessible healthcare, dignity, and real compassion.",
  footerCopyright: "© 2025 Tandicia Association. All verified records reserved.",
  bankAccountName: "Tandicia Association",
  bankName: "City Union Bank Ltd (CUB)",
  bankAccountNumber: "510909010308848",
  bankIfsc: "CIUB0000102",
  bankUpi: "tandicia@upi",

  // ==========================================
  // 2. HOMEPAGE — HERO SECTION
  // ==========================================
  heroBadge: "Our Vision: Perfect Vision for All",
  heroHeading1: "TANDICIA",
  heroHeading2: "ASSOCIATION",
  heroTagline: "Our Vision: Perfect Vision for All — Serving Communities with Dignity & Care",
  heroSubtext: "A community-driven initiative bringing dedicated eye doctors, professionals, and volunteers together to eradicate preventable vision impairment.",
  heroCta1Text: "Explore Eye Camps",
  heroCta2Text: "Join Tandicia",

  // HOMEPAGE — VISION & 3 PILLARS
  purposeBadge: "Our Vision & Purpose",
  purposeHeading: "Our Vision: Perfect Vision for All",
  purposeSubtext: "Dedicated to eliminating preventable blindness and ensuring clear vision, dignity, and accessible eye healthcare for every family.",
  pillar1Title: "Free Vision Screening",
  pillar1Desc: "Advanced diagnostic checkups with computerized refraction and autorefractor machines conducted directly inside community clusters.",
  pillar2Title: "Prescription Spectacles",
  pillar2Desc: "Custom-tested, durable prescription corrective eyeglasses fitted and distributed completely free of charge to verified attendees.",
  pillar3Title: "Specialist Medical Care",
  pillar3Desc: "Senior ophthalmologist consultations, cataract grading, and direct subsidised surgical referrals in partnership with leading eye institutes.",

  // HOMEPAGE — FIELD PROGRAMMES
  programmesBadge: "Field Programmes",
  programmesHeading: "Our Work on the Ground",
  programmesSubtext: "Authentic, on-ground programmes designed to deliver tangible medical care, community wellness, and social solidarity.",
  progEyeTitle: "Eye Camps",
  progEyeDesc: "Accessible eye care, comprehensive screening, custom spectacles distribution, and medical doctor consultation for underserved communities.",
  progEyeLinkText: "Explore Eye Camps →",
  progNaiTitle: "Nai Pehal",
  progNaiDesc: "New initiatives responding dynamically to emerging community needs: senior citizen care, single parent support, and grassroots solutions.",
  progNaiLinkText: "Explore Nai Pehal →",

  // HOMEPAGE & GLOBAL — IMPACT NUMBERS
  impactBadge: "Verified Records",
  impactHeading: "Impact Dashboard",
  impactSubtext: "All numbers are tracked via verified on-ground camp logs and programme registers.",
  stat1Number: "6,950+",
  stat1Label: "People Screened",
  stat1Sub: "Beneficiaries examined & verified",
  stat2Number: "15+",
  stat2Label: "Eye Camps",
  stat2Sub: "Conducted on-site",
  stat3Number: "4,713+",
  stat3Label: "Spectacles Distributed",
  stat3Sub: "Free precision prescription eyeglasses",
  stat4Number: "169+",
  stat4Label: "Volunteers & Doctors",
  stat4Sub: "Dedicated medical & field team",

  // HOMEPAGE — EYE CAMPS SPOTLIGHT
  eyeCampsBadge: "Flagship Initiative",
  eyeCampsHeading: "Bringing Vision Closer to Those Who Need It",
  eyeCampsSubtext: "Delivering primary ophthalmic checkups, refraction, specialist consultations, and free prescription spectacles directly to underserved communities.",
  eyeCampPoint1Title: "Mobile Diagnostics",
  eyeCampPoint1Desc: "Computerized AR-9 autorefractors deployed right into neighbourhood community centres and baithaks.",
  eyeCampPoint2Title: "Same-Day Spectacle Fitting",
  eyeCampPoint2Desc: "Durable reading and distance prescription eyeglasses fitted directly on-site to beneficiaries.",
  eyeCampPoint3Title: "Cataract & Surgery Referrals",
  eyeCampPoint3Desc: "Direct OPD slip linkages with senior ophthalmic surgical centres for advanced treatment.",

  // HOMEPAGE — COMMUNITY STORIES
  storiesBadge: "Human Stories",
  storiesHeading: "Stories from the Field",
  storiesSubtext: "Every camp leaves a lasting imprint. Here is what serving with dignity looks like in everyday life.",
  storyMainTitle: "From Blurred World to Crystal Clarity",
  storyMainQuote: "\"For three years, I thought losing my eyesight was simply part of growing old. When Tandicia doctors tested my eyes and handed me glasses without asking for a single rupee, I could see my grandson's face clearly again.\"",
  storyMainAuthor: "— Smt. Ramvati Devi (68 yrs), Mewla Maharajpur Beneficiary",
  story2Title: "Sunday Free Vision Diagnostic",
  story2Desc: "Over a hundred residents examined by our voluntary team.",
  story3Title: "Free Spectacles Distribution",
  story3Desc: "Providing precision corrective eyewear to elderly residents.",
  story4Title: "Standing With Single Mothers",
  story4Desc: "Providing moral support, counseling, and guidance.",

  // HOMEPAGE — WHY TANDICIA
  whyBadge: "Core Philosophy",
  whyHeading: "Why Tandicia?",
  whySubtext: "We don't work for publicity or distant reports. We work shoulder-to-shoulder with the communities we serve.",
  whyCard1Title: "Ground-Level Presence",
  whyCard1Desc: "We operate in remote clusters, mining settlements, and rural colonies where public healthcare access is limited.",
  whyCard2Title: "Dignity Above All",
  whyCard2Desc: "Every beneficiary is received with deep respect, comfortable seating, clear explanations, and zero bureaucratic barriers.",
  whyCard3Title: "100% Financial Accountability",
  whyCard3Desc: "Every rupee donated is directly mapped to eye testing, prescription lenses, medical drops, and logistics.",

  // HOMEPAGE — FINAL CTA
  ctaHeading: "Be There for Someone",
  ctaQuote: "\"You don't need to do everything. Sometimes, simply being there makes a difference.\"",
  ctaButton1Text: "Become a Volunteer",
  ctaButton2Text: "Support Our Work",

  // ==========================================
  // 3. ABOUT PAGE
  // ==========================================
  aboutBadge: "Our Identity & Purpose",
  aboutHeading: "About Tandicia",
  aboutTagline: "Our Vision: Perfect Vision for All",
  aboutSubtext: "Connecting People. Serving Communities. Being There for Each Other.",
  aboutWhoHeading: "Who We Are",
  aboutWhoP1: "Tandicia Association is a community-driven organisation bringing together volunteers, professionals, doctors, supporters, and everyday community members to address real social and community needs.",
  aboutWhoP2: "We believe that the most powerful social change does not happen from distant offices, but on the ground—where people meet as equals. Whether it is screening the eyes of an elder who cannot afford an examination, serving a hot meal with genuine dignity, or standing by a family navigating crisis, Tandicia exists to be there.",
  aboutWhoQuote: "\"Our guiding light is simple: service rooted in respect, friendships that cross social boundaries, and a sense of shared belonging that leaves no one behind.\"",
  aboutVisionSectionTitle: "Our Vision",
  aboutVisionSectionQuote: "\"A world where no one is deprived of clear sight — Perfect Vision for All through compassionate, accessible healthcare.\"",
  aboutVisionSectionDesc: "Every initiative we undertake is measured by one standard: does it elevate human dignity and strengthen social bonds?",
  aboutObj1Title: "Accessible Eye Healthcare",
  aboutObj1Desc: "Conducting free diagnostic eye testing and spectacles distribution camps across underserved colonies and villages.",
  aboutObj2Title: "Grassroots Volunteering",
  aboutObj2Desc: "Mobilizing youth, doctors, and professionals to directly volunteer their skills for social welfare.",
  aboutObj3Title: "Senior & Elderly Dignity",
  aboutObj3Desc: "Ensuring elder citizens receive respectful healthcare, vision clarity, and emotional solidarity.",
  aboutObj4Title: "Transparent Impact",
  aboutObj4Desc: "Maintaining 100% verified records, photographs, and public accountability for every single initiative.",

  // ==========================================
  // 4. EYE CAMPS & UPCOMING CAMP
  // ==========================================
  campsPageBadge: "Flagship Healthcare Initiative",
  campsPageTitle: "Free Eye Screening Camps",
  campsPageSubtitle: "Our Vision: Perfect Vision for All — Professional ophthalmic care, computerized autorefraction, senior surgeon diagnosis, and free spectacles distribution directly to underserved communities.",
  campsProcessTitle: "How Our Eye Camps Work",
  campsProcessSubtitle: "A standardized, medically rigorous 4-step protocol ensuring dignity and clinical accuracy for every patient.",

  upcomingCampTitle: "नि:शुल्क नेत्र जाँच शिविर",
  upcomingCampTagline: "Shakurpur Colony, New Delhi • 11-Oct-2026",
  upcomingCampDate: "11 अक्टूबर 2026 (रविवार / Sunday)",
  upcomingCampTime: "सुबह 10:00 बजे से दोपहर 2:00 बजे तक",
  upcomingCampLocation: "ब्लॉक G, शकूरपुर कॉलोनी, नई दिल्ली, दिल्ली-110034",
  upcomingCampSpecial: "नज़र के चश्में भी मुफ्त दिए जाएंगे",
  upcomingCampSummary: "टेंडिशिया एसोसिएशन एवं सेवा भारती द्वारा आयोजित — निःशुल्क नेत्र जाँच, अनुभवी डॉक्टरों का परामर्श एवं नज़र के चश्में भी मुफ्त दिए जाएंगे।",
  upcomingCampBanner: "/shakurpur-eye-camp-banner.jpg",

  camp1Title: "Bhati Mines, New Delhi",
  camp1DateLoc: "29 August 2025 • Abhyudaya, Sanjay Colony, Bhati Mines",
  camp1Desc: "Reaching daily wage earners, elder residents, and remote families in the Bhati Mines region with critical eye health diagnosis.",
  camp1Doctor: "Dr. Atul Garg, M.B.B.S., M.S. (Eye), Senior Eye Surgeon",

  camp2Title: "Kusumpur Pahari, New Delhi",
  camp2DateLoc: "14 September 2025 • Sherawali Mata Mandir, Kusumpur Pahari",
  camp2Desc: "Delivering primary ophthalmic care and free vision correction directly to residents of Kusumpur Pahari with dignity and care.",
  camp2Doctor: "Dr. Atul Garg & Senior Clinical Optometrists",

  camp3Title: "Mewla Maharajpur, Faridabad",
  camp3DateLoc: "12 October 2025 • Deepak Bensla Baithak, Mewla Maharajpur, Haryana",
  camp3Desc: "Extending Tandicia's eye care mission across state borders into rural Haryana communities with complete ophthalmic diagnosis.",
  camp3Doctor: "Certified Ophthalmologists & Specialist Optometrists",

  camp4Title: "Community Follow-up & Comprehensive Camp",
  camp4DateLoc: "Delhi NCR / Haryana • Verified Camp Operations",
  camp4Desc: "Comprehensive vision testing, second-stage spectacles dispensing, and post-camp follow-up consultations.",
  camp4Doctor: "Tandicia Medical Volunteer Team & Senior Optometrists",

  // ==========================================
  // 5. SEWA RASOI PAGE
  // ==========================================
  sewaBadge: "Nutritional Relief & Dignity",
  sewaHeading: "Sewa Rasoi",
  sewaTagline: "Food with Dignity. Service with Compassion.",
  sewaSubtext: "No one should have to sleep on an empty stomach or endure hunger while tending to an ill family member. Sewa Rasoi is our community commitment to ensure wholesome food for all.",
  sewaPhilosophyTitle: "More Than a Meal",
  sewaPhilosophyP1: "Sewa Rasoi represents service, dignity, human connection, and community participation. It is not just about distributing calories; it is about reassuring people that in their toughest moments, they are not alone.",
  sewaPhilosophyP2: "Many attendants who travel from far-off villages to city hospitals spend their last penny on medical treatments, skipping meals themselves. Sewa Rasoi reaches these quiet warriors with hot, wholesome nutrition served with unconditional respect.",
  sewaMealsCount: "2,500+",
  sewaVolunteersCount: "45+",
  sewaDaysCount: "30+",
  sewaCommunitiesCount: "12+",

  // ==========================================
  // 6. NAI PEHAL PAGE
  // ==========================================
  naiBadge: "Community Initiatives",
  naiTitle: "Nai Pehal",
  naiSubtitle: "Grassroots responses to community needs — supporting senior citizens, single mothers, and families in times of vulnerability.",
  naiInit1Title: "Senior Citizens Care",
  naiInit1Desc: "Many elderly individuals face social isolation alongside age-related ailments. Tandicia connects volunteers with senior citizens for home visits, doctor accompaniments, routine medicine pickups, and shared conversations to restore their sense of family belonging.",
  naiInit2Title: "Single Parents Support",
  naiInit2Desc: "Raising children alone is fraught with financial, emotional, and social hurdles. Tandicia provides peer support groups, school supplies assistance, and volunteer tutoring networks so single mothers and fathers never feel alone in their struggle.",
  naiInit3Title: "Community Mutual Aid",
  naiInit3Desc: "Mobilizing swift assistance during localized distress—such as providing emergency winter blankets, seasonal health kits, or assisting families through sudden medical crises.",
  naiInit4Title: "Health & Hygiene Awareness",
  naiInit4Desc: "Conducting community workshops on diabetic eye care, clean drinking water practices, maternal nutrition, and seasonal epidemic prevention in partnership with medical volunteers.",

  // ==========================================
  // 6. IMPACT & TRANSPARENCY PAGE
  // ==========================================
  impactPageBadge: "Transparent Outcomes",
  impactPageTitle: "Our Impact",
  impactPageTagline: "Measuring the Difference We Make",
  impactPageDesc: "We do not measure success in marketing slogans, but in real smiles, restored vision, and the quiet dignity restored to human lives.",
  impactAccountabilityTitle: "Our Accountability Standard",
  impactAccountabilityDesc: "We maintain strict physical registers, photographic logs, and medical doctor signatures for every single eye camp conducted.",

  // ==========================================
  // 7. CONTACT PAGE
  // ==========================================
  contactBadge: "Reach Out & Engage",
  contactTitle: "Let's Connect",
  contactTagline: "Every connection can become an opportunity to serve.",
  contactDesc: "Whether you want to offer your time as a volunteer, collaborate on a community eye camp, or simply say hello, we look forward to hearing from you.",

  // ==========================================
  // 8. DONATE PAGE
  // ==========================================
  donateBadge: "Transparent Contributions",
  donateTitle: "Support Our Work",
  donateTagline: "Invest in someone's vision and dignity, your way.",
  donateDesc: "Your contribution directly supports on-site eye diagnosis camps, free corrective spectacles, and community care.",

  // ==========================================
  // 9. TEAM PAGE
  // ==========================================
  teamPageBadge: "The Dedicated Faces of Tandicia",
  teamPageTitle: "The People Behind Tandicia",
  teamPageTagline: "People who give their time, expertise and heart to serve the community.",
  teamPageDesc: "Tandicia is powered by doctors, professionals, youth, and compassionate citizens who step forward with verified dedication.",
  teamPatronHeading: "Patron & Inspiration",
  teamPatronSub: "Spiritual guidance and visionary inspiration for our mission.",

  // ==========================================
  // 10. DOCUMENTS & FAQ
  // ==========================================
  docsPageBadge: "Statutory Disclosures",
  docsPageTitle: "Documents & Governance",
  docsPageSubtitle: "Public transparency, official legal filings, compliance certificates, and audited activity registries.",
  faqPageBadge: "Got Questions?",
  faqPageTitle: "Frequently Asked Questions",
  faqPageSubtitle: "Clear, straightforward answers about Tandicia's eye camps, volunteers, and operations."
};

const CONTENT_STORAGE_KEY = "tandicia_custom_content_v1";

// Get current content (merging defaults with any admin edits)
export function getContent() {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CONTENT };
    const saved = JSON.parse(raw);
    // Upgrade legacy placeholder numbers to newly verified numbers
    if (saved.stat1Number === "1,200+" || saved.stat1Number === "1200+") {
      saved.stat1Number = DEFAULT_CONTENT.stat1Number;
      saved.stat1Label = DEFAULT_CONTENT.stat1Label;
    }
    if (saved.stat2Number === "4+") {
      saved.stat2Number = DEFAULT_CONTENT.stat2Number;
      saved.stat2Label = DEFAULT_CONTENT.stat2Label;
    }
    if (saved.stat3Number === "450+") {
      saved.stat3Number = DEFAULT_CONTENT.stat3Number;
      saved.stat3Label = DEFAULT_CONTENT.stat3Label;
    }
    if (saved.stat4Number === "50+") {
      saved.stat4Number = DEFAULT_CONTENT.stat4Number;
      saved.stat4Label = DEFAULT_CONTENT.stat4Label;
    }
    return { ...DEFAULT_CONTENT, ...saved };
  } catch (err) {
    console.warn("Error reading content:", err);
    return { ...DEFAULT_CONTENT };
  }
}

// Update multiple content fields
export function saveContent(updatedFields) {
  try {
    const current = getContent();
    const merged = { ...current, ...updatedFields };
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new Event("tandicia_content_updated"));
    return merged;
  } catch (err) {
    console.error("Failed to save content:", err);
    throw err;
  }
}

// Reset all website texts to original defaults
export function resetContentToDefault() {
  try {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    window.dispatchEvent(new Event("tandicia_content_updated"));
    return { ...DEFAULT_CONTENT };
  } catch (err) {
    console.error("Failed to reset content:", err);
    throw err;
  }
}

// React Hook for dynamic reactive content
export function useContent() {
  const [content, setContent] = useState(getContent());

  useEffect(() => {
    const handleUpdate = () => {
      setContent(getContent());
    };
    window.addEventListener("tandicia_content_updated", handleUpdate);
    return () => window.removeEventListener("tandicia_content_updated", handleUpdate);
  }, []);

  return content;
}
