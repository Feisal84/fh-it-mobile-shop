import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { isAdminRequest } from "../../../../lib/admin-auth";
import { getStripe } from "../../../../lib/stripe";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const sessions = await getStripe().checkout.sessions.list({
      limit: 50,
      expand: ["data.line_items", "data.payment_intent.latest_charge"],
    });

    const orders = sessions.data
      .filter((session) => session.status === "complete")
      .map((session) => {
        const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;
        const charge = paymentIntent?.latest_charge as Stripe.Charge | null | undefined;

        return {
          id: session.id,
          created: session.created,
          total: (session.amount_total ?? 0) / 100,
          currency: session.currency,
          email: session.customer_details?.email ?? null,
          name: session.customer_details?.name ?? null,
          shipping: session.collected_information?.shipping_details?.address ?? null,
          paymentStatus: session.payment_status,
          cancelled: Boolean(charge?.refunded),
          items: (session.line_items?.data ?? []).map((item) => ({
            name: item.description,
            quantity: item.quantity,
            amount: (item.amount_total ?? 0) / 100,
          })),
        };
      });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin orders error:", error);
    return NextResponse.json({ error: "Bestellungen konnten nicht geladen werden." }, { status: 500 });
  }
}
