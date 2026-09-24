import { NextResponse } from "next/server";

import { products } from "../../../data/products";
import { getStripe } from "../../../lib/stripe";

const SHIPPING_COST = 4.99;
const FREE_SHIPPING_LIMIT = 100;

type CheckoutItem = {
  productId?: unknown;
  quantity?: unknown;
};

export async function POST(request: Request) {
  try {
    const body: { items?: CheckoutItem[] } = await request.json();

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Der Warenkorb ist leer." }, { status: 400 });
    }

    const lineItems = body.items.map((item) => {
      const quantity = item.quantity;

      if (typeof item.productId !== "string" || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Ungültiges Produkt im Warenkorb.");
      }

      const product = products.find((entry) => entry.id === item.productId);

      if (!product || quantity > product.stock) {
        throw new Error("Ein Produkt ist nicht mehr in der gewünschten Menge verfügbar.");
      }

      return {
        price_data: {
          currency: "eur",
          product_data: { name: product.name, description: product.category },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      };
    });

    const subtotal = lineItems.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0) / 100;

    if (subtotal < FREE_SHIPPING_LIMIT) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Versand", description: "Standardversand innerhalb Deutschlands" },
          unit_amount: Math.round(SHIPPING_COST * 100),
        },
        quantity: 1,
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      customer_creation: "always",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["DE"] },
      locale: "de",
      payment_method_types: ["card"],
      metadata: { shop: "FH IT & Mobile Handel" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Fehler:", error);
    return NextResponse.json({ error: "Die Zahlung konnte nicht gestartet werden." }, { status: 500 });
  }
}