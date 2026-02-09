"use client";

import {
  BarChart3,
  Shield,
  Zap,
  Lock,
  CloudCog,
  ArrowRight,
} from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

const features = [
  {
    icon: BarChart3,
    title: "Analyse prédictive IA",
    description:
      "Algorithmes de machine learning pour anticiper les risques avant qu'ils ne surviennent.",
  },
  {
    icon: Shield,
    title: "Diagnostic complet",
    description:
      "Évaluation multidimensionnelle couvrant TMS, RPS, nutrition, ergonomie et activité physique.",
  },
  {
    icon: Zap,
    title: "Résultats en temps réel",
    description:
      "Tableaux de bord interactifs avec indicateurs clés et alertes automatiques.",
  },
  {
    icon: Lock,
    title: "Données sécurisées",
    description:
      "Conformité RGPD totale. Hébergement HDS certifié pour les données de santé.",
  },
  {
    icon: CloudCog,
    title: "Plateforme SaaS",
    description:
      "Accessible partout, déploiement rapide, mises à jour automatiques et support dédié.",
  },
];

export default function Predicta() {
  const { recordSignal } = useTracking();
  return (
    <section
      id="predicta"
      className="py-24 bg-gradient-to-b from-surface to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Notre plateforme
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Predicta
              </span>
              , votre outil numérique de prévention
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Une plateforme unique qui analyse l&apos;état de santé de vos
              collaborateurs pour prédire les risques et fournir des solutions
              adaptées à vos réels besoins.
            </p>

            <div className="mt-8 space-y-5">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#demo"
                onClick={() => recordSignal("cta_click", "predicta_essayer")}
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
              >
                Essayer Predicta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 ml-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-muted border border-gray-200 max-w-xs">
                    app.predictanalyse.com/dashboard
                  </div>
                </div>
              </div>

              {/* Mock App */}
              <div className="p-6">
                {/* Navigation tabs */}
                <div className="flex gap-4 mb-6">
                  {["Vue d'ensemble", "TMS", "RPS", "Nutrition"].map(
                    (tab, i) => (
                      <span
                        key={i}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                          i === 0
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-muted"
                        }`}
                      >
                        {tab}
                      </span>
                    )
                  )}
                </div>

                {/* Risk assessment */}
                <div className="bg-surface rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">
                      Score de risque global
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      -12% ce mois
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-secondary to-primary h-3 rounded-full transition-all"
                      style={{ width: "28%" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-green-600 font-medium">
                      Faible : 28%
                    </span>
                    <span className="text-[10px] text-muted">Objectif : 20%</span>
                  </div>
                </div>

                {/* Alerts */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-amber-50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs text-amber-800">
                      3 collaborateurs en zone d&apos;alerte TMS
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-green-800">
                      Taux de participation : 94%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted">Certifié</p>
                  <p className="text-xs font-bold text-foreground">HDS & RGPD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
