"use client";

import { useState, useRef } from "react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import {
  Download,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  TrendingDown,
  Shield,
  BarChart3,
} from "lucide-react";

const guideHighlights = [
  {
    icon: Shield,
    text: "Les erreurs principales que commettent les entreprises",
  },
  {
    icon: BarChart3,
    text: "Différents conseils pour obtenir des données avec précision",
  },
  {
    icon: BookOpen,
    text: "Les raisons d'adopter une culture de prévention",
  },
  {
    icon: TrendingDown,
    text: "Un pas-à-pas pour planifier, mettre en place et optimiser",
  },
];

export default function GuideDownload() {
  const [submitted, setSubmitted] = useState(false);
  const { recordSignal } = useTracking();
  const formStartedRef = useRef(false);

  return (
    <section id="guide" className="py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-secondary text-sm font-medium mb-5">
              <Download className="w-4 h-4" />
              Guide gratuit
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Comment réduire les risques d&apos;arrêts de travail ?
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Les 3 clés pour mettre en place une stratégie de prévention santé
              efficace. Découvrez les étapes à mettre en place pour construire
              votre stratégie.
            </p>

            <div className="space-y-3 mb-8">
              {guideHighlights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-white/90 text-sm"
                >
                  <item.icon className="w-4 h-4 text-secondary flex-shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-white/60 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                100% gratuit
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                Téléchargement immédiat
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                Sans engagement
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            {!submitted ? (
              <>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Téléchargez le guide
                </h3>
                <p className="text-sm text-muted mb-6">
                  Recevez gratuitement notre guide rédigé par notre équipe
                  d&apos;experts.
                </p>

                <form
                  onFocus={() => {
                    if (!formStartedRef.current) {
                      formStartedRef.current = true;
                      recordSignal("form_started", "guide_download");
                    }
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    recordSignal("form_completed", "guide_download");
                    recordSignal("guide_downloaded", "guide_prevention");
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="jean.dupont@entreprise.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Entreprise *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Mon entreprise"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
                  >
                    Télécharger le guide gratuit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <p className="text-[10px] text-muted mt-3 text-center">
                  En soumettant ce formulaire, j&apos;accepte que mes données
                  soient traitées par Predict Analyse conformément à la
                  politique de confidentialité.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Merci pour votre confiance !
                </h3>
                <p className="text-sm text-muted">
                  Regardez votre boîte mail : votre guide arrivera dans quelques
                  instants. Le mail peut arriver parfois dans l&apos;onglet
                  &quot;Promotions&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
