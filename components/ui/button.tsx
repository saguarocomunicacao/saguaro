import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

// Botões: pill em todo o site. Primário = accent sólido + texto escuro (alto contraste).
// Ghost = borda + texto claro. Estado :active com leve push físico.

type Variant = "primary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#10140a] hover:bg-[#aee05f] shadow-[0_8px_30px_-8px_rgba(154,214,79,0.5)]",
  ghost:
    "border border-line bg-surface/40 text-ink hover:border-accent/50 hover:bg-surface",
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  withIcon = true,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  withIcon?: boolean;
  external?: boolean;
  className?: string;
}) {
  const sizing = size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizing} ${className}`}
    >
      {children}
      {withIcon && (
        <ArrowUpRight
          weight="bold"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </a>
  );
}
