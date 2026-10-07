import { site } from "@/lib/site";

// Marca geométrica da Saguaro: um cacto saguaro estilizado + wordmark.
export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SaguaroMark className="h-7 w-7 shrink-0" />
      {showWordmark && (
        <span className="font-display text-[1.15rem] font-bold tracking-tight text-ink">
          {site.name}
          <span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}

export function SaguaroMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* braços e tronco do saguaro, traço arredondado */}
      <g
        stroke="currentColor"
        className="text-accent"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 44V12" />
        <path d="M24 26c0-5.5-1-8-5-8s-5 2.5-5 8v3c0 3 1.6 4.6 5 4.6" />
        <path d="M24 22c0-6 1-9 5.5-9S35 16 35 22v6c0 3.2-1.8 5-5.5 5" />
      </g>
      {/* flor no topo */}
      <circle cx="24" cy="9" r="3.2" className="fill-accent" />
    </svg>
  );
}
