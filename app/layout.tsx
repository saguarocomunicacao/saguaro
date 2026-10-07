import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

const SITE_URL = "https://www.saguarocomunicacao.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saguaro Comunicação - Laboratório de desenvolvimento digital",
    template: "%s · Saguaro Comunicação",
  },
  description:
    "Laboratório digital em Florianópolis. Desenhamos, construímos e evoluímos sites, aplicativos e sistemas sob medida. Nada engessado: customização, segurança e modernidade.",
  keywords: [
    "desenvolvimento de sites",
    "aplicativos sob medida",
    "sistemas personalizados",
    "Saguaro CMS",
    "agência digital Florianópolis",
    "UX UI design",
    "e-commerce",
  ],
  authors: [{ name: "Saguaro Comunicação" }],
  creator: "Saguaro Comunicação",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Saguaro Comunicação",
    title: "Saguaro Comunicação - Laboratório de desenvolvimento digital",
    description:
      "Sites, aplicativos e sistemas sob medida. Nada engessado: customização, segurança e modernidade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saguaro Comunicação",
    description:
      "Laboratório digital. Sites, aplicativos e sistemas sob medida.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable}`}>
      <body>
        {/* Sem JS, revela o conteúdo que as animações deixariam invisível. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
