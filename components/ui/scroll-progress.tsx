"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Barra fina de progresso de leitura no topo. Usa scaleX (transform), sem re-render.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-accent"
      aria-hidden="true"
    />
  );
}
