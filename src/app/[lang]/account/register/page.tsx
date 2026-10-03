"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "../../../../context/AuthContext";
import { useI18n } from "../../../../context/I18nContext";
import LocaleLink from "../../../../components/i18n/LocaleLink";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const { locale, dict } = useI18n();

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
      setSuccessMessage(dict.account.confirmEmail);
      return;
    }

    router.push(`/${locale}/account`);
  }

  return (
    <div className="container-shop py-16">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {dict.account.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-black">{dict.account.registerTitle}</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={dict.account.emailPlaceholder}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={dict.account.passwordHint}
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
            {loading ? dict.account.registering : dict.account.createAccount}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          {dict.account.alreadyRegistered}{" "}
          <LocaleLink
            href="/account/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {dict.account.loginNow}
          </LocaleLink>
        </p>
      </div>
    </div>
  );
}
