"use client";

import {
  ArrowRight,
  Shield,
  TrendingDown,
  Brain,
} from "lucide-react";
import { useTracking } from "@/components/tracking/TrackingProvider";

export default function Hero() {
  const { recordSignal } = useTracking();
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse-slow" />
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-accent/30 rounded-full animate-pulse-slow animation-delay-400" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Plateforme IA de prévention santé
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              Mieux comprendre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                l&apos;humain
              </span>{" "}
              pour la santé de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-dark">
                demain
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-xl">
              Predict Analyse diagnostique les risques de <strong>TMS</strong> et{" "}
              <strong>RPS</strong>, prédit l&apos;absentéisme et fournit des solutions
              personnalisées pour la santé de vos collaborateurs.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                onClick={() => recordSignal("cta_click", "hero_demo")}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-accent rounded-full hover:bg-accent-light transition-all shadow-xl shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                Demander une démo gratuite
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#predicta"
                onClick={() => recordSignal("cta_click", "hero_predicta")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary bg-white border-2 border-primary/20 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                Découvrir Predicta
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/30 border-2 border-white flex items-center justify-center text-xs font-bold text-primary"
                    >
                      {["A", "B", "C", "D"][i - 1]}
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">+200</strong> entreprises
                </span>
              </div>
              <div className="hidden sm:block h-8 w-px bg-gray-200" />
              <div className="hidden sm:block">
                Confiance de <strong className="text-foreground">leaders santé</strong>
              </div>
            </div>
          </div>

          {/* Right Visual - Dashboard Preview */}
          <div className="animate-fade-in-up animation-delay-400 relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 lg:p-8">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Tableau de bord Predicta
                    </p>
                    <p className="text-xs text-muted">Analyse en temps réel</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  En ligne
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-surface rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">-34%</p>
                  <p className="text-xs text-muted mt-1">Absentéisme</p>
                </div>
                <div className="bg-surface rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-accent">+67%</p>
                  <p className="text-xs text-muted mt-1">Bien-être</p>
                </div>
                <div className="bg-surface rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary-light">92%</p>
                  <p className="text-xs text-muted mt-1">Satisfaction</p>
                </div>
              </div>

              {/* Mock Chart */}
              <div className="bg-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">
                    Évolution des risques TMS
                  </p>
                  <TrendingDown className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[70, 65, 55, 48, 42, 38, 35, 30, 28, 25, 22, 20].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all"
                        style={{
                          height: `${h}%`,
                          backgroundColor:
                            i >= 8
                              ? "var(--primary-light)"
                              : i >= 4
                                ? "var(--primary)"
                                : "var(--primary-dark)",
                          opacity: 0.6 + i * 0.03,
                        }}
                      />
                    )
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-muted">Jan</span>
                  <span className="text-[10px] text-muted">Déc</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 animate-fade-in animation-delay-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    ROI moyen
                  </p>
                  <p className="text-sm font-bold text-green-600">x4.2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
