"use client";

import { useEffect, useState, useCallback } from "react";
import ContactsTable from "@/components/admin/ContactsTable";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string | null;
  employees?: string | null;
  formType: string;
  leadScore?: number | null;
  createdAt: string;
}

interface ContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminContactsPage() {
  const [data, setData] = useState<ContactsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (filter) params.set("type", filter);
      const res = await fetch(`/api/admin/contacts?${params}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {}
    setLoading(false);
  }, [page, filter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
          <p className="text-sm text-muted mt-1">
            {data ? `${data.total} contact${data.total > 1 ? "s" : ""} au total` : "Chargement..."}
          </p>
        </div>
        <div className="flex gap-2">
          {[
            { label: "Tous", value: "" },
            { label: "Démo", value: "DEMO_REQUEST" },
            { label: "Guide", value: "GUIDE_DOWNLOAD" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilter(opt.value);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === opt.value
                  ? "bg-primary text-white"
                  : "bg-white text-muted border border-gray-200 hover:bg-surface"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted">Chargement...</div>
        </div>
      ) : data ? (
        <>
          <ContactsTable contacts={data.contacts} />

          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-muted hover:bg-surface disabled:opacity-50 transition-colors"
              >
                Précédent
              </button>
              <span className="text-sm text-muted px-4">
                Page {data.page} / {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-muted hover:bg-surface disabled:opacity-50 transition-colors"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
