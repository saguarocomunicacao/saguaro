# Saguaro Comunicação — Site oficial

Site institucional da Saguaro Comunicação, laboratório de desenvolvimento digital em Florianópolis/SC.

Construído em **Next.js 15** (App Router) + **Tailwind CSS v4** + **Motion** + **GSAP**, com **exportação 100% estática** — ideal para hospedar no servidor próprio (cPanel/WHM), sem Node rodando.

## Stack

- **Next.js 15** com `output: "export"` (gera HTML/CSS/JS estático em `out/`)
- **Tailwind CSS v4** (tokens de design em `app/globals.css`)
- **Motion** (`motion/react`) para animações de UI e revelações de scroll
- **GSAP + ScrollTrigger** para o scroll horizontal da seção "Processo"
- **Phosphor Icons** para ícones
- Fontes via `next/font`: Bricolage Grotesque (títulos), Figtree (corpo), JetBrains Mono (detalhes)

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Gerar o site estático (para subir no servidor)

```bash
npm run build
```

Isso cria a pasta `out/` com o site completo (HTML/CSS/JS). É só esse conteúdo que vai para o servidor.

## Publicar no cPanel / WHM

1. Rode `npm run build` na sua máquina.
2. Compacte o **conteúdo de dentro** da pasta `out/` em um `.zip`
   (os arquivos `index.html`, `404.html`, a pasta `_next`, etc. na raiz do zip — não a pasta `out` em si).
3. No cPanel, abra o **Gerenciador de Arquivos** e entre em `public_html`
   (ou na pasta do domínio/subdomínio desejado).
4. Faça upload do `.zip` e use **Extrair** ali dentro.
5. Pronto. O site já está no ar no domínio.

> Dica: para atualizar o site depois, basta repetir o processo substituindo os arquivos.
> Como tudo é estático, não precisa de Node.js, Passenger nem banco de dados.

### HTTPS e www

- Garanta o **SSL** ativo para o domínio (AutoSSL no WHM).
- Defina o redirecionamento de `saguarocomunicacao.com` para `www.saguarocomunicacao.com`
  (ou o contrário) no cPanel, em **Domínios → Redirecionamentos**, para manter uma única URL canônica.

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| Telefone, endereço, redes sociais, menu | `lib/site.ts` |
| Textos do topo (hero) | `components/hero.tsx` |
| Pilares da marca | `components/pillars.tsx` |
| Soluções (bento) | `components/services.tsx` |
| Saguaro CMS | `components/cms.tsx` |
| Processo | `components/process.tsx` |
| Por que Saguaro (acordeão) | `components/reasons.tsx` |
| Depoimentos | `components/testimonials.tsx` |
| Contato | `components/contact.tsx` |
| Rodapé | `components/footer.tsx` |
| Cores, fontes, tema | `app/globals.css` |
| SEO / título / descrição | `app/layout.tsx` |

## A fazer (conteúdo real)

- [ ] Substituir os **depoimentos** de exemplo em `components/testimonials.tsx` pelos textos reais dos clientes.
- [ ] (Opcional) Adicionar uma seção de **portfólio** com prints de projetos reais.
- [ ] Gerar uma imagem **Open Graph** (`public/og.png`, 1200x630) e referenciá-la em `app/layout.tsx` para os previews em redes sociais.
