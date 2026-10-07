"use client";

import { Quotes } from "@phosphor-icons/react";
import { Reveal } from "./ui/reveal";

/*
  ATENÇÃO: depoimentos de exemplo (nomes reais vieram do site atual, textos
  são placeholders). Substituir pelos depoimentos reais dos clientes.
*/
const testimonials = [
  {
    quote:
      "Saíram do que todo mundo oferece e construíram exatamente o que o meu negócio precisava. O suporte nunca me deixou na mão.",
    name: "Mauro",
    role: "Comércio local",
    offset: "lg:mt-0",
  },
  {
    quote:
      "Pela primeira vez consigo atualizar o meu site sozinha. O Saguaro CMS mudou a minha rotina.",
    name: "Regina",
    role: "Clínica",
    offset: "lg:mt-16",
  },
  {
    quote:
      "Tiraram a ideia do papel e entregaram um sistema rápido e seguro. Viraram parceiros de verdade.",
    name: "Daniel",
    role: "Startup",
    offset: "lg:mt-8",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/40 py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display mb-14 max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em] sm:mb-20">
            Quem <span className="text-accent">tirou do papel</span> com a gente.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.1}
              className={`flex flex-col justify-between rounded-panel border border-line bg-bg p-8 ${t.offset}`}
            >
              <div>
                <Quotes weight="fill" className="h-8 w-8 text-accent/70" />
                <p className="mt-5 text-lg leading-relaxed text-ink/90">
                  {t.quote}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 font-display text-lg font-semibold text-accent">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-medium text-ink">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
