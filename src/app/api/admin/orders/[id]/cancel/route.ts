import { NextResponse } from "next/server";

import { isAdminRequest } from "../../../../../../lib/admin-auth";
import { getStripe } from "../../../../../../lib/stripe";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(id);

    if (session.status === "open") {
      await stripe.checkout.sessions.expire(id);
    } else if (session.payment_status === "paid" && typeof session.payment_intent === "string") {
      await stripe.refunds.create({ payment_intent: session.payment_intent });
    } else if (session.status !== "expired") {
      return NextResponse.json({ error: "Bestellung kann nicht storniert werden." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin cancel error:", error);
    return NextResponse.json({ error: "Stornierung fehlgeschlagen (evtl. bereits erstattet)." }, { status: 500 });
  }
}
