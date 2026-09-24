"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";

const SHIPPING_COST = 4.99;
const FREE_SHIPPING_LIMIT = 100;

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const shipping = totalPrice === 0 || totalPrice >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  const total = totalPrice + shipping;

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setError("Dein Warenkorb ist leer.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })) }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout konnte nicht gestartet werden.");
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Ein Fehler ist aufgetreten.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return <main className="min-h-[60vh] bg-slate-50"><div className="container-shop py-20 text-center"><h1 className="text-3xl font-extrabold text-slate-900">Dein Warenkorb ist leer</h1><Link href="/shop" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white"><span>Zum Shop</span><ArrowRight className="h-4 w-4" /></Link></div></main>;
  }

  return (
    <main className="bg-slate-50"><div className="container-shop py-10 sm:py-14">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"><ArrowLeft className="h-4 w-4" />Zurück zum Warenkorb</Link>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">Checkout</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleCheckout} className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Lieferadresse</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {[{ label: "Vorname", name: "firstName" }, { label: "Nachname", name: "lastName" }, { label: "E-Mail-Adresse", name: "email", type: "email", wide: true }, { label: "Straße und Hausnummer", name: "street", wide: true }, { label: "PLZ", name: "postalCode" }, { label: "Ort", name: "city" }].map((field) => <label key={field.name} className={field.wide ? "sm:col-span-2" : ""}><span className="text-sm font-semibold">{field.label}</span><input type={field.type ?? "text"} name={field.name} required className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>)}
          </div>
          <div className="mt-8 flex gap-3 rounded-lg bg-slate-50 p-4"><ShieldCheck className="h-5 w-5 shrink-0 text-green-600" /><div><p className="text-sm font-bold text-slate-900">Sichere Zahlung</p><p className="mt-1 text-xs leading-5 text-slate-500">Deine Zahlungsdaten werden sicher über Stripe verarbeitet.</p></div></div>
          {error && <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">{loading ? "Weiter zu Stripe..." : <><Lock className="h-4 w-4" />Sicher bezahlen</>}</button>
        </form>
        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">Deine Bestellung</h2><div className="mt-6 space-y-4">{items.map((item) => <div key={item.product.id} className="flex justify-between gap-4 text-sm"><div><p className="font-semibold text-slate-800">{item.product.name}</p><p className="mt-1 text-xs text-slate-500">Menge: {item.quantity}</p></div><span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span></div>)}</div><div className="my-6 border-t border-slate-200" /><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-500">Zwischensumme</span><span>{formatPrice(totalPrice)}</span></div><div className="flex justify-between"><span className="text-slate-500">Versand</span><span>{shipping === 0 ? "Kostenlos" : formatPrice(shipping)}</span></div></div><div className="my-6 border-t border-slate-200" /><div className="flex justify-between"><span className="font-bold">Gesamt</span><span className="text-xl font-extrabold">{formatPrice(total)}</span></div><p className="mt-2 text-xs text-slate-400">inkl. MwSt.</p></aside>
      </div>
    </div></main>
  );
}