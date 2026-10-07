"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Parallax } from "./ui/parallax";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    n: "01",
    title: "Sistemas sob medida",
    desc: "Do painel interno ao sistema que roda o negócio inteiro, com arquitetura própria.",
    href: "#contato",
  },
  {
    n: "02",
    title: "Sites e landing pages",
    desc: "Presença digital que carrega veloz e converte de verdade.",
    href: "#contato",
  },
  {
    n: "03",
    title: "Aplicativos",
    desc: "Apps web e mobile que funcionam de verdade na mão do usuário.",
    href: "#contato",
  },
  {
    n: "04",
    title: "E-commerce",
    desc: "Lojas rápidas e seguras, do catálogo ao checkout.",
    href: "#contato",
  },
  {
    n: "05",
    title: "UX / UI Design",
    desc: "Interfaces claras, com foco em usabilidade e identidade.",
    href: "#contato",
  },
  {
    n: "06",
    title: "Saguaro CMS",
    desc: "Nosso sistema próprio de gestão de conteúdo. Autonomia total, sem depender de ninguém.",
    href: "#cms",
  },
];

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="solucoes"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-14 sm:px-8 sm:py-24"
    >
      <Parallax amount={40} className="mb-10 sm:mb-16">
        <p className="mb-5 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-10 bg-accent" />O que fazemos
        </p>
        <h2 className="font-display max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          Soluções que a gente{" "}
          <span className="text-accent">tira do papel.</span>
        </h2>
      </Parallax>

      {/* índice interativo: linhas grandes, sem caixas */}
      <ul className="border-t border-line">
        {services.map((s, i) => (
          <motion.li
            key={s.n}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            className="border-b border-line"
          >
            <a href={s.href} className="group relative block overflow-hidden">
              {/* preenchimento verde que varre da esquerda ao passar o mouse */}
              <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-accent/[0.07] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              <div className="relative flex flex-col gap-3 px-1 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7 lg:py-8">
                <div className="flex items-baseline gap-4 sm:gap-7">
                  <span className="font-mono text-xs text-faint transition-colors duration-300 group-hover:text-accent sm:text-sm">
                    {s.n}
                  </span>
                  <h3 className="font-display text-[clamp(1.9rem,5vw,4rem)] font-semibold leading-none tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent">
                    {s.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 pl-9 sm:justify-end sm:pl-0">
                  <p className="max-w-xs text-sm leading-relaxed text-muted sm:text-right sm:opacity-50 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
                    {s.desc}
                  </p>
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[#0a0a0a] sm:flex">
                    <ArrowRight
                      weight="bold"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
