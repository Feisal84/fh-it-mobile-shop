"use client";

import Link from "next/link";

import { useAuth } from "../../context/AuthContext";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="container-shop py-16">
        <p className="text-gray-500">Lädt...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-shop py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Kundenkonto
          </p>
          <h1 className="mt-3 text-4xl font-black">Mein Konto</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Melden Sie sich an oder erstellen Sie ein Konto, um Ihre
            Bestellungen zu verwalten.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/account/login"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Anmelden
            </Link>
            <Link
              href="/account/register"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
            >
              Registrieren
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Kundenkonto
        </p>
        <h1 className="mt-3 text-4xl font-black">Mein Konto</h1>
        <p className="mt-6 text-lg text-gray-600">
          Angemeldet als{" "}
          <span className="font-semibold text-slate-900">{user.email}</span>
        </p>

        <button
          type="button"
          onClick={() => signOut()}
          className="mt-8 rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}