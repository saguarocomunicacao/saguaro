"use client";

import { motion, useReducedMotion } from "motion/react";
import { Aurora } from "./ui/aurora";
import { Magnetic } from "./ui/magnetic";
import { LinkButton } from "./ui/button";
import { SaguaroMark } from "./logo";
import { PRIMARY_CTA, whatsappLink } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const line1 = ["Nada", "de", "pronto."];
const line2 = ["Tudo", "sob", "medida."];
const capabilities = ["Sites", "Apps", "Sistemas", "E-commerce", "CMS"];

export function Hero() {
  const reduce = useReducedMotion();

  const wordAnim = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: "0%" },
    transition: { duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <Aurora />
      {/* véu inferior para aterrar o conteúdo sobre a aurora */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted backdrop-blur"
          >
            Laboratório de desenvolvimento digital
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
            <span className="block overflow-hidden pb-1">
              {line1.map((w, i) => (
                <motion.span key={w} {...wordAnim(i)} className="mr-[0.25em] inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden pb-1">
              {line2.map((w, i) => (
                <motion.span
                  key={w}
                  {...wordAnim(i + line1.length)}
                  className={`mr-[0.25em] inline-block ${
                    w === "medida." ? "text-accent italic" : ""
                  }`}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl"
          >
            Desenhamos, construímos e evoluímos sites, aplicativos e sistemas
            feitos exatamente para o seu negócio.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <LinkButton href={whatsappLink()} external size="lg">
                {PRIMARY_CTA}
              </LinkButton>
            </Magnetic>
            <LinkButton href="#solucoes" variant="ghost" size="lg" withIcon={false}>
              Ver soluções
            </LinkButton>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <HeroMark reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

function HeroMark({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: EASE }}
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px]"
    >
      {/* anéis concêntricos */}
      <div className="absolute inset-0 rounded-full border border-line/70" />
      <div className="absolute inset-[12%] rounded-full border border-line/50" />
      <div className="absolute inset-[26%] rounded-full border border-line/40" />

      {/* brilho central */}
      <div
        className="absolute inset-[18%] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(154,214,79,0.35), rgba(154,214,79,0) 70%)",
        }}
      />

      {/* marca saguaro */}
      <motion.div
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <SaguaroMark className="h-[42%] w-[42%] drop-shadow-[0_8px_30px_rgba(154,214,79,0.25)]" />
      </motion.div>

      {/* pills de capacidade orbitando */}
      {capabilities.map((cap, i) => {
        const angle = (i / capabilities.length) * Math.PI * 2 - Math.PI / 2;
        const r = 50; // % do raio
        const left = 50 + Math.cos(angle) * r;
        const top = 50 + Math.sin(angle) * r;
        return (
          <motion.span
            key={cap}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: EASE }}
            style={{ left: `${left}%`, top: `${top}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wide text-ink backdrop-blur"
          >
            {cap}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
