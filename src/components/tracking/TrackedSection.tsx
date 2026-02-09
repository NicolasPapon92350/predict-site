"use client";

import type { ReactNode } from "react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { useTracking } from "./TrackingProvider";

interface TrackedSectionProps {
  sectionId: string;
  children: ReactNode;
}

export default function TrackedSection({ sectionId, children }: TrackedSectionProps) {
  const { recordSignal } = useTracking();
  const ref = useSectionTracking(sectionId, recordSignal);

  return <div ref={ref}>{children}</div>;
}
