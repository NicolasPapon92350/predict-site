"use client";

import { useState } from "react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import {
  Search,
  BarChart3,
  TrendingUp,
  Users,
  Bot,
  FileBarChart,
  ShieldCheck,
  Target,
  Activity,
  Brain,
  Dumbbell,
  Apple,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const products = [
  {
    id: "analyse",
    tag: "Analyse des risques",
    icon: Search,
    title: "Analysez les risques de votre entreprise",
    subtitle:
      "PREDICTA identifie et cartographie les risques de santé de vos collaborateurs grâce à un questionnaire scientifiquement validé par 7 professionnels de santé.",
    features: [
      {
        icon: FileBarChart,
        title: "Questionnaire multidimensionnel",
        description:
          "5 thématiques couvertes : santé mentale, santé physique, ergonomie, activité physique et diététique.",
      },
      {
        icon: ShieldCheck,
        title: "Anonymat garanti (RGPD)",
        description:
          "Tous les résultats sont privés et appartiennent à chaque salarié. Conformité totale avec la réglementation.",
      },
      {
        icon: Target,
        title: "Cartographie précise",
        description:
          "Visualisez les zones de risque par service, par site et par thématique pour prioriser vos actions.",
      },
    ],
    stats: [
      { value: "15 min", label: "pour répondre au questionnaire" },
      { value: "5", label: "thématiques de santé couvertes" },
      { value: "7", label: "experts de santé impliqués" },
    ],
    gradient: "from-primary to-primary-light",
    visual: "analyse",
  },
  {
    id: "prediction",
    tag: "Prédiction des facteurs de santé",
    icon: TrendingUp,
    title: "Prédisez les facteurs de santé",
    subtitle:
      "Nos algorithmes d'intelligence artificielle croisent les données pour anticiper les risques, détecter les signaux faibles et prédire les tendances d'absentéisme.",
    features: [
      {
        icon: Brain,
        title: "Intelligence artificielle",
        description:
          "Algorithmes de machine learning entraînés sur des données épidémiologiques pour des prédictions fiables.",
      },
      {
        icon: Activity,
        title: "Détection des signaux faibles",
        description:
          "Identifiez les risques émergents avant qu'ils ne se transforment en arrêts de travail ou maladies professionnelles.",
      },
      {
        icon: BarChart3,
        title: "Tableaux de bord prédictifs",
        description:
          "Indicateurs en temps réel, alertes automatiques et visualisations claires pour piloter votre stratégie.",
      },
    ],
    stats: [
      { value: "-34%", label: "d'absentéisme en moyenne" },
      { value: "x4.2", label: "de ROI moyen constaté" },
      { value: "92%", label: "de satisfaction utilisateur" },
    ],
    gradient: "from-secondary-dark to-secondary",
    visual: "prediction",
  },
  {
    id: "accompagnement",
    tag: "Accompagnement automatisé",
    icon: Bot,
    title: "Accompagnez chaque collaborateur",
    subtitle:
      "PREDICTA accompagne chaque salarié dans une démarche de prévention autonome, personnalisée et centrée sur ses forces et faiblesses.",
    features: [
      {
        icon: Users,
        title: "Parcours personnalisé",
        description:
          "Chaque collaborateur reçoit des recommandations adaptées à son profil, ses risques et ses objectifs de santé.",
      },
      {
        icon: Dumbbell,
        title: "Contenus vidéo & exercices",
        description:
          "Bibliothèque de contenus pratiques : exercices de prévention, conseils nutrition, gestion du stress.",
      },
      {
        icon: Apple,
        title: "Suivi continu & mesurable",
        description:
          "Mesurez l'impact des actions mises en place et ajustez automatiquement les recommandations.",
      },
    ],
    stats: [
      { value: "+67%", label: "d'amélioration du bien-être" },
      { value: "94%", label: "de taux de participation" },
      { value: "100%", label: "personnalisé par salarié" },
    ],
    gradient: "from-accent to-accent-light",
    visual: "accompagnement",
  },
];

function MockVisual({ type }: { type: string }) {
  if (type === "analyse") {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-foreground">
            Cartographie des risques
          </span>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
            Temps réel
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "TMS", value: "32%", color: "bg-amber-100 text-amber-700" },
            { label: "RPS", value: "18%", color: "bg-green-100 text-green-700" },
            { label: "Nutrition", value: "45%", color: "bg-red-100 text-red-700" },
            { label: "Ergonomie", value: "28%", color: "bg-amber-100 text-amber-700" },
            { label: "Activité", value: "52%", color: "bg-red-100 text-red-700" },
            { label: "Mental", value: "22%", color: "bg-green-100 text-green-700" },
          ].map((item) => (
            <div
              key={item.label}
              className={`${item.color} rounded-xl p-3 text-center`}
            >
              <p className="text-lg font-bold">{item.value}</p>
              <p className="text-[10px] font-medium mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-surface rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs text-foreground font-medium">
              3 services en zone d&apos;attention
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-foreground font-medium">
              Participation : 94% des collaborateurs
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (type === "prediction") {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-foreground">
            Prédiction absentéisme
          </span>
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
            IA active
          </span>
        </div>
        <div className="flex items-end gap-1.5 h-32 mb-3">
          {[68, 62, 58, 52, 48, 44, 40, 36, 32, 30, 28, 25].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t transition-all"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i >= 9
                    ? "var(--secondary)"
                    : i >= 6
                      ? "var(--secondary-dark)"
                      : "var(--primary)",
                opacity: 0.7 + i * 0.025,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted mb-4">
          <span>Jan 2024</span>
          <span>Prédiction Déc 2024</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-green-50 rounded-lg p-2.5 text-center">
            <p className="text-sm font-bold text-green-700">-34%</p>
            <p className="text-[10px] text-green-600">Absentéisme</p>
          </div>
          <div className="flex-1 bg-primary/5 rounded-lg p-2.5 text-center">
            <p className="text-sm font-bold text-primary">x4.2</p>
            <p className="text-[10px] text-primary">ROI</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-foreground">
          Accompagnement personnalisé
        </span>
        <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full font-medium">
          Automatisé
        </span>
      </div>
      <div className="space-y-3">
        {[
          { name: "Marie D.", risk: "TMS épaule", progress: 75, status: "En cours" },
          { name: "Lucas B.", risk: "Stress", progress: 90, status: "Optimal" },
          { name: "Sophie R.", risk: "Sédentarité", progress: 45, status: "À suivre" },
        ].map((user) => (
          <div
            key={user.name}
            className="bg-surface rounded-xl p-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/30 flex items-center justify-center text-xs font-bold text-primary">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground">
                  {user.name}
                </span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    user.progress >= 80
                      ? "bg-green-100 text-green-700"
                      : user.progress >= 60
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <p className="text-[10px] text-muted mb-1">{user.risk}</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-accent to-accent-light h-1.5 rounded-full"
                  style={{ width: `${user.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductFeatures() {
  const [activeProduct, setActiveProduct] = useState(0);
  const { recordSignal } = useTracking();
  const product = products[activeProduct];

  return (
    <section id="produits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Les fonctionnalités de PREDICTA
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Une solution{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              complète
            </span>{" "}
            en 3 piliers
          </h2>
          <p className="mt-4 text-lg text-muted">
            L&apos;algorithme traite les RPS et les TMS conjointement pour un
            retour sur investissement clair et mesurable.
          </p>
        </div>

        {/* Product Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveProduct(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                activeProduct === i
                  ? `bg-gradient-to-r ${p.gradient} text-white shadow-lg`
                  : "bg-white text-muted border border-gray-200 hover:border-primary/30 hover:text-primary"
              }`}
            >
              <p.icon className="w-4 h-4" />
              {p.tag}
            </button>
          ))}
        </div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs font-semibold mb-4`}
            >
              <product.icon className="w-3.5 h-3.5" />
              {product.tag}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
              {product.title}
            </h3>
            <p className="text-muted leading-relaxed mb-8">{product.subtitle}</p>

            <div className="space-y-5 mb-8">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {product.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#demo"
              onClick={() => recordSignal("cta_click", "produits_demo")}
              className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all shadow-lg shadow-accent/25"
            >
              Demander une démo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <MockVisual type={product.visual} />

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-foreground">
                  RGPD & HDS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
