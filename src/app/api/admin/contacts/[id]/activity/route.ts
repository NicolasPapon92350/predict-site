export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/middleware";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) {
    return NextResponse.json({ error: "Contact introuvable" }, { status: 404 });
  }

  if (!contact.sessionId) {
    return NextResponse.json({ contact, timeline: [] });
  }

  const [events, pageViews] = await Promise.all([
    prisma.event.findMany({
      where: { sessionId: contact.sessionId },
      orderBy: { createdAt: "asc" },
    }),
    prisma.pageView.findMany({
      where: { sessionId: contact.sessionId },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const timeline = [
    ...events.map((e) => ({
      id: e.id,
      type: e.eventName as string,
      timestamp: e.createdAt,
      details: e.properties as Record<string, unknown> | null,
      url: e.url,
    })),
    ...pageViews.map((pv) => ({
      id: pv.id,
      type: "page_view" as const,
      timestamp: pv.createdAt,
      details: { path: pv.path },
      url: pv.path,
    })),
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return NextResponse.json({ contact, timeline });
}
