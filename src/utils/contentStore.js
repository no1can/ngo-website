/**
 * contentStore.js — Central text & content management for Tandicia website
 * Enables live editing of website texts, headlines, taglines, and impact statistics
 * from the Admin Panel.
 */

export const DEFAULT_CONTENT = {
  // Hero Section
  heroBadge: "Our Vision: Perfect Vision for All",
  heroHeading1: "TANDICIA",
  heroHeading2: "ASSOCIATION",
  heroTagline: "Our Vision: Perfect Vision for All — Serving Communities with Dignity & Care",
  heroSubtext: "A community-driven initiative bringing dedicated eye doctors, professionals, and volunteers together to eradicate preventable vision impairment.",
  heroCta1Text: "Explore Eye Camps",
  heroCta2Text: "Join Tandicia",

  // Purpose / Vision Section
  purposeHeading: "Our Vision: Perfect Vision for All",
  purposeSubtext: "Dedicated to eliminating preventable blindness and ensuring clear vision, dignity, and accessible eye healthcare for every family.",
  pillar1Title: "Free Vision Screening",
  pillar1Desc: "Advanced diagnostic checkups with computerized refraction and autorefractor machines conducted directly inside community clusters.",
  pillar2Title: "Prescription Spectacles",
  pillar2Desc: "Custom-tested, durable prescription corrective eyeglasses fitted and distributed completely free of charge to verified attendees.",
  pillar3Title: "Specialist Medical Care",
  pillar3Desc: "Senior ophthalmologist consultations, cataract grading, and direct subsidised surgical referrals in partnership with leading eye institutes.",

  // Impact Numbers
  stat1Number: "1,200+",
  stat1Label: "People Reached",
  stat1Sub: "Beneficiaries served",

  stat2Number: "4+",
  stat2Label: "Eye Camps",
  stat2Sub: "Conducted on-site",

  stat3Number: "450+",
  stat3Label: "Spectacles Distributed",
  stat3Sub: "Free corrective eyewear",

  stat4Number: "50+",
  stat4Label: "Volunteers & Doctors",
  stat4Sub: "Dedicated team members",

  // Eye Camps Spotlight Section
  eyeCampsHeading: "Bringing Vision Closer to Those Who Need It",
  eyeCampsSubtext: "Delivering primary ophthalmic checkups, refraction, specialist consultations, and free prescription spectacles directly to underserved communities.",

  // Final Call to Action
  ctaHeading: "Be There for Someone",
  ctaQuote: "\"You don't need to do everything. Sometimes, simply being there makes a difference.\"",
  ctaButton1Text: "Become a Volunteer",
  ctaButton2Text: "Support Our Work",

  // Contact & Organisation Info
  orgEmail: "connect@tandiciaassociation.com",
  orgPhone: "+91 98716 74098",
  orgAddress: "New Delhi, India"
};

const CONTENT_STORAGE_KEY = "tandicia_custom_content_v1";

// Get current content (merging defaults with any admin edits)
export function getContent() {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CONTENT };
    const saved = JSON.parse(raw);
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
