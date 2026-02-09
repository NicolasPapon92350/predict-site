export default function StructuredData() {
  const schemas = [
    // 1. Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Predict Analyse",
      url: "https://predictanalyse.com",
      logo: "https://predictanalyse.com/logo.svg",
      description:
        "Predict Analyse utilise l'intelligence artificielle pour diagnostiquer les risques de TMS et RPS, réduire l'absentéisme et améliorer la santé au travail.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@predictanalyse.com",
        telephone: "+33-1-23-45-67-89",
        contactType: "sales",
        availableLanguage: "French",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      sameAs: [
        "https://linkedin.com/company/predict-analyse",
        "https://youtube.com/@predictanalyse",
      ],
    },
    // 2. WebSite
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Predict Analyse",
      url: "https://predictanalyse.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://blog.predictanalyse.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    // 3. SoftwareApplication (Predicta)
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Predicta",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description:
        "Plateforme SaaS de prévention santé au travail utilisant l'IA pour analyser les risques TMS/RPS, prédire l'absentéisme et accompagner chaque collaborateur.",
      featureList: [
        "Analyse prédictive IA",
        "Diagnostic multidimensionnel",
        "Tableaux de bord en temps réel",
        "Accompagnement personnalisé",
        "Conformité RGPD & HDS",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.6",
        bestRating: "5",
        ratingCount: "200",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Démo gratuite disponible",
      },
    },
    // 4. FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qu'est-ce que Predict Analyse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Predict Analyse est une entreprise française spécialisée dans la prévention santé au travail par l'intelligence artificielle. Notre plateforme Predicta diagnostique les risques de TMS et RPS, prédit l'absentéisme et fournit des solutions personnalisées pour chaque collaborateur.",
          },
        },
        {
          "@type": "Question",
          name: "Comment fonctionne la plateforme Predicta ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Predicta fonctionne en 4 étapes : 1) Diagnostic via un questionnaire scientifiquement validé couvrant 5 thématiques de santé, 2) Analyse par nos algorithmes d'IA pour détecter les signaux faibles, 3) Plan d'action personnalisé avec contenus vidéo et exercices, 4) Suivi continu avec ajustement automatique des recommandations.",
          },
        },
        {
          "@type": "Question",
          name: "Quels résultats obtiennent les entreprises avec Predict Analyse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En moyenne, nos clients constatent une réduction de 34% de l'absentéisme, une amélioration de 67% du bien-être, un taux de satisfaction de 92% et un ROI de x4.2. Plus de 200 entreprises et 50 000 collaborateurs nous font confiance.",
          },
        },
        {
          "@type": "Question",
          name: "Predict Analyse est-il conforme au RGPD ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, Predict Analyse est entièrement conforme au RGPD. Nos données sont hébergées sur des serveurs certifiés HDS (Hébergement de Données de Santé) et ISO 27001. Tous les résultats individuels sont anonymes et appartiennent à chaque salarié.",
          },
        },
        {
          "@type": "Question",
          name: "Quelles formations propose Predict Analyse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nous proposons 3 formations : Gestes et Postures (approche evidence-based déconstruisant les mythes), TMS du membre supérieur (prévention des 3 TMS les plus fréquents) et Neurosciences de la douleur (compréhension du modèle biopsychosocial). Toutes sont animées par des professionnels de santé spécialisés.",
          },
        },
      ],
    },
    // 5. Services
    ...["TMS", "RPS", "Ergonomie", "Psychologie", "Nutrition", "Activité Physique"].map(
      (service) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        provider: {
          "@type": "Organization",
          name: "Predict Analyse",
        },
        name: `Prévention ${service}`,
        description: `Service de prévention ${service} en entreprise par Predict Analyse.`,
        areaServed: "FR",
      })
    ),
    // 6. Courses
    ...[
      {
        name: "Formation Gestes et Postures",
        description:
          "Formation evidence-based sur les gestes et postures au travail, déconstruction des mythes grâce aux neurosciences.",
      },
      {
        name: "Formation TMS du membre supérieur",
        description:
          "Formation sur la prévention des 3 TMS les plus fréquents : canal carpien, coiffe des rotateurs, épicondylite.",
      },
      {
        name: "Formation Neurosciences de la douleur",
        description:
          "Formation sur les mécanismes neurophysiologiques de la douleur et le modèle biopsychosocial.",
      },
    ].map((course) => ({
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.description,
      provider: {
        "@type": "Organization",
        name: "Predict Analyse",
      },
      inLanguage: "fr",
    })),
    // 7. HowTo (methodology)
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Comment mettre en place une prévention santé avec Predict Analyse",
      description:
        "Méthodologie en 4 étapes pour déployer une stratégie de prévention santé au travail avec l'IA.",
      step: [
        {
          "@type": "HowToStep",
          name: "Diagnostic",
          text: "Questionnaire multidimensionnel couvrant 5 thématiques de santé, validé par 7 professionnels de santé.",
        },
        {
          "@type": "HowToStep",
          name: "Analyse IA",
          text: "Algorithmes de machine learning qui croisent les données pour détecter les signaux faibles et prédire les tendances.",
        },
        {
          "@type": "HowToStep",
          name: "Plan d'action",
          text: "Parcours personnalisé pour chaque collaborateur avec contenus vidéo, exercices et recommandations adaptées.",
        },
        {
          "@type": "HowToStep",
          name: "Suivi continu",
          text: "Mesure de l'impact, ajustement automatique des recommandations et tableaux de bord en temps réel.",
        },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
