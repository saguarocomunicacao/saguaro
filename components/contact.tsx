"use client";

import { useState } from "react";
import {
  WhatsappLogo,
  MapPin,
  InstagramLogo,
  PaperPlaneRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { Reveal } from "./ui/reveal";
import { Aurora } from "./ui/aurora";
import { site, whatsappLink } from "@/lib/site";

export function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.nome.trim()) next.nome = "Conta pra gente como podemos te chamar.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Precisamos de um e-mail válido para retornar.";
    if (!form.mensagem.trim()) next.mensagem = "Escreva uma linha sobre o projeto.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const msg = `Olá, Saguaro! Meu nome é ${form.nome}. ${form.mensagem} (meu e-mail: ${form.email})`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-32"
    >
      <Aurora className="opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-bg/40" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Vamos tirar o seu projeto do papel?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Conte o que você precisa. A gente responde rápido e já pensa junto
              na melhor solução.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-3">
            <ContactRow
              href={whatsappLink()}
              icon={WhatsappLogo}
              label="WhatsApp"
              value={site.phoneDisplay}
              external
            />
            <ContactRow
              href={site.instagram}
              icon={InstagramLogo}
              label="Instagram"
              value={site.instagramHandle}
              external
            />
            <ContactRow
              icon={MapPin}
              label="Onde estamos"
              value={site.address}
            />
          </div>
        </div>

        {/* Formulário */}
        <Reveal delay={0.15}>
          <div className="rounded-panel border border-line bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
            {sent ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                <CheckCircle weight="fill" className="h-14 w-14 text-accent" />
                <h3 className="font-display mt-5 text-2xl font-semibold">
                  Mensagem a caminho!
                </h3>
                <p className="mt-2 max-w-xs text-muted">
                  Abrimos o WhatsApp com o seu recado. É só enviar que a gente
                  responde rapidinho.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ nome: "", email: "", mensagem: "" });
                  }}
                  className="mt-6 text-sm text-accent underline-offset-4 hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <Field
                  label="Nome"
                  id="nome"
                  value={form.nome}
                  onChange={(v) => update("nome", v)}
                  placeholder="Como podemos te chamar?"
                  error={errors.nome}
                />
                <Field
                  label="E-mail"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="voce@email.com"
                  error={errors.email}
                />
                <Field
                  label="Sobre o projeto"
                  id="mensagem"
                  textarea
                  value={form.mensagem}
                  onChange={(v) => update("mensagem", v)}
                  placeholder="Um site novo, um app, um sistema sob medida..."
                  error={errors.mensagem}
                />
                <button
                  type="submit"
                  className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-[#10140a] transition-all duration-200 hover:bg-[#aee05f] active:translate-y-px"
                >
                  Enviar no WhatsApp
                  <PaperPlaneRight
                    weight="fill"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon: Icon,
  label,
  value,
  external = false,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
  value: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-colors group-hover:border-accent/50">
        <Icon weight="duotone" className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wide text-faint">
          {label}
        </span>
        <span className="block text-ink">{value}</span>
      </span>
    </>
  );
  const cls =
    "group flex items-center gap-4 rounded-panel border border-transparent p-2 transition-colors";
  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${cls} hover:border-line hover:bg-surface/50`}
      >
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  textarea = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border bg-bg px-4 py-3 text-ink placeholder:text-faint outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/25";
  const border = error ? "border-clay" : "border-line";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink/90">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`${base} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} ${border}`}
        />
      )}
      {error && <span className="text-sm text-clay">{error}</span>}
    </div>
  );
}
