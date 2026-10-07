"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./ui/reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Estratégia",
    body: "Antes de qualquer tela, entendemos o seu negócio, o seu público e o problema real que precisa ser resolvido.",
  },
  {
    n: "02",
    title: "Design",
    body: "Desenhamos a experiência e a interface: fluxo, identidade visual e usabilidade que fazem sentido para quem usa.",
  },
  {
    n: "03",
    title: "Construção",
    body: "Desenvolvemos com código próprio, testando a cada etapa. Nada de gambiarra, nada de molde pronto.",
  },
  {
    n: "04",
    title: "Evolução",
    body: "Lançamos, acompanhamos os números e melhoramos continuamente. Com suporte sempre por perto.",
  },
];

export function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      // Pin + pan horizontal apenas no desktop, respeitando reduced-motion.
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = track.current!.scrollWidth - window.innerWidth + 96;
          const tween = gsap.to(track.current, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: () => `+=${distance}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          return () => {
            tween.kill();
          };
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="processo" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto mb-12 max-w-[1400px] px-5 sm:mb-16 sm:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            Do briefing ao no ar, sem caixa-preta.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Um jeito de trabalhar transparente, em que você acompanha cada passo
            do projeto.
          </p>
        </Reveal>
      </div>

      {/* Área fixada no desktop; carrossel com snap no mobile */}
      <div ref={wrap} className="md:h-[100dvh] md:overflow-hidden">
        <div className="md:flex md:h-full md:items-center">
          <div
            ref={track}
            className="flex gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 md:overflow-visible md:pb-0 md:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {steps.map((s) => (
              <article
                key={s.n}
                style={{ scrollSnapAlign: "center" }}
                className="group relative flex min-h-[380px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-panel border border-line bg-surface p-8 transition-colors hover:border-accent/40 sm:w-[440px] sm:p-10"
              >
                <span className="font-display text-7xl font-extrabold leading-none text-line transition-colors duration-300 group-hover:text-accent/30 sm:text-8xl">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
