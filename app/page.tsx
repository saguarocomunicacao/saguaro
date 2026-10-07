import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Pillars } from "@/components/pillars";
import { Services } from "@/components/services";
import { CMS } from "@/components/cms";
import { Process } from "@/components/process";
import { Reasons } from "@/components/reasons";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.fullName,
  description:
    "Laboratório de desenvolvimento digital. Sites, aplicativos e sistemas sob medida.",
  url: "https://www.saguarocomunicacao.com",
  telephone: "+5548991884139",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Vidal Ramos, 140, Sala 1007",
    addressLocality: "Florianópolis",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  sameAs: [site.instagram, site.facebook],
  areaServed: "BR",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Pillars />
        <Services />
        <CMS />
        <Process />
        <Reasons />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
