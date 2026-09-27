import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Widerruf | FH IT & Mobile Handel" },
  description: "Widerrufsbelehrung von FH IT & Mobile Handel.",
};

export default function WiderrufPage() {
  return (
    <div className="container-shop py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Rechtliches
        </p>

        <h1 className="mt-3 text-4xl font-black">Widerrufsbelehrung</h1>

        <div className="mt-8 space-y-6 leading-7 text-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Widerrufsrecht</h2>
            <p className="mt-3">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
              Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist
              beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von
              Ihnen benannter Dritter, der nicht der Beförderer ist, die
              Waren in Besitz genommen haben bzw. hat.
            </p>
            <p className="mt-3">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
              <br />
              FH IT &amp; Mobile Handel, Feisal Ibrahim Hussein
              <br />
              Siebenbürger Str. 21, 33609 Bielefeld, Deutschland
              <br />
              Telefon: +49 1573 0222293, E-Mail: info@fhhandle.de
              <br />
              mittels einer eindeutigen Erklärung (z. B. per Post versandter
              Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu
              widerrufen, informieren.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Folgen des Widerrufs
            </h2>
            <p className="mt-3">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
              Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und
              spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an
              dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
              eingegangen ist. Wir können die Rückzahlung verweigern, bis wir
              die Waren wieder zurückerhalten haben oder bis Sie den Nachweis
              erbracht haben, dass Sie die Waren zurückgesandt haben, je
              nachdem, welches der frühere Zeitpunkt ist.
            </p>
            <p className="mt-3">
              Sie haben die Waren unverzüglich und in jedem Fall spätestens
              binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den
              Widerruf dieses Vertrags unterrichten, an uns zurückzusenden.
              Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist
              von vierzehn Tagen absenden. Sie tragen die unmittelbaren
              Kosten der Rücksendung der Waren.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Ausschluss des Widerrufsrechts
            </h2>
            <p className="mt-3">
              Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung
              von Waren, die nicht vorgefertigt sind und für deren
              Herstellung eine individuelle Auswahl oder Bestimmung durch den
              Verbraucher maßgeblich ist, sowie bei versiegelter Ware, die
              aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur
              Rückgabe geeignet ist, wenn ihre Versiegelung nach der
              Lieferung entfernt wurde.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
