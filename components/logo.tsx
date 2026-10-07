import { site } from "@/lib/site";

// Logotipo oficial da Saguaro (cacto) + wordmark opcional.
export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SaguaroMark className="h-8 w-8 shrink-0" alt="Saguaro" />
      {showWordmark && (
        <span className="font-display text-[1.15rem] font-bold tracking-tight text-ink">
          {site.name}
          <span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}

/*
  Marca saguaro a partir do PNG oficial (public/logo.png).
  - silhouette: renderiza em preto (para uso sobre o bloco de cor verde).
  - alt vazio por padrão (uso decorativo); passe alt quando for o logo real.
*/
export function SaguaroMark({
  className = "",
  silhouette = false,
  alt = "",
}: {
  className?: string;
  silhouette?: boolean;
  alt?: string;
}) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={`${silhouette ? "brightness-0" : ""} ${className}`}
    />
  );
}
