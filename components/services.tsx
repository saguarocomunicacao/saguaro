"use client";

import {
  StackSimple,
  DeviceMobile,
  Browser,
  ShoppingBag,
  PenNib,
  ArrowRight,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { SaguaroMark } from "./logo";
import { Tilt } from "./ui/tilt";
import { Parallax } from "./ui/parallax";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const reduce = useReducedMotion();
  const enter = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay: i * 0.06, ease: EASE },
  });

  return (
    <section
      id="solucoes"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-14 sm:px-8 sm:py-22"
    >
      <Parallax amount={40} className="mb-14 sm:mb-20">
        <p className="mb-5 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-10 bg-accent" />O que fazemos
        </p>
        <h2 className="font-display max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          Soluções que a gente{" "}
          <span className="text-accent">tira do papel.</span>
        </h2>
      </Parallax>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* Destaque: sistemas sob medida */}
        <Tilt className="md:col-span-4 md:row-span-2">
          <motion.article
            {...enter(0)}
            className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-panel border border-line p-8 transition-colors hover:border-accent/50 sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(154,214,79,0.14), rgba(10,10,10,0.3) 50%), var(--color-surface)",
            }}
          >
            <SaguaroMark className="absolute -right-8 -top-10 h-64 w-64 text-ink opacity-[0.06]" />
            <StackSimple className="h-10 w-10 text-accent" weight="duotone" />
            <div>
              <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                Sistemas sob medida
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Do painel interno ao sistema que roda o negócio inteiro.
                Arquitetura própria, pensada para escalar e nunca te prender a um
                molde pronto.
              </p>
            </div>
          </motion.article>
        </Tilt>

        <ServiceCard {...enter(1)} icon={ShoppingBag} title="E-commerce" body="Lojas rápidas e seguras, do catálogo ao checkout." className="md:col-span-2" />
        <ServiceCard {...enter(2)} icon={DeviceMobile} title="Aplicativos" body="Apps web e mobile que funcionam de verdade na mão do usuário." className="md:col-span-2" tinted />
        <ServiceCard {...enter(3)} icon={Browser} title="Sites e landing pages" body="Presença digital que carrega veloz e converte." className="md:col-span-2" />
        <ServiceCard {...enter(4)} icon={PenNib} title="UX / UI Design" body="Interfaces claras, com foco em usabilidade e identidade." className="md:col-span-2" />

        {/* Faixa larga: Saguaro CMS */}
        <Tilt className="md:col-span-6" max={4}>
          <motion.a
            {...enter(5)}
            href="#cms"
            className="group relative flex h-full items-center justify-between gap-6 overflow-hidden rounded-panel border border-line p-8 transition-colors hover:border-accent/50 sm:p-10"
            style={{
              background:
                "radial-gradient(130% 150% at 100% 0%, rgba(154,214,79,0.12), transparent 55%), var(--color-surface)",
            }}
          >
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                Saguaro CMS
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                Nosso sistema de gestão de conteúdo próprio. Você publica e edita
                tudo sozinho, sem depender de ninguém.
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-all group-hover:border-accent/60 group-hover:bg-accent group-hover:text-[#0c1206]">
              <ArrowRight weight="bold" className="h-5 w-5" />
            </span>
          </motion.a>
        </Tilt>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  body,
  className = "",
  tinted = false,
  ...motionProps
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  className?: string;
  tinted?: boolean;
  [key: string]: unknown;
}) {
  return (
    <Tilt className={className}>
      <motion.article
        {...motionProps}
        className="group flex h-full min-h-[210px] flex-col justify-between rounded-panel border border-line p-7 transition-colors hover:border-accent/50"
        style={
          tinted
            ? { background: "linear-gradient(160deg, rgba(154,214,79,0.08), var(--color-surface) 60%)" }
            : { background: "var(--color-surface)" }
        }
      >
        <Icon className="h-8 w-8 text-accent" weight="duotone" />
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        </div>
      </motion.article>
    </Tilt>
  );
}
