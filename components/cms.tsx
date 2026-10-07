"use client";

import { Check, Cursor } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./ui/reveal";
import { Magnetic } from "./ui/magnetic";
import { LinkButton } from "./ui/button";
import { whatsappLink } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const features = [
  "Edite textos, imagens e páginas sozinho, sem tocar em código",
  "Vários usuários e permissões para a sua equipe",
  "Responsivo: gerencie do computador ou do celular",
  "Seguro, atualizado e integrado ao seu projeto",
];

export function CMS() {
  const reduce = useReducedMotion();
  return (
    <section
      id="cms"
      className="relative scroll-mt-24 border-y border-line bg-surface/40 py-20 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <h2 className="font-display pb-1 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
              Publique sem{" "}
              <span className="text-accent italic">pedir licença.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              O Saguaro CMS é o nosso sistema próprio de gestão de conteúdo. Ele
              vem junto com o seu projeto para você ter autonomia total no dia a
              dia.
            </p>
          </Reveal>

          <ul className="mt-9 flex flex-col gap-4">
            {features.map((f, i) => (
              <Reveal as="li" key={f} delay={0.15 + i * 0.08} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check weight="bold" className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed text-ink/90">{f}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5} className="mt-10">
            <Magnetic>
              <LinkButton
                href={whatsappLink("Olá, Saguaro! Quero conhecer o Saguaro CMS.")}
                external
                size="lg"
              >
                Quero autonomia
              </LinkButton>
            </Magnetic>
          </Reveal>
        </div>

        {/* Painel de marca: motivo abstrato de blocos de conteúdo editáveis */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-md rounded-panel border border-line bg-bg p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-faint" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="ml-3 font-mono text-[0.7rem] text-faint">
                saguaro-cms
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              {[88, 64, 96, 72].map((w, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-surface-2" />
                  <div className="flex-1">
                    <div
                      className="h-2.5 rounded-full bg-line"
                      style={{ width: `${w}%` }}
                    />
                    <div className="mt-2 h-2.5 w-1/2 rounded-full bg-surface-2" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* "cursor" publicando */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1, ease: EASE }}
              className="mt-6 flex items-center justify-end gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#10140a]">
                Publicar
              </span>
              <motion.span
                animate={reduce ? {} : { x: [0, -6, 0], y: [0, -3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent"
              >
                <Cursor weight="fill" className="h-5 w-5" />
              </motion.span>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
