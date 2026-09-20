import { NAV_LINKS, SITE_CONFIG } from "@/lib/config";

export function Footer() {
  const socials = [
    { label: "Instagram", href: SITE_CONFIG.instagram },
    { label: "YouTube", href: SITE_CONFIG.youtube },
    { label: "Facebook", href: SITE_CONFIG.facebook },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-bg pb-10 pt-24 md:pt-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-16 md:flex-row">
          <div>
            <p className="text-[clamp(2.2rem,5vw,4.6rem)] font-semibold uppercase leading-none tracking-[-0.045em]">
              Axora Galaxy
            </p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-mute">
              {SITE_CONFIG.tagline}
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3 self-start text-[12px] font-medium uppercase tracking-[0.18em] text-mute">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors duration-300 hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-4 border-t border-line pt-6 text-[11px] uppercase tracking-[0.2em] text-mute md:flex-row">
          <p>&copy; {new Date().getFullYear()} AXORA GALAXY. All rights reserved.</p>
          {socials.length > 0 && (
            <div className="flex gap-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
