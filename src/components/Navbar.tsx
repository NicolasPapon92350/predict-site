"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useTracking } from "@/components/tracking/TrackingProvider";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#predicta", label: "Predicta" },
  { href: "#produits", label: "Produits" },
  { href: "#formations", label: "Formations" },
  { href: "#blog", label: "Blog" },
  { href: "#ressources", label: "Ressources" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { recordSignal } = useTracking();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <Logo size={38} />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-foreground tracking-tight">
                Predict
              </span>
              <span className="text-[10px] font-medium text-primary tracking-widest uppercase">
                Analyse
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#demo"
              onClick={() => recordSignal("cta_click", "navbar_demo")}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
            >
              Demander une démo
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => { setMobileOpen(false); recordSignal("cta_click", "navbar_mobile_demo"); }}
              className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all mt-4"
            >
              Demander une démo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
