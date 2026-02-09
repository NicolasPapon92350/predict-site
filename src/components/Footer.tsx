import { Linkedin, Youtube, Mail } from "lucide-react";
import Logo from "./Logo";

const footerLinks = {
  Solutions: [
    { label: "Prévention TMS", href: "#services" },
    { label: "Risques Psychosociaux", href: "#services" },
    { label: "Ergonomie", href: "#services" },
    { label: "Nutrition", href: "#services" },
    { label: "Activité Physique", href: "#services" },
  ],
  Plateforme: [
    { label: "Predicta", href: "#predicta" },
    { label: "Analyse des risques", href: "#produits" },
    { label: "Prédiction des facteurs de santé", href: "#produits" },
    { label: "Accompagnement automatisé", href: "#produits" },
  ],
  Ressources: [
    { label: "Blog", href: "#blog" },
    { label: "Livres blancs", href: "#ressources" },
    { label: "Littérature scientifique", href: "#ressources" },
    { label: "Formations", href: "#formations" },
  ],
  Entreprise: [
    { label: "À propos", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Mentions légales", href: "#" },
    { label: "Certificat Qualiopi", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={38} />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white tracking-tight">
                  Predict
                </span>
                <span className="text-[10px] font-medium text-secondary tracking-widest uppercase">
                  Analyse
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Mieux comprendre l&apos;humain pour la santé de demain. Service de
              prévention santé au travail par l&apos;intelligence artificielle.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@predictanalyse.com"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Predict Analyse. Tous droits
            réservés.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              CGU
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
