"use client";

import { useEffect, useRef } from "react";

/*
  Campo de fluxo (flow field): milhares de partículas seguem um campo de
  ruído que evolui no tempo, deixando rastros de luz. É arte generativa /
  computacional - a linguagem de um laboratório de desenvolvimento: dados,
  algoritmos e código em movimento. Monocromático: verde-saguaro sobre preto.

  - Canvas 2D (leve, sem WebGL).
  - Partículas são desviadas pelo cursor (repulsão suave).
  - prefers-reduced-motion: desenha um único quadro estático.
  - Cleanup completo no unmount; devicePixelRatio limitado.
*/

// --- simplex noise 3D (Stefan Gustavson, domínio público; compacto) ---
const grad3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];
function buildPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const n = Math.floor(Math.random() * (i + 1));
    [p[i], p[n]] = [p[n], p[i]];
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  return { perm, permMod12 };
}
function makeNoise3() {
  const { perm, permMod12 } = buildPerm();
  const F3 = 1 / 3;
  const G3 = 1 / 6;
  return function noise(x: number, y: number, z: number) {
    let n0, n1, n2, n3;
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    const z0 = z - (k - t);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    const calc = (gi: number, xx: number, yy: number, zz: number) => {
      let tt = 0.6 - xx * xx - yy * yy - zz * zz;
      if (tt < 0) return 0;
      const g = grad3[gi];
      tt *= tt;
      return tt * tt * (g[0] * xx + g[1] * yy + g[2] * zz);
    };
    n0 = calc(permMod12[ii + perm[jj + perm[kk]]], x0, y0, z0);
    n1 = calc(permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]], x1, y1, z1);
    n2 = calc(permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]], x2, y2, z2);
    n3 = calc(permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]], x3, y3, z3);
    return 32 * (n0 + n1 + n2 + n3);
  };
}

type P = { x: number; y: number; life: number; max: number; white: boolean };

export function HeroBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el: HTMLCanvasElement = ref.current;
    const ctx2d = el.getContext("2d", { alpha: false });
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noise = makeNoise3();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let particles: P[] = [];
    const NOISE_SCALE = 0.0016;
    const TIME_SCALE = 0.00016;
    const SPEED = 1.3;
    const mouse = { x: -9999, y: -9999 };

    function spawn(): P {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        life: Math.random() * 240,
        max: 160 + Math.random() * 220,
        white: Math.random() < 0.08,
      };
    }

    function resize() {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width = Math.floor(W * dpr);
      el.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);
      const count = Math.min(2200, Math.floor((W * H) / 1000));
      particles = Array.from({ length: count }, spawn);
    }

    function step(time: number) {
      // leve fade para criar rastros (quanto menor o alpha, mais longos)
      ctx.fillStyle = "rgba(10,10,10,0.04)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const angle =
          noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, time * TIME_SCALE) *
          Math.PI *
          2.2;
        let vx = Math.cos(angle) * SPEED;
        let vy = Math.sin(angle) * SPEED;

        // repulsão suave do cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / 150) * 2.2;
          vx += (dx / d) * f;
          vy += (dy / d) * f;
        }

        const nx = p.x + vx;
        const ny = p.y + vy;

        if (p.white) {
          ctx.strokeStyle = "rgba(245,245,244,0.32)";
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = "rgba(154,214,79,0.42)";
          ctx.lineWidth = 1.1;
        }
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.life++;

        if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10 || p.life > p.max) {
          Object.assign(p, spawn());
          p.life = 0;
        }
      }
    }

    let raf = 0;
    function frame(t: number) {
      step(t);
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
      // quadro estático: algumas passadas curtas do campo
      for (let i = 0; i < 90; i++) step(1000 + i * 16);
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
