"use client";

import { useState, useRef } from "react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { score, recordSignal } = useTracking();
  const formStartedRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    let utmData: Record<string, string> | undefined;
    try {
      const raw = localStorage.getItem("utm_data");
      if (raw) utmData = JSON.parse(raw);
    } catch {}

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company"),
          employees: data.get("employees") || undefined,
          message: data.get("message") || undefined,
          formType: "DEMO_REQUEST",
          utmData,
          leadScore: score,
        }),
      });
    } catch {}

    setSubmitted(true);
    setSubmitting(false);
    recordSignal("form_completed", "demo_request");
  };

  return (
    <section
      id="demo"
      className="py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Copy */}
          <div className="text-white">
            <p className="text-blue-200 font-semibold text-sm uppercase tracking-wider mb-3">
              Passez à l&apos;action
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Demandez votre{" "}
              <span className="text-secondary">démo gratuite</span>
            </h2>
            <p className="mt-4 text-lg text-blue-100 leading-relaxed">
              Découvrez comment Predict Analyse peut transformer la santé au
              travail dans votre entreprise. Démo personnalisée en 30 minutes.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              {[
                "Diagnostic gratuit de votre situation",
                "Démo personnalisée de la plateforme Predicta",
                "Estimation du ROI pour votre entreprise",
                "Sans engagement, 100% confidentiel",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-blue-50">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <Phone className="w-5 h-5" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Mail className="w-5 h-5" />
                <span>contact@predictanalyse.com</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin className="w-5 h-5" />
                <span>Paris, France</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-muted">
                  Notre équipe vous contactera sous 24h pour planifier votre
                  démo.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Planifiez votre démo
                </h3>
                <form
                  onFocus={() => {
                    if (!formStartedRef.current) {
                      formStartedRef.current = true;
                      recordSignal("form_started", "demo_request");
                    }
                  }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      placeholder="jean@entreprise.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Entreprise *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nombre de collaborateurs
                    </label>
                    <select
                      name="employees"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-muted"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="1-50">1 - 50</option>
                      <option value="50-200">50 - 200</option>
                      <option value="200-500">200 - 500</option>
                      <option value="500-1000">500 - 1 000</option>
                      <option value="1000+">1 000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                      placeholder="Décrivez brièvement vos enjeux de prévention..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-light transition-all shadow-lg shadow-accent/25 text-base disabled:opacity-50"
                  >
                    {submitting ? "Envoi en cours..." : "Demander ma démo gratuite"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-muted text-center mt-3">
                    Vos données sont protégées et ne seront jamais partagées.
                    Conforme RGPD.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
