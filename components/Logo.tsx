/** Placeholder AXORA GALAXY monogram — swap for the official logo asset when supplied. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M14 52 32 12l18 40M22 38h20" stroke="#F5F5F5" strokeWidth="4.5" strokeLinecap="square" />
      <ellipse
        cx="32"
        cy="34"
        rx="27"
        ry="9"
        transform="rotate(-24 32 34)"
        stroke="#1557D6"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function Logo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <span
        className="font-semibold uppercase text-fg"
        style={{ fontSize: size * 0.5, letterSpacing: "0.3em" }}
      >
        Axora Galaxy
      </span>
    </span>
  );
}
