"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { Reveal } from "./ui/reveal";

const reasons = [
  {
    title: "Otimização",
    body: "Sites leves e rápidos, otimizados para carregar veloz e ranquear bem no Google.",
  },
  {
    title: "Segurança",
    body: "Camadas de proteção e atualizações constantes contra as ameaças de hoje.",
  },
  {
    title: "Design exclusivo",
    body: "Layouts feitos sob medida para a sua marca, nunca um tema genérico reaproveitado.",
  },
  {
    title: "Usabilidade",
    body: "Navegação intuitiva, que respeita o tempo de quem está do outro lado da tela.",
  },
  {
    title: "Responsividade",
    body: "Experiência impecável no celular, no tablet e no computador, sem exceção.",
  },
  {
    title: "Atualizações",
    body: "Seu projeto não envelhece parado: ele evolui com melhorias contínuas.",
  },
];

export function Reasons() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="porque"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
                Seis motivos para{" "}
                <span className="text-coral">fugir do engessado.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm leading-relaxed text-muted">
                O que vem de fábrica é igual para todo mundo. O que a gente faz é
                só seu.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="flex flex-col">
            {reasons.map((r, i) => {
              const isOpen = open === i;
              return (
                <li key={r.title} className="border-b border-line first:border-t">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-sm text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {r.title}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 ${isOpen ? "text-accent" : "text-muted"}`}
                    >
                      <Plus weight="bold" className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-lg pb-7 pl-[2.6rem] leading-relaxed text-muted">
                          {r.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
