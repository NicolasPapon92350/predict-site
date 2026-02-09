"use client";

import { useState } from "react";
import { Clock, ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTracking } from "@/components/tracking/TrackingProvider";

const articles = [
  {
    title: "Quel sport pratiquer pour perdre du poids ?",
    excerpt:
      "Piscine, vélo, course à pied, crossfit... beaucoup de sports sont mis en avant pour perdre du poids. Lequel privilégier ?",
    date: "30 Jan 2025",
    category: "Activité physique",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2025/01/2150316720-2.jpg",
    href: "https://blog.predictanalyse.com/index.php/2025/01/30/quel-sport-pratiquer-pour-perdre-du-poids/",
    readTime: "5 min",
  },
  {
    title: "Une meilleure compréhension de la douleur pour mieux agir dessus",
    excerpt:
      "La douleur est un mécanisme complexe dont la compréhension s'affine tous les jours grâce aux neurosciences.",
    date: "23 Nov 2023",
    category: "Douleur",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/03/brain-study-background-for-mental-health-care-medical--825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2023/11/23/une-meilleure-comprehension-de-la-douleur-pour-mieux-agir-dessus/",
    readTime: "5 min",
  },
  {
    title: "Craquements dans les articulations, d'où ça vient ?",
    excerpt:
      "Des craquements dans les doigts ou dans les genoux ? Est-ce grave docteur ? Est-ce lié à des pathologies ?",
    date: "11 Sep 2023",
    category: "Santé",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2023/05/pretty-sporty-young-woman-stretching-clasped-hands-min-824x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2023/09/11/craquements-dans-les-articulations-dou-ca-vient/",
    readTime: "4 min",
  },
  {
    title:
      "L'alimentation pour une prévention optimale : un sujet controversé",
    excerpt:
      "Comme tout le monde a un avis tranché sur la question de l'alimentation, voici quelques informations basées sur la science.",
    date: "16 Mai 2023",
    category: "Nutrition",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2023/05/nutrition-min-825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2023/05/16/lalimentation-pour-une-prevention-optimale-un-sujet-controverse/",
    readTime: "10 min",
  },
  {
    title: "Les étirements : quelle utilité dans la prévention ?",
    excerpt:
      "Tout le monde a déjà réalisé des étirements mais peu savent réellement à quoi ça sert.",
    date: "1 Mar 2023",
    category: "Activité physique",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/11/caucasian-woman-practicing-yoga-home-min-825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2023/03/01/les-etirements-quelle-utilite-dans-la-prevention/",
    readTime: "10 min",
  },
  {
    title: "Quel sport pratiquer pour vivre le plus longtemps possible ?",
    excerpt:
      "Pratiquer du sport augmente l'espérance de vie, tout le monde le sait ! Mais que faire pour maximiser nos chances ?",
    date: "19 Nov 2022",
    category: "Activité physique",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/11/Quel-sport-pour-vivre-le-plus-longtemps-827x550.png",
    href: "https://blog.predictanalyse.com/index.php/2022/11/19/quel-sport-pratiquer-pour-vivre-le-plus-longtemps-possible/",
    readTime: "5 min",
  },
  {
    title: "L'importance de notre santé mentale sur nos douleurs",
    excerpt:
      "La vision transdisciplinaire de l'humain nous apprend que la santé mentale et la santé physique vont de pair.",
    date: "11 Oct 2022",
    category: "Douleur",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/08/1concept-problems-with-memory-amnesia-disease-min-825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2022/10/11/limportance-de-notre-sante-mentale-sur-nos-douleurs/",
    readTime: "8 min",
  },
  {
    title:
      "Quelles chaussures de running pour diminuer le risque de blessure ?",
    excerpt:
      "Existe-t-il des chaussures de running plus efficaces pour prévenir les blessures ? Ou le choix est avant tout subjectif ?",
    date: "22 Sep 2022",
    category: "Activité physique",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/09/close-up-shoes-female-runner-tying-her-shoes-jogging-exercise-min-824x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2022/09/22/quelles-chaussures-de-running-pour-diminuer-le-risque-de-blessure/",
    readTime: "5 min",
  },
  {
    title: "Tendinite du coude et prévention : TMS sans solution ?",
    excerpt:
      "La tendinite latérale de coude est une affection très répandue avec beaucoup de disparités dans les traitements.",
    date: "5 Sep 2022",
    category: "Douleur",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/06/young-adult-female-with-her-muscle-pain-on-gray-background-woman-having-elbow-ache-due-to-lateral-epicondylitis-or-tennis-elbow-injuries-and-medical-concept2-825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2022/09/05/tendinite-du-coude-et-prevention-tms-sans-solution/",
    readTime: "8 min",
  },
  {
    title:
      "Adapter l'Humain ou le matériel ? Le casse-tête de la prévention",
    excerpt:
      "Pourquoi s'acharne-t-on à modifier l'environnement quand on peut adapter notre corps ?",
    date: "16 Juin 2022",
    category: "Prévention",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/06/working-from-home-in-ergonomic-workstation-825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2022/06/16/adapter-lhumain-ou-le-materiel-le-casse-tete-de-la-prevention-en-entreprise/",
    readTime: "5 min",
  },
  {
    title: "Le syndrome du canal carpien : comment éviter l'opération ?",
    excerpt:
      "Le syndrome du canal carpien est aujourd'hui exclusivement traité par chirurgie alors que nous disposons d'autres moyens.",
    date: "4 Mai 2022",
    category: "Santé",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/03/unagi_5_landing_carpal_tunnel_syndrome_CTS_1-845x507.jpg",
    href: "https://blog.predictanalyse.com/index.php/2022/05/04/le-syndrome-du-canal-carpien-comment-eviter-loperation/",
    readTime: "10 min",
  },
  {
    title:
      "Travail sur écran : comment le télétravail redéfinit la prévention ?",
    excerpt:
      "Le travail sur écran a un impact tout sauf négligeable, surtout depuis les contraintes du télétravail.",
    date: "18 Avr 2022",
    category: "Prévention",
    imageUrl:
      "https://blog.predictanalyse.com/wp-content/uploads/2022/03/Group-37291-825x550.jpg",
    href: "https://blog.predictanalyse.com/index.php/2022/04/18/travail-sur-ecran-comment-le-teletravail-redefinit-la-prevention-en-entreprise/",
    readTime: "3 min",
  },
];

const categories = [
  "Tous",
  "Activité physique",
  "Douleur",
  "Santé",
  "Nutrition",
  "Prévention",
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [showAll, setShowAll] = useState(false);
  const { recordSignal } = useTracking();

  const filtered =
    activeCategory === "Tous"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);
  const featured = filtered[0];
  const grid = displayed.slice(1);

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-white to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Blog & Ressources
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              La science{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                accessible
              </span>{" "}
              à tous
            </h2>
            <p className="mt-2 text-muted max-w-lg">
              Des articles rédigés par nos experts, basés sur la littérature
              scientifique, pour mieux comprendre votre santé au travail.
            </p>
          </div>
          <a
            href="https://blog.predictanalyse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-dark transition-all shrink-0"
          >
            Tous les articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-muted border border-gray-200 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article + Grid */}
        {featured && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Featured */}
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordSignal("blog_click", featured.title)}
              className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72 lg:h-full min-h-[320px]">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                      {featured.category}
                    </span>
                    <span className="text-white/70 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-secondary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-secondary text-sm font-semibold group-hover:gap-3 transition-all">
                    Lire l&apos;article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>

            {/* Top 2 articles in right column */}
            <div className="flex flex-col gap-8">
              {grid.slice(0, 2).map((article, i) => (
                <a
                  key={i}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordSignal("blog_click", article.title)}
                  className="group flex gap-5 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative w-40 sm:w-48 shrink-0">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>
                  <div className="py-4 pr-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted">{article.date}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-sm leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2 hidden sm:block">
                      {article.excerpt}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                      Lire
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Rest of grid */}
        {grid.length > 2 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grid.slice(2).map((article, i) => (
              <a
                key={i}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordSignal("blog_click", article.title)}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-foreground">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted mb-2">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Lire l&apos;article
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Show more / less */}
        {filtered.length > 6 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-white border-2 border-primary/20 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              {showAll
                ? "Voir moins"
                : `Voir plus d'articles (${filtered.length - 6} restants)`}
              <ArrowRight
                className={`w-4 h-4 transition-transform ${showAll ? "rotate-[-90deg]" : "rotate-90"}`}
              />
            </button>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <a
            href="https://blog.predictanalyse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full"
          >
            Tous les articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
