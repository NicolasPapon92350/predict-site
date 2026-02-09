"use client";

import { useEffect, useState, useCallback } from "react";
import { Eye, Users, FileText, Download } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import VisitsChart from "@/components/admin/VisitsChart";
import ContactsChart from "@/components/admin/ContactsChart";
import ContactsTable from "@/components/admin/ContactsTable";
import DateRangePicker from "@/components/admin/DateRangePicker";

interface Stats {
  totalPageViews: number;
  uniqueVisitors: number;
  totalContacts: number;
  demoRequests: number;
  guideDownloads: number;
  dailyVisits: { date: string; count: number }[];
  dailyContacts: { date: string; count: number }[];
  recentContacts: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    formType: string;
    leadScore: number | null;
    createdAt: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/stats?days=${days}`);
      if (res.ok) {
        setStats(await res.json());
      }
    } catch {}
    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted">Chargement...</div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Vue d&apos;ensemble du trafic et des conversions</p>
        </div>
        <DateRangePicker value={days} onChange={setDays} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pages vues" value={stats.totalPageViews} icon={Eye} />
        <StatCard title="Visiteurs uniques" value={stats.uniqueVisitors} icon={Users} color="text-secondary-dark" />
        <StatCard title="Demandes démo" value={stats.demoRequests} icon={FileText} color="text-accent" />
        <StatCard title="Guides téléchargés" value={stats.guideDownloads} icon={Download} color="text-primary-light" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <VisitsChart data={stats.dailyVisits} />
        <ContactsChart data={stats.dailyContacts} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Derniers contacts</h2>
        <ContactsTable contacts={stats.recentContacts} compact />
      </div>
    </div>
  );
}
