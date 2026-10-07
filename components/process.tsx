"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Reveal } from "./ui/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const stroke = {
  stroke: "var(--color-accent)",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function useDrawVariants(reduce: boolean): { parent: Variants; child: Variants } {
  return {
    parent: {
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    },
    child: {
      hidden: reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 },
      show: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } },
    },
  };
}

function DiagramWrap({ reduce, children }: { reduce: boolean; children: React.ReactNode }) {
  const v = useDrawVariants(reduce);
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-12 w-12"
      variants={v.parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {children}
    </motion.svg>
  );
}

function TargetDiagram({ reduce }: { reduce: boolean }) {
  const v = useDrawVariants(reduce);
  return (
    <DiagramWrap reduce={reduce}>
      <motion.circle cx="32" cy="32" r="22" variants={v.child} {...stroke} />
      <motion.circle cx="32" cy="32" r="11" variants={v.child} {...stroke} />
      <motion.path d="M32 4 V16" variants={v.child} {...stroke} />
      <motion.path d="M32 48 V60" variants={v.child} {...stroke} />
      <motion.path d="M4 32 H16" variants={v.child} {...stroke} />
      <motion.path d="M48 32 H60" variants={v.child} {...stroke} />
      <motion.circle
        cx="32"
        cy="32"
        r="3.5"
        fill="var(--color-accent)"
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.4, ease: EASE }}
        style={{ transformOrigin: "32px 32px" }}
      />
    </DiagramWrap>
  );
}

function WireframeDiagram({ reduce }: { reduce: boolean }) {
  const v = useDrawVariants(reduce);
  return (
    <DiagramWrap reduce={reduce}>
      <motion.rect x="8" y="10" width="48" height="44" rx="4" variants={v.child} {...stroke} />
      <motion.path d="M8 22 H56" variants={v.child} {...stroke} />
      <motion.path d="M15 31 H30" variants={v.child} {...stroke} />
      <motion.path d="M15 39 H41" variants={v.child} {...stroke} />
      <motion.path d="M15 47 H34" variants={v.child} {...stroke} />
    </DiagramWrap>
  );
}

function CodeDiagram({ reduce }: { reduce: boolean }) {
  const v = useDrawVariants(reduce);
  return (
    <DiagramWrap reduce={reduce}>
      <motion.path d="M24 18 L10 32 L24 46" variants={v.child} {...stroke} />
      <motion.path d="M40 18 L54 32 L40 46" variants={v.child} {...stroke} />
      <motion.path d="M36 14 L28 50" variants={v.child} {...stroke} />
    </DiagramWrap>
  );
}

function GrowthDiagram({ reduce }: { reduce: boolean }) {
  const v = useDrawVariants(reduce);
  return (
    <DiagramWrap reduce={reduce}>
      <motion.path d="M8 54 H56" variants={v.child} {...stroke} />
      <motion.path d="M8 54 V10" variants={v.child} {...stroke} />
      <motion.path d="M14 44 L26 34 L36 40 L54 16" variants={v.child} {...stroke} />
      <motion.path d="M44 16 H54 V26" variants={v.child} {...stroke} />
    </DiagramWrap>
  );
}

const steps = [
  {
    n: "01",
    title: "Estratégia",
    body: "Antes de qualquer tela, entendemos o seu negócio, o seu público e o problema real a resolver.",
    Diagram: TargetDiagram,
  },
  {
    n: "02",
    title: "Design",
    body: "Desenhamos a experiência e a interface: fluxo, identidade visual e usabilidade.",
    Diagram: WireframeDiagram,
  },
  {
    n: "03",
    title: "Construção",
    body: "Desenvolvemos com código próprio, testando a cada etapa. Nada de gambiarra.",
    Diagram: CodeDiagram,
  },
  {
    n: "04",
    title: "Evolução",
    body: "Lançamos, acompanhamos os números e melhoramos continuamente, com suporte por perto.",
    Diagram: GrowthDiagram,
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="processo" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-14 sm:px-8 sm:py-24">
      <Reveal className="mb-14 sm:mb-20">
        <p className="mb-5 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-10 bg-accent" />O processo
        </p>
        <h2 className="font-display max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          Do briefing ao <span className="text-accent">no ar</span>, sem
          caixa-preta.
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Um jeito de trabalhar transparente, em que você acompanha cada passo do
          projeto.
        </p>
      </Reveal>

      <div ref={ref} className="relative">
        {/* linha conectora (desktop) com preenchimento verde conforme o scroll */}
        <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-line md:block">
          <motion.div
            style={{ scaleX: reduce ? 1 : lineScale }}
            className="h-full w-full origin-left bg-accent"
          />
        </div>

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col items-start md:items-center md:text-center">
              <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-line bg-bg">
                <s.Diagram reduce={!!reduce} />
              </div>
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-muted md:max-w-[15rem]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
