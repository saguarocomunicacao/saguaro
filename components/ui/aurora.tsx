"use client";

/*
  Fundo "aurora" sutil: blobs de gradiente radial desfocados que derivam
  lentamente, em tons de verde-saguaro sobre o tema escuro. Puro CSS,
  pointer-events-none, colapsa para estático em prefers-reduced-motion.
*/
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="aurora-blob absolute -top-[18%] left-[8%] h-[52vw] w-[52vw] max-h-[620px] max-w-[620px] rounded-full opacity-40 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(154,214,79,0.5), rgba(154,214,79,0) 70%)",
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute top-[6%] right-[2%] h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(154,214,79,0.35), rgba(154,214,79,0) 70%)",
          animation: "drift 24s ease-in-out infinite reverse",
        }}
      />
      <div
        className="aurora-blob absolute bottom-[-10%] left-[30%] h-[44vw] w-[44vw] max-h-[520px] max-w-[520px] rounded-full opacity-20 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",
          animation: "drift 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
