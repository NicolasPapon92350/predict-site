"use client";

import { useEffect, useState, useCallback } from "react";
import EngagementChart from "@/components/admin/EngagementChart";
import DateRangePicker from "@/components/admin/DateRangePicker";

interface EventsData {
  sectionViews: { section: string; count: number }[];
  ctaClicks: { cta: string; count: number }[];
  eventsByType: { name: string; count: number }[];
}

export default function AdminEventsPage() {
  const [data, setData] = useState<EventsData | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events?days=${days}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {}
    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted">Chargement...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Événements</h1>
          <p className="text-sm text-muted mt-1">Engagement et interactions utilisateurs</p>
        </div>
        <DateRangePicker value={days} onChange={setDays} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <EngagementChart
          title="Vues par section"
          data={data.sectionViews.map((s) => ({ name: s.section || "inconnu", count: s.count }))}
        />
        <EngagementChart
          title="Clics CTA"
          data={data.ctaClicks.map((c) => ({ name: c.cta || "inconnu", count: c.count }))}
          color="#FF511A"
        />
      </div>

      <EngagementChart
        title="Événements par type"
        data={data.eventsByType}
        color="#1CECBA"
      />
    </div>
  );
}
