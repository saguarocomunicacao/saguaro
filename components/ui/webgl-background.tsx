"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  Fundo WebGL: um "mesh gradient" fluido gerado por FBM (ruído fractal) com
  domain warping, nas cores do pôr do sol no deserto (verde-cacto, âmbar,
  coral) sobre base escura. Reage suavemente ao mouse e respira no tempo.

  - Sem React state no loop (uniforms atualizados via ref + rAF).
  - prefers-reduced-motion: renderiza um único quadro estático.
  - devicePixelRatio limitado para performance.
  - Cleanup completo no unmount.
*/

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;
varying vec2 vUv;

// --- simplex noise (Ashima) ---
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.0; a*=0.5; }
  return v;
}

void main(){
  vec2 uv=vUv;
  float aspect=uRes.x/uRes.y;
  vec2 p=uv; p.x*=aspect;

  float t=uTime*0.06;
  vec2 m=(uMouse-0.5);

  // domain warping
  vec2 q=vec2(fbm(p+t), fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+1.5*q+vec2(1.7,9.2)+0.15*m), fbm(p+1.5*q+vec2(8.3,2.8)-t));
  float f=fbm(p+1.8*r);

  // paleta pôr do sol no deserto
  vec3 base   = vec3(0.043,0.039,0.031); // escuro quente
  vec3 green  = vec3(0.604,0.839,0.310); // cacto
  vec3 amber  = vec3(0.886,0.635,0.298); // areia/âmbar
  vec3 coral  = vec3(0.850,0.400,0.247); // coral
  vec3 plum   = vec3(0.145,0.090,0.145); // ameixa profunda

  vec3 col=base;
  col=mix(col, plum,  smoothstep(-0.2,0.5,f));
  col=mix(col, coral, smoothstep(0.1,0.9,r.x));
  col=mix(col, amber, smoothstep(0.0,1.0,q.y)*0.7);
  col=mix(col, green, smoothstep(0.35,1.0,f)*0.8);

  // vinheta para aterrar o conteúdo
  float vig=smoothstep(1.25,0.25,length(uv-0.5));
  col*=mix(0.35,1.0,vig);

  // escurece conforme rola a página
  col*=mix(1.0,0.45,clamp(uScroll,0.0,1.0));

  // leve brilho central
  col+=green*0.04*smoothstep(0.6,0.0,length((uv-0.5)*vec2(aspect,1.0)));

  gl_FragColor=vec4(col,1.0);
}
`;

const VERT = `
varying vec2 vUv;
void main(){ vUv=uv; gl_Position=vec4(position,1.0); }
`;

export function WebglBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
      } catch {
        return false;
      }
    })();
    if (!supportsWebGL) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    }
    resize();

    // alvos suavizados (lerp) para mouse/scroll — sem React state
    const mouseTarget = { x: 0.5, y: 0.5 };
    function onMouse(e: MouseEvent) {
      mouseTarget.x = e.clientX / window.innerWidth;
      mouseTarget.y = 1 - e.clientY / window.innerHeight;
    }
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      uniforms.uScroll.value = max > 0 ? window.scrollY / max : 0;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf = 0;
    const start = performance.now();

    function frame(now: number) {
      uniforms.uTime.value = (now - start) / 1000;
      uniforms.uMouse.value.x += (mouseTarget.x - uniforms.uMouse.value.x) * 0.04;
      uniforms.uMouse.value.y += (mouseTarget.y - uniforms.uMouse.value.y) * 0.04;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      uniforms.uTime.value = 12.0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
