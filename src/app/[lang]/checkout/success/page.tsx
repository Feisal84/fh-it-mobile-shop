"use client";

import { CheckCircle2, Package } from "lucide-react";
import { useEffect } from "react";

import { useCart } from "../../../../context/CartContext";
import { useI18n } from "../../../../context/I18nContext";
import LocaleLink from "../../../../components/i18n/LocaleLink";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const { dict } = useI18n();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="container-shop py-20">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50"><CheckCircle2 className="h-10 w-10 text-green-600" /></div>
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-600">{dict.success.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{dict.success.title}</h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">{dict.success.text}</p>
          <div className="mt-8 flex gap-4 rounded-lg bg-slate-50 p-5 text-start"><Package className="h-6 w-6 shrink-0 text-blue-600" /><div><p className="font-bold text-slate-900">{dict.success.nextTitle}</p><p className="mt-2 text-sm leading-6 text-slate-500">{dict.success.nextText}</p></div></div>
          <LocaleLink href="/shop" className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3.5 font-bold text-white hover:bg-blue-700">{dict.success.continueShopping}</LocaleLink>
        </div>
      </div>
    </main>
  );
}