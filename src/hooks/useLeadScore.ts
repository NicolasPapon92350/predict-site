"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  type LeadScoreData,
  type LeadLevel,
  loadScoreData,
  saveScoreData,
  recordSignal as recordSignalFn,
} from "@/lib/lead-scoring";
import { trackLeadScore } from "@/lib/tracking";

export function useLeadScore() {
  const [data, setData] = useState<LeadScoreData | null>(null);
  const previousLevel = useRef<LeadLevel | null>(null);

  useEffect(() => {
    const loaded = loadScoreData();
    loaded.sessionCount += 1;
    loaded.lastVisit = new Date().toISOString();

    if (loaded.sessionCount > 1) {
      const updated = recordSignalFn(loaded, "return_visit");
      setData(updated);
      saveScoreData(updated);
      previousLevel.current = updated.level;
    } else {
      setData(loaded);
      saveScoreData(loaded);
      previousLevel.current = loaded.level;
    }
  }, []);

  useEffect(() => {
    if (!data) return;
    if (previousLevel.current && previousLevel.current !== data.level) {
      trackLeadScore(data.score, data.level);
    }
    previousLevel.current = data.level;
  }, [data]);

  const recordSignal = useCallback(
    (signal: string, detail?: string) => {
      setData((prev) => {
        if (!prev) return prev;
        const updated = recordSignalFn(prev, signal, detail);
        saveScoreData(updated);
        return updated;
      });
    },
    []
  );

  return {
    score: data?.score ?? 0,
    level: (data?.level ?? "cold") as LeadLevel,
    recordSignal,
  };
}
