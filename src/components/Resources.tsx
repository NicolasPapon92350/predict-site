"use client";

import { useState, useRef } from "react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { getSessionId } from "@/lib/session";
import {
  FileText,
  BookOpen,
  Download,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Users,
  Brain,
  Lightbulb,
} from "lucide-react";

const whitepapers = [
  {
    id: "prevention-guide",
    title: "Les 3 clés d'une stratégie de prévention santé efficace",
    description:
      "Nos conseils pour éviter les erreurs communes en Prévention Santé & QVT. Découvrez comment automatiser et optimiser la prévention santé dans votre entreprise.",
    highlights: [
      "Les erreurs principales que commettent les entreprises",
      "Différents conseils pour obtenir des données avec précision",
      "Les raisons d'adopter une culture de prévention",
      "Un pas-à-pas pour planifier, mettre en place et optimiser",
    ],
    icon: FileText,
    gradient: "from-primary to-primary-light",
    href: "https://predictanalyse.com/t%C3%A9l%C3%A9charger-premier-guide",
  },
  {
    id: "transdisciplinarite",
    title: "La transdisciplinarité au service de la santé en entreprise",
    description:
      "Découvrez pourquoi et comment implémenter une démarche de prévention transdisciplinaire en entreprise.",
    highlights: [
      "Les problèmes et les défis de la prévention non-collaborative actuelle",
      "La différence entre multidisciplinarité et transdisciplinarité",
      "Les principaux avantages pour l'entreprise",
      "Les étapes clés pour instaurer une démarche transdisciplinaire",
    ],
    icon: Users,
    gradient: "from-secondary-dark to-secondary",
    href: "https://predictanalyse.com/ressources/livres-blancs",
  },
];

const scientificThemes = [
  {
    icon: Brain,
    title: "Neurosciences de la douleur",
    description:
      "Études sur les mécanismes neurophysiologiques et le modèle biopsychosocial de la douleur.",
  },
  {
    icon: Lightbulb,
    title: "Prévention des TMS",
    description:
      "Littérature scientifique sur les troubles musculo-squelettiques et les approches préventives.",
  },
  {
    icon: FlaskConical,
    title: "Risques psychosociaux",
    description:
      "Recherches sur le stress au travail, la charge mentale et les facteurs psychosociaux.",
  },
  {
    icon: BookOpen,
    title: "Activité physique & nutrition",
    description:
      "Études sur l'impact de l'exercice et de la nutrition sur la santé au travail.",
  },
];

export default function Resources() {
  const [activeWhitepaper, setActiveWhitepaper] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const { recordSignal } = useTracking();
  const formStartedRef = useRef<Record<string, boolean>>({});

  const handleSubmit = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    let utmData: Record<string, string> | undefined;
    try {
      const raw = localStorage.getItem("utm_data");
      if (raw) utmData = JSON.parse(raw);
    } catch {}

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company"),
          phone: data.get("phone") || undefined,
          formType: "GUIDE_DOWNLOAD",
          utmData,
          sessionId: getSessionId(),
        }),
      });
    } catch {}

    setSubmitted((prev) => ({ ...prev, [id]: true }));
    recordSignal("form_completed", `resource_${id}`);
    recordSignal("guide_downloaded", id);
  };

  return (
    <section
      id="ressources"
      className="py-24 bg-gradient-to-b from-white to-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Ressources
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Des ressources{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              gratuites
            </span>{" "}
            pour votre stratégie
          </h2>
          <p className="mt-4 text-lg text-muted">
            Livres blancs, guides pratiques et littérature scientifique pour
            approfondir vos connaissances en prévention santé.
          </p>
        </div>

        {/* Livres blancs */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Livres blancs
              </h3>
              <p className="text-sm text-muted">
                Téléchargez gratuitement nos guides experts
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whitepapers.map((wp) => (
              <div
                key={wp.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Top gradient bar */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${wp.gradient}`}
                />
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${wp.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <wp.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg leading-snug">
                        {wp.title}
                      </h4>
                      <p className="text-sm text-muted mt-1">
                        {wp.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      À retrouver dans ce guide :
                    </p>
                    {wp.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        {h}
                      </div>
                    ))}
                  </div>

                  {/* Toggle form */}
                  {activeWhitepaper !== wp.id && !submitted[wp.id] ? (
                    <button
                      onClick={() => setActiveWhitepaper(wp.id)}
                      className="group/btn w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger gratuitement
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : submitted[wp.id] ? (
                    <div className="text-center py-3 bg-green-50 rounded-xl">
                      <div className="flex items-center justify-center gap-2 text-green-700 font-semibold text-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        Vérifiez votre boîte mail !
                      </div>
                    </div>
                  ) : (
                    <form
                      onFocus={() => {
                        if (!formStartedRef.current[wp.id]) {
                          formStartedRef.current[wp.id] = true;
                          recordSignal("form_started", `resource_${wp.id}`);
                        }
                      }}
                      onSubmit={(e) => handleSubmit(wp.id, e)}
                      className="space-y-3 animate-fade-in"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="firstName"
                          required
                          placeholder="Prénom"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                        <input
                          type="text"
                          name="lastName"
                          required
                          placeholder="Nom"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email professionnel"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="Entreprise"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Téléphone"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
                      >
                        <Download className="w-4 h-4" />
                        Recevoir le guide
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Littérature scientifique */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Littérature scientifique
              </h3>
              <p className="text-sm text-muted">
                Sources et études sur lesquelles repose notre approche
              </p>
            </div>
          </div>

          <p className="text-muted leading-relaxed mb-8 max-w-3xl">
            Une de nos valeurs phares est la rigueur scientifique qui nous aide
            à aborder les problématiques de santé de la façon la plus objective
            possible. Par volonté de transparence, vous trouverez ici toutes les
            sources utilisées pour la création de nos logiciels et de nos
            formations.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {scientificThemes.map((theme, i) => (
              <a
                key={i}
                href="https://predictanalyse.com/ressources/litt%C3%A9rature-scientifique"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                  <theme.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                  {theme.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  {theme.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Consulter
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://predictanalyse.com/ressources/litt%C3%A9rature-scientifique"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-white border-2 border-primary/20 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              Consulter la liste complète
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
