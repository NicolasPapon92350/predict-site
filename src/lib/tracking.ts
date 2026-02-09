import { getSessionId } from "./session";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "accepted";
}

// --- Event buffer for server-side tracking ---
interface QueuedEvent {
  sessionId: string;
  eventName: string;
  properties?: Record<string, string | number>;
  url?: string;
  referrer?: string;
}

let eventBuffer: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flushEvents() {
  if (eventBuffer.length === 0) return;
  const batch = eventBuffer.splice(0, 50);
  try {
    const blob = new Blob([JSON.stringify(batch)], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
  } catch {
    // Fallback to fetch
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(batch),
      keepalive: true,
    }).catch(() => {});
  }
}

function scheduleFlush() {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flushEvents, 2000);
}

function queueEvent(eventName: string, properties?: Record<string, string | number>) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  eventBuffer.push({
    sessionId,
    eventName,
    properties,
    url: window.location.pathname,
    referrer: document.referrer || undefined,
  });

  if (eventBuffer.length >= 10) {
    flushEvents();
  } else {
    scheduleFlush();
  }
}

// Flush on page hide (tab close/navigate away)
if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushEvents();
    }
  });
}

// --- GA4 + server dual tracking ---
function sendEvent(eventName: string, params: Record<string, string | number>) {
  // Always queue for server
  queueEvent(eventName, params);

  // Also send to GA4 if consent
  if (hasConsent() && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackPageView() {
  queueEvent("page_view");
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
