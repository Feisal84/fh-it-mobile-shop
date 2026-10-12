
import { NextResponse } from "next/server";

import { getProductsByIds } from "../../../lib/products";
import { getStripe } from "../../../lib/stripe";

export const runtime = "nodejs";

const SHIPPING_COST_CENTS = 499;
const FREE_SHIPPING_LIMIT_CENTS = 10_000;
const MAX_QUANTITY_PER_PRODUCT = 99;

type CheckoutItem = {
  productId?: unknown;
  quantity?: unknown;
};

class CheckoutError extends Error {
  constructor(
    message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

export async function POST(request: Request) {
  try {
    const body: { items?: CheckoutItem[] } =
      await request.json();

    if (!Array.isArray(body.items) || body.items.length === 0) {
      throw new CheckoutError("Dein Warenkorb ist leer.");
    }

    if (body.items.length > 100) {
      throw new CheckoutError(
        "Zu viele Positionen im Warenkorb."
      );
    }

    // 1. Eingaben prüfen und doppelte Produkte zusammenfassen.
    const quantities = new Map<string, number>();

    for (const item of body.items) {
      if (
        typeof item.productId !== "string" ||
        item.productId.length === 0 ||
        item.productId.length > 100 ||
        typeof item.quantity !== "number" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > MAX_QUANTITY_PER_PRODUCT
      ) {
        throw new CheckoutError(
          "Eine Warenkorbposition ist ungültig."
        );
      }

      const newQuantity =
        (quantities.get(item.productId) ?? 0) +
        item.quantity;

      if (newQuantity > MAX_QUANTITY_PER_PRODUCT) {
        throw new CheckoutError(
          "Die gewünschte Menge eines Produkts ist zu hoch."
        );
      }

      quantities.set(item.productId, newQuantity);
    }

    // 2. Aktuelle Produktdaten aus Supabase laden.
    const productIds = [...quantities.keys()];
    const products = await getProductsByIds(productIds);

    const productsById = new Map(
      products.map((product) => [product.id, product])
    );

    if (products.length !== productIds.length) {
      throw new CheckoutError(
        "Ein Produkt ist nicht verfügbar. Bitte aktualisiere deinen Warenkorb.",
        409
      );
    }

    // 3. Serverseitig Preise und Bestand prüfen.
    const lineItems: Array<{
      price_data: {
        currency: "eur";
        product_data: {
          name: string;
          description?: string;
        };
        unit_amount: number;
      };
      quantity: number;
    }> = [];

    let subtotalCents = 0;

    for (const [productId, quantity] of quantities) {
      const product = productsById.get(productId);

      if (!product) {
        throw new CheckoutError(
          "Ein Produkt ist nicht verfügbar.",
          409
        );
      }

      if (
        !Number.isSafeInteger(product.stock) ||
        product.stock < quantity
      ) {
        throw new CheckoutError(
          `Für "${product.name}" ist die gewünschte Menge nicht verfügbar.`,
          409
        );
      }

      if (
        !Number.isFinite(product.price) ||
        product.price <= 0
      ) {
        throw new CheckoutError(
          `Der Preis für "${product.name}" ist ungültig.`,
          500
        );
      }

      const unitAmount = Math.round(product.price * 100);

      if (
        !Number.isSafeInteger(unitAmount) ||
        unitAmount <= 0
      ) {
        throw new CheckoutError(
          "Ein Produktpreis ist ungültig.",
          500
        );
      }

      subtotalCents += unitAmount * quantity;

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.category,
          },
          unit_amount: unitAmount,
        },
        quantity,
      });
    }

    if (!Number.isSafeInteger(subtotalCents)) {
      throw new CheckoutError(
        "Der Bestellbetrag ist ungültig."
      );
    }

    // 4. Versand berechnen.
    if (subtotalCents < FREE_SHIPPING_LIMIT_CENTS) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Versand",
            description:
              "Standardversand innerhalb Deutschlands",
          },
          unit_amount: SHIPPING_COST_CENTS,
        },
        quantity: 1,
      });
    }

    // 5. Stripe Checkout erstellen.
    const configuredSiteUrl =
      process.env.NEXT_PUBLIC_SITE_URL;

    if (!configuredSiteUrl) {
      throw new CheckoutError(
        "Die Shop-URL ist nicht konfiguriert.",
        500
      );
    }

    const siteUrl = new URL(configuredSiteUrl);

    if (
      siteUrl.protocol !== "https:" &&
      siteUrl.hostname !== "localhost"
    ) {
      throw new CheckoutError(
        "Die Shop-URL muss HTTPS verwenden.",
        500
      );
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      success_url:
        `${siteUrl.origin}/checkout/success` +
        "?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: `${siteUrl.origin}/checkout`,

      customer_creation: "always",
      billing_address_collection: "required",

      shipping_address_collection: {
        allowed_countries: ["DE"],
      },

      locale: "de",
      payment_method_types: ["card"],

      metadata: {
        shop: "FH IT & Mobile Handel",
      },
    });

    if (!session.url) {
      throw new CheckoutError(
        "Stripe hat keine Checkout-URL zurückgegeben.",
        502
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    if (error instanceof CheckoutError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error("Stripe Checkout Fehler:", error);

    return NextResponse.json(
      {
        error:
          "Die Zahlung konnte nicht gestartet werden. Bitte versuche es erneut.",
      },
      { status: 500 }
    );
  }
}
