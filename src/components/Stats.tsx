"use client";

import { Users, TrendingDown, Award, Building2 } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "200+",
    label: "Entreprises accompagnées",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    value: "50 000+",
    label: "Collaborateurs analysés",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingDown,
    value: "-34%",
    label: "D'absentéisme en moyenne",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Award,
    value: "92%",
    label: "Taux de satisfaction",
    color: "text-accent",
    bg: "bg-orange-50",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="relative -mt-8 z-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-6 py-8 text-center group hover:bg-surface transition-colors first:rounded-l-2xl last:rounded-r-2xl"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <p className={`text-3xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
