import { SaguaroMark } from "./logo";

// Faixa cinética (único marquee do site): varredura rápida das frentes de trabalho.
const items = [
  "Sites",
  "Aplicativos",
  "Sistemas sob medida",
  "E-commerce",
  "Saguaro CMS",
  "UX / UI Design",
  "Suporte 24/7",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-surface/30 py-5">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-xl font-medium tracking-tight text-muted sm:text-2xl">
              {item}
            </span>
            <SaguaroMark className="h-4 w-4 opacity-60" />
          </span>
        ))}
      </div>
      {/* máscaras laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
