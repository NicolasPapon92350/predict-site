export default function TrustBanner() {
  const badges = [
    "Conforme RGPD",
    "Hébergement HDS",
    "ISO 27001",
    "Made in France",
  ];

  return (
    <section id="trust" className="py-12 bg-surface-dark border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-muted">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
