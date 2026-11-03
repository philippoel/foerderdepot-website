import FoerderRechner from "@/components/FoerderRechner";
import { euro, grundzulage, REGELN } from "@/lib/foerderung";
import { JUSTAVD, STAND } from "@/lib/seite";

const STAFFEL = [10, 30, 50, 75, 100, 125, 150].map((rate) => {
  const eigen = rate * 12;
  const g = grundzulage(eigen);
  return { rate, eigen, g, quote: g / eigen };
});

const TIPPS = [
  {
    titel: "150 € im Monat für die volle Grundzulage",
    text: "Erst bei 1.800 € Eigenbeitrag im Jahr gibt es die vollen 540 €. Für Beiträge darüber hinaus gibt es keine weitere Zulage.",
  },
  {
    titel: "Schon 25 € im Monat reichen für die volle Kinderzulage",
    text: "Die Kinderzulage beträgt 1 € je eingezahltem Euro, bis 300 € je Kind. Ab 300 € Eigenbeitrag im Jahr bekommen Sie sie für jedes Kind in voller Höhe.",
  },
  {
    titel: "Vor dem 25. Geburtstag starten",
    text: "Wer jung anfängt, bekommt einmalig 200 € Startbonus und hat die meiste Zeit, in der Zulagen und Erträge wachsen.",
  },
  {
    titel: "Beiträge in der Steuererklärung angeben",
    text: "Nur dann prüft das Finanzamt, ob Ihnen über die Zulagen hinaus eine Steuererstattung zusteht. Bei mittleren und höheren Einkommen ist das oft ein spürbarer Betrag.",
  },
];

const FRAGEN = [
  {
    frage: "Ab wann gibt es die Förderung?",
    antwort: "Ab dem 1. Januar 2027. Dann starten das Altersvorsorgedepot und die neuen Zulagen nach dem Altersvorsorgereformgesetz.",
  },
  {
    frage: "Wer bekommt die Zulagen?",
    antwort:
      "Gefördert werden alle, die bisher Riester-Zulagen bekommen konnten, zum Beispiel Angestellte und Beamte. Neu sind auch Selbstständige förderberechtigt. Ob Sie im Einzelfall dazugehören, klärt der Anbieter beim Abschluss.",
  },
  {
    frage: "Muss ich die Förderung zurückzahlen?",
    antwort:
      "Nicht, solange das Geld für die Rente genutzt wird. Wer vor der Auszahlung kündigt, muss Zulagen und Steuervorteile zurückzahlen. Eine Ausnahme gibt es für die eigene Immobilie.",
  },
  {
    frage: "Wird die Auszahlung im Alter versteuert?",
    antwort:
      "Ja. Während der Sparphase bleiben Beiträge, Zulagen und Erträge steuerfrei, im Alter werden die Auszahlungen mit dem persönlichen Steuersatz versteuert. Der ist im Ruhestand oft niedriger als im Berufsleben.",
  },
  {
    frage: "Bekomme ich die Kinderzulage für jedes Kind?",
    antwort: "Für jedes Kind, für das Sie Kindergeld bekommen, bis zu 300 € im Jahr. Sie endet, wenn der Kindergeldanspruch endet.",
  },
];

export default function Startseite() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FRAGEN.map((f) => ({ "@type": "Question", name: f.frage, acceptedAnswer: { "@type": "Answer", text: f.antwort } })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24">
        <p className="mx-auto inline-flex rounded-full bg-gold-hell px-4 py-1.5 text-sm font-medium text-gold-dunkel">
          Altersvorsorgedepot ab 1. Januar 2027
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl">
          Wie viel <span className="text-akzent">Förderung</span> bekommen Sie?
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg">
          Bis zu 540 € Grundzulage im Jahr, bis zu 300 € für jedes Kind, 200 € Startbonus und eine mögliche Steuererstattung. Rechnen
          Sie aus, was der Staat Ihnen für Ihr Altersvorsorgedepot dazugibt.
        </p>
      </section>

      <section id="rechner" className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <FoerderRechner />
      </section>

      <section id="bausteine" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">Die vier Bausteine der Förderung</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-7 md:row-span-2">
            <p className="text-sm font-medium text-akzent">Für alle</p>
            <h3 className="mt-1 text-2xl font-semibold">Grundzulage</h3>
            <p className="mt-3">
              Auf die ersten 360 € im Jahr gibt es 50 Cent je Euro, auf alles darüber bis 1.800 € noch 25 Cent. Kleine Beiträge werden
              damit besonders stark gefördert.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-linie">
              <table className="w-full text-sm">
                <thead className="bg-flaeche text-left text-tinte">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-medium">Beitrag im Monat</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-medium">Zulage im Jahr</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-medium">Quote</th>
                  </tr>
                </thead>
                <tbody>
                  {STAFFEL.map((s) => (
                    <tr key={s.rate} className="border-t border-linie">
                      <td className="px-4 py-2">{euro.format(s.rate)}</td>
                      <td className="px-4 py-2 text-right font-medium text-tinte">{euro.format(s.g)}</td>
                      <td className="px-4 py-2 text-right">
                        <span className="inline-flex min-w-12 justify-center rounded-full bg-gold-hell px-2 text-gold-dunkel">{Math.round(s.quote * 100)} %</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          <article className="rounded-2xl bg-gold-hell p-7">
            <p className="text-sm font-medium text-gold-dunkel">Für Eltern</p>
            <h3 className="mt-1 text-2xl font-semibold">Kinderzulage</h3>
            <p className="mt-3">
              Bis zu {euro.format(REGELN.kinderzulage)} je Kind und Jahr, solange Sie Kindergeld bekommen. Bei zwei Kindern und 150 € im Monat
              kommen so bis zu 1.140 € Zulagen im Jahr zusammen.
            </p>
          </article>
          <article className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-medium text-akzent">Unter 25</p>
              <h3 className="mt-1 text-xl font-semibold">Startbonus</h3>
              <p className="mt-3">Einmalig {euro.format(REGELN.startbonus)}, wenn der Vertrag vor dem 25. Geburtstag beginnt.</p>
            </div>
            <div className="rounded-2xl bg-white p-7">
              <p className="text-sm font-medium text-akzent">Über das Finanzamt</p>
              <h3 className="mt-1 text-xl font-semibold">Steuervorteil</h3>
              <p className="mt-3">Beiträge bis 1.800 € plus Zulagen sind Sonderausgaben. Bringt das mehr als die Zulagen, gibt es den Rest zurück.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="tipps" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">So holen Sie die volle Förderung heraus</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2">
          {TIPPS.map((t, i) => (
            <li key={t.titel} className="flex gap-5 rounded-2xl bg-white p-6">
              <span className="zahl flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-akzent font-semibold text-white">{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{t.titel}</h3>
                <p className="mt-1.5">{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="fragen" className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-semibold sm:text-4xl">Fragen zur Förderung</h2>
        <div className="mt-8 space-y-3">
          {FRAGEN.map((f) => (
            <details key={f.frage} className="group rounded-2xl bg-white px-6 py-4 open:bg-flaeche">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-tinte">
                {f.frage}
                <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-flaeche text-akzent group-open:bg-white">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mt-3">{f.antwort}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-gold p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold">Keine Förderung verschenken</h2>
          <p className="mx-auto mt-3 max-w-2xl text-tinte">
            Philipp Oelmann aus Hannover prüft mit Ihnen, welche Zulagen Ihnen zustehen, wie viel Steuer Sie zurückbekommen und welcher
            Beitrag für Sie passt. Das Erstgespräch ist kostenlos.
          </p>
          <a href={`${JUSTAVD}/foerder-check/`} className="mt-6 inline-flex rounded-full bg-tinte px-7 py-3 font-medium text-white hover:bg-akzent-dunkel">
            Zum Förder-Check auf justavd.de
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-leise">
          Stand: {STAND}. Grundlage ist das Altersvorsorgereformgesetz (Bundestag 27.03.2026, Bundesrat 08.05.2026). Einzelheiten können
          sich durch Vorgaben der Verwaltung noch ändern. Allgemeine Information, keine Beratung.
        </p>
      </section>
    </main>
  );
}
