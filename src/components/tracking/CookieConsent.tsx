"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }

    // Set default consent mode to denied
    if (window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted flex-1">
          Nous utilisons des cookies analytiques pour comprendre comment vous utilisez notre site et
          am&eacute;liorer votre exp&eacute;rience. Vos donn&eacute;es sont trait&eacute;es conform&eacute;ment au RGPD.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-5 py-2.5 text-sm font-medium text-muted bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-light transition-colors shadow-lg shadow-primary/25"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
