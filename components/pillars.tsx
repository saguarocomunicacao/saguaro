"use client";

import { Sparkle, ShieldCheck, Lightning, Headset } from "@phosphor-icons/react";
import { Reveal } from "./ui/reveal";

// Pilares da marca (sem métricas inventadas): o tripé do site atual + suporte.
const pillars = [
  {
    icon: Sparkle,
    title: "Customização",
    body: "Nada de template engessado. Cada projeto nasce do seu negócio, não de um molde pronto.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    body: "Código próprio, boas práticas e atualizações constantes para dormir tranquilo.",
  },
  {
    icon: Lightning,
    title: "Modernidade",
    body: "Tecnologia atual, performance de verdade e interfaces que acompanham o seu tempo.",
  },
  {
    icon: Headset,
    title: "Suporte 24/7",
    body: "A gente não some depois do lançamento. Acompanhamos e evoluímos junto com você.",
  },
];

export function Pillars() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.08}
            className="flex flex-col gap-4 bg-bg p-7 transition-colors hover:bg-surface sm:p-8"
          >
            <p.icon
              className="h-7 w-7 text-accent"
              weight="duotone"
            />
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
