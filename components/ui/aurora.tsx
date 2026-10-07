"use client";

/*
  Fundo "aurora do deserto": blobs de gradiente radial desfocados que
  derivam lentamente. Puro CSS (animação drift), pointer-events-none,
  colapsa para estático em prefers-reduced-motion (via globals.css).
  Tons quentes de areia/clay + accent verde, dentro do tema escuro.
*/
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="aurora-blob absolute -top-[18%] left-[8%] h-[52vw] w-[52vw] max-h-[620px] max-w-[620px] rounded-full opacity-[0.55] blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(154,214,79,0.55), rgba(154,214,79,0) 70%)",
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute top-[6%] right-[2%] h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] rounded-full opacity-[0.45] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(217,168,108,0.5), rgba(217,168,108,0) 70%)",
          animation: "drift 24s ease-in-out infinite reverse",
        }}
      />
      <div
        className="aurora-blob absolute bottom-[-10%] left-[30%] h-[44vw] w-[44vw] max-h-[520px] max-w-[520px] rounded-full opacity-[0.4] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(192,106,63,0.45), rgba(192,106,63,0) 70%)",
          animation: "drift 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
