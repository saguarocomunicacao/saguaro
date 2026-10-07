"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./logo";
import { Magnetic } from "./ui/magnetic";
import { LinkButton } from "./ui/button";
import { nav, PRIMARY_CTA, whatsappLink } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Alterna o estilo do header só quando cruza o limiar (sem re-render por frame).
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "mt-2 rounded-full border border-line bg-bg/70 backdrop-blur-xl sm:mx-6"
            : "border border-transparent"
        }`}
      >
        <a href="#top" aria-label="Saguaro, início" className="relative z-10">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Magnetic>
            <LinkButton href={whatsappLink()} external>
              {PRIMARY_CTA}
            </LinkButton>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
        >
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-bg/95 px-6 pt-28 pb-10 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="font-display border-b border-line py-4 text-3xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto pt-10">
              <LinkButton
                href={whatsappLink()}
                external
                size="lg"
                className="w-full"
              >
                {PRIMARY_CTA}
              </LinkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
