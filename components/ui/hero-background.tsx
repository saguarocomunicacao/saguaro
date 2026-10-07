"use client";

import { useEffect, useRef } from "react";

/*
  Rede de nós (constellation network): pontos de dados que derivam e se
  conectam por linhas quando próximos. O cursor vira um nó que atrai e
  acende as conexões ao redor. É a linguagem visual de tecnologia:
  sistemas, redes e dados conectados - a cara de um laboratório de dev.
  Monocromático: verde-saguaro + branco sobre preto.

  - Canvas 2D, limpo a cada quadro (rede nítida).
  - prefers-reduced-motion: desenha um único quadro estático.
  - devicePixelRatio limitado; cleanup completo no unmount.
*/

type Node = { x: number; y: number; vx: number; vy: number; white: boolean; r: number };

const GREEN = "154,214,79";
const WHITE = "245,245,244";
const LINK_DIST = 150;
const MOUSE_DIST = 220;

export function HeroBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el: HTMLCanvasElement = ref.current;
    const ctx2d = el.getContext("2d", { alpha: false });
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    function makeNode(): Node {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        white: Math.random() < 0.12,
        r: 1.4 + Math.random() * 1.2,
      };
    }

    function resize() {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width = Math.floor(W * dpr);
      el.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(150, Math.max(50, Math.floor((W * H) / 15000)));
      nodes = Array.from({ length: count }, makeNode);
    }

    function draw() {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      // move + bounce
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        // leve atração em direção ao cursor
        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < MOUSE_DIST * MOUSE_DIST) {
          const dm = Math.sqrt(dm2) || 1;
          const f = (1 - dm / MOUSE_DIST) * 0.25;
          n.x += (dxm / dm) * f;
          n.y += (dym / dm) * f;
        }
      }

      // linhas entre nós próximos
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${GREEN},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // linhas do cursor para os nós próximos (mais acesas)
      if (mouse.x > -9000) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / MOUSE_DIST) * 0.5;
            ctx.strokeStyle = `rgba(${GREEN},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nós
      for (const n of nodes) {
        ctx.fillStyle = n.white ? `rgba(${WHITE},0.9)` : `rgba(${GREEN},0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let raf = 0;
    function frame() {
      draw();
      raf = requestAnimationFrame(frame);
    }

    function onMouse(e: MouseEvent) {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      draw();
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />
  );
}
