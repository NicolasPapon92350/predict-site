export type LeadLevel = "cold" | "low" | "medium" | "high" | "hot";

export interface LeadScoreData {
  score: number;
  level: LeadLevel;
  sessionCount: number;
  sectionsViewed: string[];
  ctaClicks: string[];
  formStarted: boolean;
  formCompleted: boolean;
  guideDownloaded: boolean;
  demoSectionViewed: boolean;
  deepScrollSections: string[];
  timeSignals: string[];
  firstVisit: string;
  lastVisit: string;
}

const STORAGE_KEY = "lead_score_data";

const SIGNAL_POINTS: Record<string, number> = {
  section_view: 2,
  deep_scroll: 3,
  time_30s: 2,
  time_60s: 4,
  time_120s: 6,
  cta_click: 8,
  form_started: 15,
  form_completed: 25,
  guide_downloaded: 20,
  demo_section_viewed: 10,
  return_visit: 10,
  time_on_site_2min: 5,
  time_on_site_5min: 10,
  sections_3_plus: 8,
  blog_click: 3,
};

export function getLevel(score: number): LeadLevel {
  if (score >= 85) return "hot";
  if (score >= 60) return "high";
  if (score >= 30) return "medium";
  if (score >= 10) return "low";
  return "cold";
}

export function loadScoreData(): LeadScoreData {
  if (typeof window === "undefined") return createEmpty();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors
  }
  return createEmpty();
}

export function saveScoreData(data: LeadScoreData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createEmpty(): LeadScoreData {
  const now = new Date().toISOString();
  return {
    score: 0,
    level: "cold",
    sessionCount: 0,
    sectionsViewed: [],
    ctaClicks: [],
    formStarted: false,
    formCompleted: false,
    guideDownloaded: false,
    demoSectionViewed: false,
    deepScrollSections: [],
    timeSignals: [],
    firstVisit: now,
    lastVisit: now,
  };
}

export function recordSignal(
  data: LeadScoreData,
  signal: string,
  detail?: string
): LeadScoreData {
  const updated = { ...data, lastVisit: new Date().toISOString() };
  let pointsToAdd = 0;

  switch (signal) {
    case "section_view": {
      if (detail && !updated.sectionsViewed.includes(detail)) {
        updated.sectionsViewed = [...updated.sectionsViewed, detail];
        pointsToAdd = SIGNAL_POINTS.section_view;
        if (detail === "demo") {
          if (!updated.demoSectionViewed) {
            updated.demoSectionViewed = true;
            pointsToAdd += SIGNAL_POINTS.demo_section_viewed;
          }
        }
        if (updated.sectionsViewed.length === 3) {
          pointsToAdd += SIGNAL_POINTS.sections_3_plus;
        }
      }
      break;
    }
    case "deep_scroll": {
      const key = `scroll_${detail}`;
      if (detail && !updated.deepScrollSections.includes(key)) {
        updated.deepScrollSections = [...updated.deepScrollSections, key];
        pointsToAdd = SIGNAL_POINTS.deep_scroll;
      }
      break;
    }
    case "time_30s":
    case "time_60s":
    case "time_120s": {
      const timeKey = `${signal}_${detail}`;
      if (!updated.timeSignals.includes(timeKey)) {
        updated.timeSignals = [...updated.timeSignals, timeKey];
        pointsToAdd = SIGNAL_POINTS[signal];
      }
      break;
    }
    case "cta_click": {
      if (detail && !updated.ctaClicks.includes(detail)) {
        updated.ctaClicks = [...updated.ctaClicks, detail];
      }
      pointsToAdd = SIGNAL_POINTS.cta_click;
      break;
    }
    case "form_started": {
      if (!updated.formStarted) {
        updated.formStarted = true;
        pointsToAdd = SIGNAL_POINTS.form_started;
      }
      break;
    }
    case "form_completed": {
      if (!updated.formCompleted) {
        updated.formCompleted = true;
        pointsToAdd = SIGNAL_POINTS.form_completed;
      }
      break;
    }
    case "guide_downloaded": {
      if (!updated.guideDownloaded) {
        updated.guideDownloaded = true;
        pointsToAdd = SIGNAL_POINTS.guide_downloaded;
      }
      break;
    }
    case "return_visit": {
      pointsToAdd = SIGNAL_POINTS.return_visit;
      break;
    }
    case "time_on_site_2min": {
      if (!updated.timeSignals.includes("site_2min")) {
        updated.timeSignals = [...updated.timeSignals, "site_2min"];
        pointsToAdd = SIGNAL_POINTS.time_on_site_2min;
      }
      break;
    }
    case "time_on_site_5min": {
      if (!updated.timeSignals.includes("site_5min")) {
        updated.timeSignals = [...updated.timeSignals, "site_5min"];
        pointsToAdd = SIGNAL_POINTS.time_on_site_5min;
      }
      break;
    }
    case "blog_click": {
      pointsToAdd = SIGNAL_POINTS.blog_click;
      break;
    }
  }

  updated.score = Math.min(100, updated.score + pointsToAdd);
  updated.level = getLevel(updated.score);
  return updated;
}
