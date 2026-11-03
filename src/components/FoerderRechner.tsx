"use client";

import { useState } from "react";
import { euro, foerderung, prozent } from "@/lib/foerderung";

// Grenzsteuersatz grob nach Bruttoeinkommen (Alleinstehende), wie im Förder-Check auf justavd.de
const EINKOMMEN = [
  { label: "bis 30.000 €", satz: 24 },
  { label: "30–50.000 €", satz: 30 },
  { label: "50–75.000 €", satz: 37 },
  { label: "über 75.000 €", satz: 42 },
];

function Auswahl<T extends string | number>(p: { legende: string; optionen: { label: string; wert: T }[]; wert: T; setze: (w: T) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-tinte">{p.legende}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {p.optionen.map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={p.wert === o.wert}
            onClick={() => p.setze(o.wert)}
            className={`rounded-full border px-4 py-2 text-sm ${p.wert === o.wert ? "border-akzent bg-akzent text-white" : "border-linie bg-white text-tinte hover:border-akzent"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function FoerderRechner() {
  const [rate, setRate] = useState(150);
  const [kinder, setKinder] = useState(0);
  const [unter25, setUnter25] = useState(false);
  const [satz, setSatz] = useState(30);

  const f = foerderung(rate, kinder, unter25, satz);
  const teile = [
    { name: "Grundzulage", wert: f.grundzulage, klasse: "bg-akzent" },
    { name: "Kinderzulage", wert: f.kinderzulage, klasse: "bg-gold" },
    { name: "Steuererstattung", wert: f.steuer, klasse: "bg-[#b48cc8]" },
  ].filter((t) => t.wert > 0);
  const summe = teile.reduce((s, t) => s + t.wert, 0) || 1;

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-15px_rgb(107_47_138/0.35)] lg:grid-cols-2">
      <div className="space-y-6 p-6 sm:p-8">
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-medium text-tinte">
            Ihr Beitrag im Monat <strong className="zahl text-2xl">{euro.format(rate)}</strong>
          </span>
          <input type="range" min={10} max={150} step={5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-3 w-full" />
          <span className="mt-1 flex justify-between text-xs text-leise"><span>10 €</span><span>150 € = volle Grundzulage</span></span>
        </label>
        <Auswahl legende="Kinder mit Kindergeld" optionen={[0, 1, 2, 3].map((k) => ({ label: k === 3 ? "3+" : String(k), wert: k }))} wert={kinder} setze={setKinder} />
        <Auswahl legende="Bruttoeinkommen im Jahr" optionen={EINKOMMEN.map((e) => ({ label: e.label, wert: e.satz }))} wert={satz} setze={setSatz} />
        <Auswahl legende="Jünger als 25?" optionen={[{ label: "Nein", wert: "nein" }, { label: "Ja", wert: "ja" }]} wert={unter25 ? "ja" : "nein"} setze={(w) => setUnter25(w === "ja")} />
      </div>

      <div className="bg-akzent-dunkel p-6 text-white sm:p-8" aria-live="polite">
        <p className="text-sm text-[#e3d2ee]">Ihre Förderung pro Jahr</p>
        <p className="zahl mt-1 text-5xl font-semibold">{euro.format(f.gesamt - f.startbonus)}</p>
        <p className="mt-2 text-[#e3d2ee]">
          Auf jeden eingezahlten Euro legt der Staat etwa <strong className="text-gold">{Math.round(f.quote * 100)} Cent</strong> drauf.
        </p>

        <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/15">
          {teile.map((t) => (
            <div key={t.name} className={t.klasse} style={{ width: `${(t.wert / summe) * 100}%` }} />
          ))}
        </div>
        <dl className="mt-5 space-y-2 text-sm">
          {[
            ["Grundzulage", f.grundzulage],
            ["Kinderzulage", f.kinderzulage],
            ["Steuererstattung (geschätzt)", f.steuer],
          ].map(([name, wert]) => (
            <div key={name as string} className="flex justify-between border-b border-white/15 pb-2">
              <dt className="text-[#e3d2ee]">{name}</dt>
              <dd className="zahl font-medium">{euro.format(wert as number)}</dd>
            </div>
          ))}
          {unter25 && (
            <div className="flex justify-between border-b border-white/15 pb-2">
              <dt className="text-[#e3d2ee]">Startbonus, einmalig im ersten Jahr</dt>
              <dd className="zahl font-medium text-gold">+ {euro.format(f.startbonus)}</dd>
            </div>
          )}
          <div className="flex justify-between pt-1">
            <dt className="text-[#e3d2ee]">Förderquote</dt>
            <dd className="zahl font-semibold text-gold">{prozent(f.quote)}</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs text-[#d6c2e3]">
          Beispielrechnung ohne Gewähr, Stand der beschlossenen Regeln für 2027. Steuererstattung grob geschätzt mit {satz} %
          Grenzsteuersatz für Alleinstehende. Die Auszahlungen im Alter werden versteuert.
        </p>
      </div>
    </div>
  );
}
