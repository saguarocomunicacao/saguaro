"use client";

import { InstagramLogo, FacebookLogo, WhatsappLogo, ArrowUp } from "@phosphor-icons/react";
import { Logo, SaguaroMark } from "./logo";
import { nav, site, PRIMARY_CTA, whatsappLink } from "@/lib/site";
import { Magnetic } from "./ui/magnetic";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden">
      {/* bloco de cor forte: único momento claro da página (color-block editorial) */}
      <div className="relative overflow-hidden bg-accent text-[#0c1206]">
        <SaguaroMark className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 text-[#0c1206] opacity-[0.07]" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
            Pronto para algo <span className="italic text-coral">único?</span>
          </h2>
          <Magnetic>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0c1206] px-8 py-4 text-base font-medium text-accent transition-transform active:translate-y-px"
            >
              {PRIMARY_CTA}
              <ArrowUp weight="bold" className="h-4 w-4 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-10 border-t border-line pt-14 pb-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Laboratório de desenvolvimento digital. Sites, aplicativos e
              sistemas sob medida.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wide text-faint">Navegar</span>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wide text-faint">Contato</span>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {site.phoneDisplay}
            </a>
            <span className="max-w-[16rem] text-sm text-muted">{site.address}</span>
            <div className="mt-2 flex gap-3">
              <SocialIcon href={site.instagram} label="Instagram">
                <InstagramLogo weight="duotone" className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href={site.facebook} label="Facebook">
                <FacebookLogo weight="duotone" className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href={whatsappLink()} label="WhatsApp">
                <WhatsappLogo weight="duotone" className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 text-sm text-faint sm:flex-row sm:items-center">
          <span>
            © {year} {site.fullName}. Feito sob medida em Florianópolis.
          </span>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            Voltar ao topo
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent/50 group-hover:text-accent">
              <ArrowUp weight="bold" className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      {/* wordmark gigante de rodapé */}
      <div
        className="pointer-events-none select-none px-5 pb-8 text-center font-display font-extrabold leading-none tracking-tighter text-ink/[0.04] sm:px-8"
        style={{ fontSize: "clamp(4rem, 22vw, 20rem)" }}
        aria-hidden="true"
      >
        saguaro
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}
