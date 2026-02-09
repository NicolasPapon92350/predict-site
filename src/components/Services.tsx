"use client";

import {
  Bone,
  Brain,
  Apple,
  Dumbbell,
  HeartPulse,
  ScanEye,
} from "lucide-react";

const services = [
  {
    icon: Bone,
    title: "Troubles Musculo-Squelettiques",
    description:
      "Diagnostic et prévention des TMS par l'analyse posturale et ergonomique. Identification précoce des facteurs de risque.",
    tag: "TMS",
    gradient: "from-blue-900 to-blue-700",
    href: "https://predictanalyse.com/tms",
  },
  {
    icon: Brain,
    title: "Risques Psychosociaux",
    description:
      "Évaluation du stress, de la charge mentale et des facteurs psychosociaux. Plans d'action personnalisés.",
    tag: "RPS",
    gradient: "from-violet-500 to-purple-500",
    href: "https://predictanalyse.com/rps",
  },
  {
    icon: ScanEye,
    title: "Ergonomie",
    description:
      "Audit ergonomique des postes de travail. Recommandations concrètes pour optimiser l'environnement professionnel.",
    tag: "Ergonomie",
    gradient: "from-indigo-600 to-blue-500",
    href: "https://predictanalyse.com/ergonomie",
  },
  {
    icon: HeartPulse,
    title: "Psychologie du travail",
    description:
      "Accompagnement psychologique et suivi du bien-être mental. Détection des signaux faibles de mal-être.",
    tag: "Psychologie",
    gradient: "from-rose-500 to-pink-500",
    href: "https://predictanalyse.com/psychologie",
  },
  {
    icon: Apple,
    title: "Nutrition",
    description:
      "Programmes nutritionnels adaptés au monde professionnel. Conseils personnalisés basés sur la science.",
    tag: "Nutrition",
    gradient: "from-orange-500 to-red-500",
    href: "https://predictanalyse.com/nutrition",
  },
  {
    icon: Dumbbell,
    title: "Activité Physique",
    description:
      "Programmes d'activité physique adaptée. Exercices de prévention et de renforcement pour le quotidien.",
    tag: "Sport",
    gradient: "from-green-500 to-lime-500",
    href: "https://predictanalyse.com/activite-physique",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nos expertises
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Une approche{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              360&deg;
            </span>{" "}
            de la santé au travail
          </h2>
          <p className="mt-4 text-lg text-muted">
            Six domaines d&apos;expertise complémentaires pour une prévention
            globale et personnalisée.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <a
              key={i}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
            >
              {/* Gradient top bar */}
              <div
                className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${service.gradient} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white`}
                >
                  {service.tag}
                </span>
                <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  En savoir plus &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
