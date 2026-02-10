"use client";

import { ClipboardCheck, BarChart3, Lightbulb, Repeat, ArrowRight } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Diagnostic",
    description:
      "Vos collaborateurs répondent à un questionnaire scientifiquement validé en moins de 15 minutes. Analyse multidimensionnelle : TMS, RPS, nutrition, activité physique.",
    color: "bg-primary",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "Analyse IA",
    description:
      "Nos algorithmes croisent les données pour identifier les risques, détecter les signaux faibles et prédire les tendances d'absentéisme.",
    color: "bg-secondary-dark",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Plan d'action",
    description:
      "Recommandations personnalisées par collaborateur et par service. Plans d'action concrets et priorisés selon l'urgence.",
    color: "bg-accent",
  },
  {
    icon: Repeat,
    step: "04",
    title: "Suivi continu",
    description:
      "Tableaux de bord en temps réel, mesure de l'impact des actions, ajustements automatiques. ROI mesurable et démontrable.",
    color: "bg-green-500",
  },
];

export default function HowItWorks() {
  const { recordSignal } = useTracking();

  return (
    <section id="methode" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Notre méthode
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Un processus simple en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              4 étapes
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            De l&apos;analyse à l&apos;action, une méthodologie éprouvée pour des résultats
            concrets.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary via-accent to-green-500 opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group text-center">
                {/* Step circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform duration-300`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-100 flex items-center justify-center text-xs font-bold text-foreground shadow-sm">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#demo"
              onClick={() => recordSignal("cta_click", "howitworks_demo")}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
            >
              Lancez votre diagnostic
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-sm text-muted mt-3">Première étape offerte, sans engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
