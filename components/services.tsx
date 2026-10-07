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

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const reduce = useReducedMotion();
  const card = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  });

  return (
    <section id="solucoes" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-32">
      <div className="mb-12 max-w-2xl sm:mb-16">
        <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent">
          O que fazemos
        </p>
        <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl">
          Soluções digitais que a gente tira do papel.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* Destaque: sistemas sob medida */}
        <motion.article
          {...card(0)}
          className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-panel border border-line p-8 transition-colors hover:border-accent/40 md:col-span-4 md:row-span-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(154,214,79,0.12), rgba(20,17,9,0.2) 55%), var(--color-surface)",
          }}
        >
          <SaguaroMark className="absolute -right-6 -top-8 h-56 w-56 opacity-[0.07]" />
          <StackSimple className="h-9 w-9 text-accent" weight="duotone" />
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Sistemas e plataformas sob medida
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Do painel interno ao sistema que roda o seu negócio inteiro.
              Arquitetura própria, pensada para escalar e nunca te prender a um
              molde pronto.
            </p>
          </div>
        </motion.article>

        <ServiceCard
          {...card(1)}
          icon={ShoppingBag}
          title="E-commerce"
          body="Lojas rápidas e seguras, do catálogo ao checkout."
          className="md:col-span-2"
        />

        <ServiceCard
          {...card(2)}
          icon={DeviceMobile}
          title="Aplicativos"
          body="Apps web e mobile que funcionam de verdade na mão do usuário."
          className="md:col-span-2"
          tinted
        />

        <ServiceCard
          {...card(3)}
          icon={Browser}
          title="Sites e landing pages"
          body="Presença digital que carrega veloz e converte."
          className="md:col-span-2"
        />

        <ServiceCard
          {...card(4)}
          icon={PenNib}
          title="UX / UI Design"
          body="Interfaces claras, com foco em usabilidade e identidade."
          className="md:col-span-2"
        />

        {/* Faixa larga: Saguaro CMS */}
        <motion.a
          {...card(5)}
          href="#cms"
          className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-panel border border-line p-8 transition-colors hover:border-accent/40 md:col-span-6"
          style={{
            background:
              "radial-gradient(120% 140% at 100% 0%, rgba(217,168,108,0.1), transparent 60%), var(--color-surface)",
          }}
        >
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Saguaro CMS
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">
              Nosso sistema de gestão de conteúdo próprio. Você publica e edita
              tudo sozinho, sem depender de ninguém.
            </p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-all group-hover:border-accent/50 group-hover:bg-accent group-hover:text-[#10140a]">
            <ArrowRight weight="bold" className="h-5 w-5" />
          </span>
        </motion.a>
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
    <motion.article
      {...motionProps}
      className={`group flex min-h-[200px] flex-col justify-between rounded-panel border border-line p-7 transition-colors hover:border-accent/40 ${
        tinted ? "" : "bg-surface"
      } ${className}`}
      style={
        tinted
          ? {
              background:
                "linear-gradient(160deg, rgba(217,168,108,0.1), var(--color-surface) 60%)",
            }
          : undefined
      }
    >
      <Icon className="h-8 w-8 text-accent" weight="duotone" />
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </motion.article>
  );
}
