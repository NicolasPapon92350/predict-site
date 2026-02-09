export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/middleware";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get("days") || "30", 10);
  const since = new Date();
  since.setDate(since.getDate() - days);

  const [
    totalPageViews,
    uniqueVisitors,
    totalContacts,
    demoRequests,
    guideDownloads,
    dailyVisits,
    dailyContacts,
    recentContacts,
  ] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: since } } }),
    prisma.pageView
      .findMany({
        where: { createdAt: { gte: since } },
        distinct: ["sessionId"],
        select: { sessionId: true },
      })
      .then((r: { sessionId: string }[]) => r.length),
    prisma.contact.count({ where: { createdAt: { gte: since } } }),
    prisma.contact.count({ where: { createdAt: { gte: since }, formType: "DEMO_REQUEST" } }),
    prisma.contact.count({ where: { createdAt: { gte: since }, formType: "GUIDE_DOWNLOAD" } }),
    prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
      `SELECT DATE("createdAt") as date, COUNT(*)::bigint as count FROM "PageView" WHERE "createdAt" >= $1 GROUP BY DATE("createdAt") ORDER BY date`,
      since
    ),
    prisma.$queryRawUnsafe<{ date: string; count: bigint }[]>(
      `SELECT DATE("createdAt") as date, COUNT(*)::bigint as count FROM "Contact" WHERE "createdAt" >= $1 GROUP BY DATE("createdAt") ORDER BY date`,
      since
    ),
    prisma.contact.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return NextResponse.json({
    totalPageViews,
    uniqueVisitors,
    totalContacts,
    demoRequests,
    guideDownloads,
    dailyVisits: (dailyVisits as { date: string; count: bigint }[]).map((d) => ({ date: d.date, count: Number(d.count) })),
    dailyContacts: (dailyContacts as { date: string; count: bigint }[]).map((d) => ({ date: d.date, count: Number(d.count) })),
    recentContacts,
  });
}
