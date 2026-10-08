/**
 * contentStore.js — Central text & content management for Tandicia website
 * Enables live editing of website texts, headlines, taglines, and impact statistics
 * from the Admin Panel.
 */

export const DEFAULT_CONTENT = {
  // Hero Section
  heroBadge: "मित्रता • दोस्ती • अपनापन",
  heroHeading1: "TANDICIA",
  heroHeading2: "ASSOCIATION",
  heroTagline: "Connecting People. Serving Communities. Being There for Each Other.",
  heroSubtext: "A community-driven initiative bringing people, professionals and volunteers together to create meaningful social impact.",
  heroCta1Text: "Explore Our Work",
  heroCta2Text: "Join Tandicia",

  // Purpose (Mitrata, Dosti, Apnapan)
  purposeHeading: "Together, We Can Make a Difference",
  purposeMitrata: "Building meaningful connections across barriers, cultivating friendship that creates trust and mutual respect in communities.",
  purposeDosti: "Standing by people when they need support the most, offering reliable companionship and dedicated solidarity through life’s struggles.",
  purposeApnapan: "Creating dignity, belonging, and genuine warmth so no one feels abandoned, overlooked, or unheard in our society.",

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
  stat4Label: "Volunteers & Supporters",
  stat4Sub: "Dedicated community members",

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
