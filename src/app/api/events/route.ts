export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface IncomingEvent {
  sessionId: string;
  eventName: string;
  properties?: Record<string, unknown>;
  url?: string;
  referrer?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const events: IncomingEvent[] = Array.isArray(body) ? body : [body];

    if (events.length > 50) {
      return NextResponse.json({ error: "Max 50 events per batch" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = request.headers.get("user-agent") || undefined;

    const pageViews = events.filter((e) => e.eventName === "page_view");
    const otherEvents = events.filter((e) => e.eventName !== "page_view");

    if (pageViews.length > 0) {
      await prisma.pageView.createMany({
        data: pageViews.map((e) => ({
          sessionId: e.sessionId,
          path: e.url || "/",
          referrer: e.referrer,
          userAgent,
          ip,
        })),
      });
    }

    if (otherEvents.length > 0) {
      await prisma.event.createMany({
        data: otherEvents.map((e) => ({
          sessionId: e.sessionId,
          eventName: e.eventName,
          properties: e.properties ? JSON.parse(JSON.stringify(e.properties)) : undefined,
          url: e.url,
          referrer: e.referrer,
          userAgent,
          ip,
        })),
      });
    }

    return NextResponse.json({ ok: true, count: events.length });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
