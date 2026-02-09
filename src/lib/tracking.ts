declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "accepted";
}

function sendEvent(eventName: string, params: Record<string, string | number>) {
  if (!hasConsent() || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackSectionView(sectionId: string) {
  sendEvent("section_view", { section_id: sectionId });
}

export function trackScrollDepth(sectionId: string, depth: number) {
  sendEvent("scroll_depth", { section_id: sectionId, depth_percent: depth });
}

export function trackTimeOnSection(sectionId: string, seconds: number) {
  sendEvent("time_on_section", { section_id: sectionId, seconds });
}

export function trackCTAClick(ctaName: string) {
  sendEvent("cta_click", { cta_name: ctaName });
}

export function trackFormInteraction(formName: string, action: "started" | "completed") {
  sendEvent("form_interaction", { form_name: formName, action });
}

export function trackGuideDownload(guideName: string) {
  sendEvent("guide_download", { guide_name: guideName });
}

export function trackBlogClick(articleTitle: string) {
  sendEvent("blog_click", { article_title: articleTitle });
}

export function trackLeadScore(score: number, level: string) {
  sendEvent("lead_score_update", { score, level });
}

export function captureUTMParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utmData: Record<string, string> = {};
  let hasUTM = false;

  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) {
      utmData[key] = value;
      hasUTM = true;
    }
  }

  if (hasUTM) {
    localStorage.setItem("utm_data", JSON.stringify(utmData));
  }
}
