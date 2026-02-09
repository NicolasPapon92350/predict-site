"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { level, recordSignal } = useTracking();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || dismissed) return null;

  const ctaText =
    level === "hot" || level === "high"
      ? "Planifiez votre d\u00e9mo maintenant"
      : level === "medium"
        ? "D\u00e9couvrez comment r\u00e9duire l\u2019absent\u00e9isme"
        : "Besoin d\u2019aide ?";

  const subtitleText =
    level === "hot" || level === "high"
      ? "D\u00e9mo personnalis\u00e9e en 30 min"
      : "R\u00e9ponse sous 24h";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 max-w-xs">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {ctaText}
            </p>
            <p className="text-xs text-muted">{subtitleText}</p>
          </div>
        </div>

        <a
          href="#demo"
          onClick={() => recordSignal("cta_click", "floating_cta")}
          className="group flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-light transition-all"
        >
          Demander une d&eacute;mo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
