"use client";

import { useState } from "react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import {
  GraduationCap,
  Award,
  BookOpen,
  FlaskConical,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Bone,
  Brain,
  Lightbulb,
} from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Expertise",
    description:
      "Des formateurs experts dans leur domaine de compétences",
  },
  {
    icon: Users,
    title: "Transdisciplinarité",
    description:
      "Des formateurs impliqués dans l'expertise des situations complexes",
  },
  {
    icon: FlaskConical,
    title: "Rigueur scientifique",
    description:
      "Des formateurs au fait des dernières avancées scientifiques",
  },
  {
    icon: BookOpen,
    title: "Retour sur investissement",
    description:
      "Des rapports de formation au service de la prise de décision",
  },
];

const formations = [
  {
    id: "geste-posture",
    icon: Bone,
    title: "Formation gestes et postures",
    subtitle:
      "Les termes de geste, de posture et de position sont utilisés à tort et à travers chaque jour. Cette formation déconstruit les mythes et propose une approche innovante basée sur les neurosciences.",
    objectives: [
      "Appliquer les bons concepts de posture et de geste aux positions de travail",
      "Déconstruire les mythes majeurs entourant la notion de geste et posture",
      "Identifier et agir sur les facteurs de douleur modifiables",
      "Permettre l'auto-gestion de la douleur sans assistance professionnelle",
    ],
    programme: [
      "Le corps humain : approche evidence-based, données épidémiologiques, anatomie",
      "La douleur expliquée : ni la posture ni le geste ne sont des causes de douleur en soi",
      "La prévention : l'intervention doit commencer avant l'apparition des symptômes",
      "Application pratique : exercices et stratégies préventives",
    ],
    stats: [
      { value: "87%", label: "des maladies professionnelles sont des TMS" },
      { value: "24%", label: "des pertes économiques en Europe dues aux TMS" },
      { value: "31%", label: "des travailleurs estiment que le travail affecte leur santé" },
    ],
    gradient: "from-primary to-primary-light",
    interests: [
      "Un contenu de santé vulgarisé pour tout public",
      "Une approche innovante du bien-être et de la posture",
      "Formation personnalisée et conseils sur-mesure",
      "Des ateliers pratiques pour entretenir son corps",
    ],
  },
  {
    id: "tms-superieur",
    icon: Lightbulb,
    title: "Formation TMS du membre supérieur",
    subtitle:
      "Selon l'Assurance Maladie, 80% des TMS reconnus sont dus à 3 affections : le syndrome du canal carpien, l'atteinte de la coiffe des rotateurs et l'épicondylite du coude.",
    objectives: [
      "Identifier les causes de TMS intrinsèques et extrinsèques",
      "Repérer les premiers signes de ces maladies",
      "Savoir quelles conduites et exercices peuvent prévenir l'apparition de ces TMS",
      "Déconstruire les mythes quant à leur apparition",
    ],
    programme: [
      "Le Trouble Musculo-Squelettique (TMS) : définition et mécanismes",
      "La coiffe des rotateurs : anatomie, risques et prévention",
      "L'épicondylite : comprendre et prévenir le tennis elbow",
      "Le syndrome du canal carpien : alternatives à la chirurgie",
      "Ateliers pratiques : exercices de renforcement et prévention",
    ],
    stats: [
      { value: "80%", label: "des TMS reconnus touchent le membre supérieur" },
      { value: "53%", label: "des salariés déclarent leur travail physiquement fatigant" },
      { value: "3ème", label: "cause de handicap en France" },
    ],
    gradient: "from-secondary-dark to-secondary",
    interests: [
      "Compréhension précise des 3 TMS les plus fréquents",
      "Protocoles de prévention validés scientifiquement",
      "Formation personnalisée et conseils sur-mesure",
      "Des ateliers pratiques pour prévenir les TMS",
    ],
  },
  {
    id: "neurosciences",
    icon: Brain,
    title: "Formation neurosciences de la douleur",
    subtitle:
      "La douleur est un mécanisme complexe dont la compréhension s'affine grâce aux neurosciences. Cette formation offre les clés pour comprendre et agir sur la douleur de manière efficace.",
    objectives: [
      "Comprendre les mécanismes neurophysiologiques de la douleur",
      "Distinguer nociception et douleur : deux concepts différents",
      "Identifier les facteurs biopsychosociaux influençant la douleur",
      "Appliquer des stratégies basées sur les neurosciences pour la gestion de la douleur",
    ],
    programme: [
      "Définition de la douleur : modèle biopsychosocial d'Engel (1980)",
      "Nociception vs douleur : comprendre la dissociation",
      "L'influence de l'expérience et de l'apprentissage sur la douleur",
      "Stratégies pratiques : thérapies cognitivo-comportementales et exercices",
    ],
    stats: [
      { value: "35%", label: "de la population souffre de douleur chronique" },
      { value: "49%", label: "des salariés en détresse psychologique" },
      { value: "1 sur 2", label: "adulte multimorbide a des symptômes dépressifs sévères" },
    ],
    gradient: "from-accent to-accent-light",
    interests: [
      "Approche neuroscientifique de pointe",
      "Compréhension des liens entre mental et douleur",
      "Outils pratiques pour la gestion quotidienne",
      "Formation adaptée à tous les profils",
    ],
  },
];

export default function Formations() {
  const [expandedFormation, setExpandedFormation] = useState<string | null>(
    null
  );
  const { recordSignal } = useTracking();

  return (
    <section id="formations" className="py-24 bg-gradient-to-b from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Formations
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Des formations{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              innovantes
            </span>{" "}
            basées sur la science
          </h2>
          <p className="mt-4 text-lg text-muted">
            Tous les intervenants sont des professionnels de santé spécialisés
            dans le domaine musculo-squelettique et formés à l&apos;approche
            transdisciplinaire promue par Predict Analyse.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {values.map((value, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">
                {value.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Formations */}
        <div className="space-y-6">
          {formations.map((formation) => {
            const isExpanded = expandedFormation === formation.id;
            return (
              <div
                key={formation.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Formation Header */}
                <div
                  className="p-6 lg:p-8 cursor-pointer"
                  onClick={() =>
                    setExpandedFormation(isExpanded ? null : formation.id)
                  }
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${formation.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <formation.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {formation.title}
                          </h3>
                          <p className="text-muted text-sm leading-relaxed max-w-2xl">
                            {formation.subtitle}
                          </p>
                        </div>
                        <button
                          className="flex-shrink-0 w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted hover:bg-primary/10 hover:text-primary transition-colors"
                          aria-label={isExpanded ? "Réduire" : "Voir plus"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Stats - always visible */}
                      <div className="flex flex-wrap gap-6 mt-4">
                        {formation.stats.map((stat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">
                              {stat.value}
                            </span>
                            <span className="text-xs text-muted max-w-[120px] leading-tight">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 lg:px-8 pb-8 border-t border-gray-100 pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Objectives */}
                      <div>
                        <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          Objectifs
                        </h4>
                        <ul className="space-y-2.5">
                          {formation.objectives.map((obj, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Programme */}
                      <div>
                        <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Programme
                        </h4>
                        <ul className="space-y-2.5">
                          {formation.programme.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary mt-0.5">
                                {i + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="mt-6 bg-surface rounded-xl p-5">
                      <h4 className="font-bold text-foreground flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-primary" />
                        Quels intérêts ?
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {formation.interests.map((interest, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            {interest}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href="#demo"
                        onClick={() => recordSignal("cta_click", "formations_programme")}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
                      >
                        Recevoir le programme complet
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href="#demo"
                        onClick={() => recordSignal("cta_click", "formations_devis")}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-white border-2 border-primary/20 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
                      >
                        Demander un devis
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Source */}
        <p className="text-center text-xs text-muted mt-8">
          SOURCES : McKinsey Global Institute. Ameli. INRS. Our World in data. Malakoff Humanis.
        </p>
      </div>
    </section>
  );
}
