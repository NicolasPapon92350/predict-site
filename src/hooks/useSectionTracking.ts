"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackSectionView, trackScrollDepth, trackTimeOnSection } from "@/lib/tracking";

export function useSectionTracking(
  sectionId: string,
  onSignal: (signal: string, detail?: string) => void
) {
  const ref = useRef<HTMLDivElement>(null);
  const hasBeenVisible = useRef(false);
  const timeStart = useRef<number | null>(null);
  const reportedDepths = useRef(new Set<number>());
  const reportedTimes = useRef(new Set<number>());

  const checkScrollDepth = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const sectionHeight = ref.current.offsetHeight;
    if (sectionHeight === 0) return;

    const visibleTop = Math.max(0, -rect.top);
    const depthPercent = Math.min(100, Math.round((visibleTop / sectionHeight) * 100));

    for (const threshold of [25, 50, 75, 100]) {
      if (depthPercent >= threshold && !reportedDepths.current.has(threshold)) {
        reportedDepths.current.add(threshold);
        trackScrollDepth(sectionId, threshold);
        if (threshold >= 75) {
          onSignal("deep_scroll", sectionId);
        }
      }
    }
  }, [sectionId, onSignal]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible.current) {
          hasBeenVisible.current = true;
          timeStart.current = Date.now();
          trackSectionView(sectionId);
          onSignal("section_view", sectionId);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    const scrollHandler = () => {
      if (hasBeenVisible.current) checkScrollDepth();
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const timeInterval = setInterval(() => {
      if (!timeStart.current || !hasBeenVisible.current) return;
      const elapsed = Math.floor((Date.now() - timeStart.current) / 1000);

      for (const [threshold, signal] of [
        [30, "time_30s"],
        [60, "time_60s"],
        [120, "time_120s"],
      ] as [number, string][]) {
        if (elapsed >= threshold && !reportedTimes.current.has(threshold)) {
          reportedTimes.current.add(threshold);
          trackTimeOnSection(sectionId, threshold);
          onSignal(signal, sectionId);
        }
      }
    }, 5000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scrollHandler);
      clearInterval(timeInterval);
    };
  }, [sectionId, onSignal, checkScrollDepth]);

  return ref;
}
