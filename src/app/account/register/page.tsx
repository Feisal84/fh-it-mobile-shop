"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "../../../context/AuthContext";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { error, needsConfirmation } = await signUp(email, password);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    if (needsConfirmation) {
      setSuccessMessage(
        "Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen zugeschickt haben."
      );
      return;
    }

    router.push("/account");
  }

  return (
    <div className="container-shop py-16">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Kundenkonto
        </p>

        <h1 className="mt-3 text-4xl font-black">Registrieren</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-Mail-Adresse"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Passwort (mind. 6 Zeichen)"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
          {successMessage && (
            <p className="text-sm text-green-600">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Registrieren..." : "Konto erstellen"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Bereits registriert?{" "}
          <Link
            href="/account/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Jetzt anmelden
          </Link>
        </p>
      </div>
    </div>
  );
}
