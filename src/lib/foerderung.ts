/**
 * Förderung des Altersvorsorgedepots nach dem Altersvorsorgereformgesetz (Start 01.01.2027),
 * gleiche Regeln wie auf justavd.de:
 * - Grundzulage: 50 % auf die ersten 360 € Eigenbeitrag, 25 % auf bis zu 1.440 € mehr, höchstens 540 € im Jahr
 * - Kinderzulage: 1 € je eingezahltem Euro, höchstens 300 € je Kind und Jahr
 * - Startbonus: 200 € einmalig bei Vertragsbeginn vor dem 25. Geburtstag
 * - Steuervorteil (Günstigerprüfung): Eigenbeitrag bis 1.800 € plus Zulagen als Sonderausgaben; erstattet wird,
 *   was die Steuerersparnis über die Zulagen hinaus bringt. Grenzsteuersatz grob geschätzt.
 */

export const REGELN = { stufe1: 360, foerdergrenze: 1800, grundzulageMax: 540, kinderzulage: 300, startbonus: 200 } as const;

export type Foerderung = {
  eigenbeitrag: number;
  grundzulage: number;
  kinderzulage: number;
  startbonus: number;
  steuer: number;
  gesamt: number;
  /** Förderung je eingezahltem Euro (ohne Startbonus) */
  quote: number;
};

export function grundzulage(eigenbeitragJahr: number) {
  const eigen = Math.max(0, eigenbeitragJahr);
  return Math.min(
    Math.min(eigen, REGELN.stufe1) * 0.5 + Math.min(Math.max(eigen - REGELN.stufe1, 0), REGELN.foerdergrenze - REGELN.stufe1) * 0.25,
    REGELN.grundzulageMax,
  );
}

export function foerderung(sparrateMonat: number, kinder: number, unter25: boolean, grenzsteuersatz: number): Foerderung {
  const eigen = Math.max(0, sparrateMonat) * 12;
  const g = grundzulage(eigen);
  const k = Math.max(0, kinder) * Math.min(eigen, REGELN.kinderzulage);
  const zulagen = g + k;
  const ersparnis = ((Math.min(eigen, REGELN.foerdergrenze) + zulagen) * Math.max(0, grenzsteuersatz)) / 100;
  const steuer = Math.max(0, ersparnis - zulagen);
  const laufend = zulagen + steuer;
  const bonus = unter25 ? REGELN.startbonus : 0;
  return { eigenbeitrag: eigen, grundzulage: g, kinderzulage: k, startbonus: bonus, steuer, gesamt: laufend + bonus, quote: eigen > 0 ? laufend / eigen : 0 };
}

export const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const prozent = (n: number) => Math.round(n * 100) + " %";
