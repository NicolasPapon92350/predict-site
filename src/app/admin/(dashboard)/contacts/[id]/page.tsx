"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Eye,
  MousePointer,
  FileText,
  Clock,
  Mail,
  Building2,
  Phone,
  User,
} from "lucide-react";

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
  sessionId?: string | null;
  createdAt: string;
}

interface TimelineEvent {
  id: string;
  type: string;
  timestamp: string;
  details: Record<string, unknown> | null;
  url?: string | null;
}

const eventConfig: Record<string, { icon: typeof Globe; label: string; color: string }> = {
  page_view: { icon: Globe, label: "Page vue", color: "bg-blue-100 text-blue-600" },
  section_view: { icon: Eye, label: "Section vue", color: "bg-violet-100 text-violet-600" },
  cta_click: { icon: MousePointer, label: "Clic CTA", color: "bg-orange-100 text-orange-600" },
  form_started: { icon: FileText, label: "Formulaire commencé", color: "bg-yellow-100 text-yellow-700" },
  form_completed: { icon: FileText, label: "Formulaire envoyé", color: "bg-green-100 text-green-700" },
  time_on_page: { icon: Clock, label: "Temps sur page", color: "bg-gray-100 text-gray-600" },
  guide_downloaded: { icon: FileText, label: "Guide téléchargé", color: "bg-emerald-100 text-emerald-700" },
};

const defaultConfig = { icon: Eye, label: "Événement", color: "bg-gray-100 text-gray-600" };

function getEventDetails(event: TimelineEvent): string {
  const d = event.details;
  if (!d) return "";

  if (event.type === "page_view") return String(d.path || event.url || "");
  if (event.type === "section_view") return String(d.value || d.section || "");
  if (event.type === "cta_click") return String(d.value || "");
  if (event.type === "form_started" || event.type === "form_completed") return String(d.value || "");
  if (event.type === "guide_downloaded") return String(d.value || "");
  if (event.type === "time_on_page") return `${d.value || d.seconds || "?"}s`;

  return JSON.stringify(d);
}

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/contacts/${id}/activity`);
        if (res.ok) {
          const data = await res.json();
          setContact(data.contact);
          setTimeline(data.timeline);
        }
      } catch {}
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted">Chargement...</div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Contact introuvable.</p>
        <Link href="/admin/contacts" className="text-primary text-sm mt-2 inline-block">
          Retour aux contacts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/contacts"
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-surface transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {contact.firstName} {contact.lastName}
          </h1>
          <p className="text-sm text-muted">
            Parcours du visiteur
            {contact.sessionId && (
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {contact.sessionId.slice(0, 8)}...
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Contact info card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Informations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted">Nom</p>
              <p className="text-sm font-medium text-foreground">
                {contact.firstName} {contact.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-medium text-foreground">{contact.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Entreprise</p>
              <p className="text-sm font-medium text-foreground">{contact.company}</p>
            </div>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted">Téléphone</p>
                <p className="text-sm font-medium text-foreground">{contact.phone}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
              contact.formType === "DEMO_REQUEST"
                ? "bg-primary/10 text-primary"
                : "bg-secondary/20 text-secondary-dark"
            }`}
          >
            {contact.formType === "DEMO_REQUEST" ? "Demande de démo" : "Téléchargement guide"}
          </span>
          {contact.leadScore != null && (
            <span className="text-xs text-muted">Score : {contact.leadScore}</span>
          )}
          <span className="text-xs text-muted">
            {new Date(contact.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-foreground mb-6">
          Timeline d&apos;activité
          <span className="ml-2 text-xs font-normal text-muted">
            ({timeline.length} événement{timeline.length > 1 ? "s" : ""})
          </span>
        </h2>

        {timeline.length === 0 ? (
          <p className="text-sm text-muted text-center py-8">
            {contact.sessionId
              ? "Aucune activité enregistrée pour cette session."
              : "Ce contact n'a pas de session associée (formulaire soumis avant la mise en place du tracking)."}
          </p>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[17px] top-2 bottom-2 w-px bg-gray-200" />

            <div className="space-y-4">
              {timeline.map((event) => {
                const config = eventConfig[event.type] || defaultConfig;
                const Icon = config.icon;
                const details = getEventDetails(event);

                return (
                  <div key={event.id} className="relative flex items-start gap-4 pl-0">
                    <div
                      className={`relative z-10 flex-shrink-0 w-9 h-9 rounded-lg ${config.color} flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {config.label}
                        </span>
                        {details && (
                          <span className="text-xs text-muted truncate">{details}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        {new Date(event.timestamp).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
