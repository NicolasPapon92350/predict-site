"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Predict Analyse nous a permis de réduire notre absentéisme de 30% en 8 mois. Les recommandations sont concrètes et directement actionnables.",
    author: "Marie Laurent",
    role: "DRH",
    company: "Groupe industriel - 2 500 collaborateurs",
    stars: 5,
    initials: "ML",
    color: "from-primary to-primary-light",
  },
  {
    quote:
      "L'outil Predicta a transformé notre approche de la prévention. Nous passons du curatif au prédictif avec des résultats impressionnants.",
    author: "Thomas Mercier",
    role: "Responsable QSE",
    company: "Secteur logistique - 800 collaborateurs",
    stars: 5,
    initials: "TM",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "La plateforme est intuitive et les rapports sont clairs. Nos managers ont enfin des outils concrets pour agir sur le bien-être de leurs équipes.",
    author: "Sophie Dubois",
    role: "Directrice Prévention",
    company: "Secteur santé - 1 200 collaborateurs",
    stars: 5,
    initials: "SD",
    color: "from-violet-500 to-purple-500",
  },
];

export default function Testimonials() {
  return (
    <section id="resultats" className="py-24 bg-gradient-to-b from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Ils nous font{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              confiance
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Des résultats concrets mesurés par nos clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100 group-hover:text-primary/10 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted">
                    {t.role} — {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
