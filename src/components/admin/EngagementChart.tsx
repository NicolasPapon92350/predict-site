"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EngagementChartProps {
  title: string;
  data: { name: string; count: number }[];
  color?: string;
}

export default function EngagementChart({ title, data, color = "#022282" }: EngagementChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      {data.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94A3B8" allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill={color} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-muted py-8 text-center">Aucune donnée disponible.</p>
      )}
    </div>
  );
}
