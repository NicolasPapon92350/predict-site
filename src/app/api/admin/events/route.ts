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

  const [sectionViews, ctaClicks, eventsByType] = await Promise.all([
    prisma.$queryRawUnsafe<{ section: string; count: bigint }[]>(
      `SELECT properties->>'section_id' as section, COUNT(*)::bigint as count FROM "Event" WHERE "eventName" = 'section_view' AND "createdAt" >= $1 GROUP BY properties->>'section_id' ORDER BY count DESC`,
      since
    ),
    prisma.$queryRawUnsafe<{ cta: string; count: bigint }[]>(
      `SELECT properties->>'cta_name' as cta, COUNT(*)::bigint as count FROM "Event" WHERE "eventName" = 'cta_click' AND "createdAt" >= $1 GROUP BY properties->>'cta_name' ORDER BY count DESC`,
      since
    ),
    prisma.$queryRawUnsafe<{ name: string; count: bigint }[]>(
      `SELECT "eventName" as name, COUNT(*)::bigint as count FROM "Event" WHERE "createdAt" >= $1 GROUP BY "eventName" ORDER BY count DESC`,
      since
    ),
  ]);

  return NextResponse.json({
    sectionViews: (sectionViews as { section: string; count: bigint }[]).map((s) => ({ section: s.section, count: Number(s.count) })),
    ctaClicks: (ctaClicks as { cta: string; count: bigint }[]).map((c) => ({ cta: c.cta, count: Number(c.count) })),
    eventsByType: (eventsByType as { name: string; count: bigint }[]).map((e) => ({ name: e.name, count: Number(e.count) })),
  });
}
