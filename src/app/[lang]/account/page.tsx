"use client";

import { useAuth } from "../../../context/AuthContext";
import { useI18n } from "../../../context/I18nContext";
import LocaleLink from "../../../components/i18n/LocaleLink";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const { dict } = useI18n();

  if (loading) {
    return (
      <div className="container-shop py-16">
        <p className="text-gray-500">{dict.common.loading}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-shop py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {dict.account.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black">{dict.account.title}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {dict.account.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <LocaleLink
              href="/account/login"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              {dict.account.login}
            </LocaleLink>
            <LocaleLink
              href="/account/register"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
            >
              {dict.account.register}
            </LocaleLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {dict.account.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-black">{dict.account.title}</h1>
        <p className="mt-6 text-lg text-gray-600">
          {dict.account.loggedInAs}{" "}
          <span className="font-semibold text-slate-900">{user.email}</span>
        </p>

        <button
          type="button"
          onClick={() => signOut()}
          className="mt-8 rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
        >
          {dict.account.logout}
        </button>
      </div>
    </div>
  );
}