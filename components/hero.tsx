"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Magnetic } from "./ui/magnetic";
import { LinkButton } from "./ui/button";
import { HeroBackground } from "./ui/hero-background";
import { SaguaroMark } from "./logo";
import { PRIMARY_CTA, whatsappLink } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

// Revelação por palavra com máscara (clip + leve rotação), estilo editorial.
function Word({ children, i, accent, italic }: { children: string; i: number; accent?: boolean; italic?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        initial={reduce ? false : { y: "110%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: EASE }}
        className={`inline-block ${accent ? "text-accent" : ""} ${italic ? "italic text-accent" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // parallax: o conteúdo sobe e some suavemente ao rolar
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* fundo WebGL vivo, visível imediatamente */}
      <HeroBackground className="absolute inset-0 h-full w-full" />
      {/* véu inferior para transição ao conteúdo seguinte */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      {/* marca d'água gigante */}
      <SaguaroMark className="pointer-events-none absolute -right-20 bottom-0 h-[70vh] w-[70vh] text-ink opacity-[0.04]" />

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative mx-auto w-full max-w-[1400px] px-5 pt-28 sm:px-8"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted"
        >
          <span className="h-px w-10 bg-accent" />
          Laboratório de desenvolvimento digital
        </motion.div>

        {/* headline editorial gigante, quebrando a grade */}
        <h1 className="font-display font-extrabold leading-[0.86] tracking-[-0.04em]">
          <span className="block text-[clamp(2.5rem,8vw,7rem)]">
            <Word i={0}>Tudo</Word>
            <Word i={1}>sob</Word>
            <Word i={2} italic>
              medida
            </Word>
          </span>
          <span className="block pl-[0.5em] text-[clamp(2.5rem,8vw,7rem)]">
            <Word i={3}>Feito</Word>
            <Word i={4}>para</Word>
            <Word i={5}>você.</Word>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="max-w-[40ch] text-lg leading-relaxed text-ink/80 sm:text-xl"
          >
            Desenhamos, construímos e evoluímos sites, aplicativos e sistemas
            feitos exatamente para o seu negócio.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82, ease: EASE }}
            className="flex shrink-0 flex-wrap items-center gap-3"
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
      </motion.div>
    </section>
  );
}
