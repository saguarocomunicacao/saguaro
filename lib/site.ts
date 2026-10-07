// Informações reais da Saguaro Comunicação (Florianópolis/SC).
export const site = {
  name: "Saguaro",
  fullName: "Saguaro Comunicação",
  phoneDisplay: "+55 (48) 99188-4139",
  phoneRaw: "5548991884139",
  address: "Rua Vidal Ramos, 140, Sala 1007, Centro, Florianópolis/SC",
  instagram: "https://instagram.com/saguarocomunicacao",
  facebook: "https://facebook.com/saguarocomunicacao",
  instagramHandle: "@saguarocomunicacao",
};

// Mensagem padrão ao abrir o WhatsApp a partir de um CTA.
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ?? "Olá, Saguaro! Quero tirar um projeto do papel.",
  );
  return `https://wa.me/${site.phoneRaw}?text=${text}`;
}

export const nav = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Saguaro CMS", href: "#cms" },
  { label: "Processo", href: "#processo" },
  { label: "Por que Saguaro", href: "#porque" },
  { label: "Contato", href: "#contato" },
];

// Rótulo único para a intenção "iniciar projeto" (usado em nav, hero, footer).
export const PRIMARY_CTA = "Começar projeto";
