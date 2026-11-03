// Bildmarke: Münze mit Pfeil nach oben (Zulage kommt dazu)
export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#6b2f8a" />
        <circle cx="16" cy="18" r="7" fill="#e2a724" />
        <circle cx="16" cy="18" r="4.2" fill="none" stroke="#7a5000" strokeWidth="1.4" />
        <path d="M16 4.5v6M12.8 7.7 16 4.5l3.2 3.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-tinte">
        Förder<span className="text-akzent">depot</span>
      </span>
    </span>
  );
}
