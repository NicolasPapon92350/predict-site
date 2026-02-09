"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLeadScore } from "@/hooks/useLeadScore";
import { captureUTMParams } from "@/lib/tracking";
import type { LeadLevel } from "@/lib/lead-scoring";

interface TrackingContextValue {
  score: number;
  level: LeadLevel;
  recordSignal: (signal: string, detail?: string) => void;
}

const TrackingContext = createContext<TrackingContextValue>({
  score: 0,
  level: "cold",
  recordSignal: () => {},
});

export function useTracking() {
  return useContext(TrackingContext);
}

export default function TrackingProvider({ children }: { children: ReactNode }) {
  const { score, level, recordSignal } = useLeadScore();

  useEffect(() => {
    captureUTMParams();
  }, []);

  useEffect(() => {
    const timer2min = setTimeout(() => {
      recordSignal("time_on_site_2min");
    }, 120_000);

    const timer5min = setTimeout(() => {
      recordSignal("time_on_site_5min");
    }, 300_000);

    return () => {
      clearTimeout(timer2min);
      clearTimeout(timer5min);
    };
  }, [recordSignal]);

  return (
    <TrackingContext.Provider value={{ score, level, recordSignal }}>
      {children}
    </TrackingContext.Provider>
  );
}
