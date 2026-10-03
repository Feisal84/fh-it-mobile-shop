import { getDictionary } from "../../../i18n/get-dictionary";

export default async function AboutPage() {
  const dict = await getDictionary();
  const t = dict.pages.about;

  return (
    <div className="container-shop py-16">

      <div className="max-w-3xl">

        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {t.eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-black">
          FH IT & Mobile Handel
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          {t.p1}
        </p>

        <p className="mt-5 leading-7 text-gray-600">
          {t.p2}
        </p>

      </div>

    </div>
  );
}