import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import { JUSTAVD, SITE_URL } from "@/lib/seite";
import "./globals.css";

// Wird beim Bauen heruntergeladen und von der Seite selbst ausgeliefert (keine Anfrage an Google)
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-outfit", display: "swap" });

export const viewport: Viewport = { themeColor: "#fbf9fd" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Förderdepot: So viel Förderung gibt es fürs Altersvorsorgedepot",
    template: "%s | Förderdepot",
  },
  description:
    "Grundzulage bis 540 €, Kinderzulage bis 300 €, Startbonus und Steuervorteil: Berechnen Sie, wie viel Förderung Sie ab 2027 für Ihr Altersvorsorgedepot bekommen.",
  openGraph: { siteName: "Förderdepot", locale: "de_DE", type: "website" },
  formatDetection: { telephone: false },
};

const NAV = [
  { href: "/#rechner", text: "Förderrechner" },
  { href: "/#bausteine", text: "Bausteine" },
  { href: "/#tipps", text: "Tipps" },
  { href: "/#fragen", text: "Fragen" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`h-full antialiased ${outfit.variable}`}>
      <body className="flex min-h-full flex-col font-sans text-[1.0625rem]">
        <header className="px-3 pt-3 sm:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-white px-4 py-2.5 shadow-sm sm:px-6">
            <Link href="/" aria-label="Förderdepot, zur Startseite">
              <Logo />
            </Link>
            <nav aria-label="Hauptnavigation" className="hidden gap-7 text-[0.95rem] md:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-text hover:text-akzent">
                  {n.text}
                </Link>
              ))}
            </nav>
            <Link href="/#rechner" className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-tinte hover:bg-[#f0b93a]">
              <span className="whitespace-nowrap sm:hidden">Berechnen</span>
              <span className="hidden whitespace-nowrap sm:inline">Förderung berechnen</span>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col">{children}</div>

        <footer className="mx-3 mt-20 mb-3 rounded-2xl bg-tinte text-sm text-[#cbbcd6] sm:mx-6">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="text-lg font-semibold text-white">Förderdepot</p>
              <p className="mt-2 max-w-md">
                Informationen zur staatlichen Förderung des Altersvorsorgedepots. Keine Anlage- oder Steuerberatung, alle Beträge ohne
                Gewähr.
              </p>
              <p className="mt-3">
                Ein Angebot von Philipp Oelmann, Hannover. Persönliche Beratung auf{" "}
                <a href={JUSTAVD} className="text-white underline underline-offset-2 hover:text-gold">justavd.de</a>.
              </p>
            </div>
            <div>
              <p className="font-medium text-white">Inhalt</p>
              <ul className="mt-2 space-y-1.5">
                {NAV.map((n) => (
                  <li key={n.href}><Link href={n.href} className="hover:text-white">{n.text}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Rechtliches</p>
              <ul className="mt-2 space-y-1.5">
                <li><Link href="/impressum/" className="hover:text-white">Impressum</Link></li>
                <li><Link href="/datenschutz/" className="hover:text-white">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
