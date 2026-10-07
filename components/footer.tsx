"use client";

import {
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
  ArrowUp,
  ArrowRight,
} from "@phosphor-icons/react";
import { Logo, SaguaroMark } from "./logo";
import { nav, site, PRIMARY_CTA, whatsappLink } from "@/lib/site";
import { Magnetic } from "./ui/magnetic";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden">
      {/* bloco de cor forte: único momento claro da página (color-block editorial) */}
      <div className="relative overflow-hidden bg-accent text-[#0c1206]">
        <SaguaroMark
          silhouette
          className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 opacity-[0.08]"
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-2xl text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
            Pronto para algo <span className="italic text-white">único?</span>
          </h2>
          <Magnetic>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0c1206] px-8 py-4 text-base font-medium text-accent transition-transform active:translate-y-px"
            >
              {PRIMARY_CTA}
              <ArrowUp
                weight="bold"
                className="h-4 w-4 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* marca + descrição + socials */}
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-muted">
              Laboratório de desenvolvimento digital. Sites, aplicativos e
              sistemas feitos sob medida.
            </p>
            <div className="mt-6 flex gap-3">
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

          {/* navegação */}
          <nav className="flex flex-col gap-4 md:col-span-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">
              Navegar
            </span>
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </nav>

          {/* contato */}
          <div className="flex flex-col gap-4 md:col-span-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">
              Contato
            </span>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 font-display text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl"
            >
              {site.phoneDisplay}
              <ArrowRight
                weight="bold"
                className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1"
              />
            </a>
            <span className="max-w-[18rem] leading-relaxed text-muted">
              {site.address}
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line py-8 text-sm text-faint sm:flex-row sm:items-center">
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

      {/* logotipo gigante em contorno verde, sangrando na base */}
      <div
        className="relative flex items-end justify-center overflow-hidden"
        style={{ height: "clamp(64px, 13vw, 200px)" }}
        aria-hidden="true"
      >
        <span
          className="translate-y-[24%] select-none whitespace-nowrap font-display font-extrabold leading-none tracking-tighter text-transparent"
          style={{
            fontSize: "clamp(5rem, 25vw, 21rem)",
            WebkitTextStroke: "1.5px rgba(154,214,79,0.16)",
          }}
        >
          saguaro
        </span>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center text-muted transition-colors hover:text-ink"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </a>
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/50 hover:text-accent hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
