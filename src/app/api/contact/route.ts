export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, employees, message, formType, utmData, leadScore } = body;

    if (!firstName || !lastName || !email || !company || !formType) {
      return NextResponse.json(
        { error: "Champs requis : firstName, lastName, email, company, formType" },
        { status: 400 }
      );
    }

    if (!["DEMO_REQUEST", "GUIDE_DOWNLOAD"].includes(formType)) {
      return NextResponse.json({ error: "formType invalide" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        company,
        phone: phone || undefined,
        employees: employees || undefined,
        message: message || undefined,
        formType,
        utmData: utmData ? JSON.parse(JSON.stringify(utmData)) : undefined,
        leadScore: leadScore ? Number(leadScore) : undefined,
      },
    });

    return NextResponse.json({ ok: true, id: contact.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
