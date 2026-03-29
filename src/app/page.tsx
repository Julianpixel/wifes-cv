import { getSiteData } from "@/lib/data";
export const dynamic = 'force-dynamic';
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default async function Home() {
  const data = await getSiteData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={data.profile.name} />
      <main>
        {data.sections.hero && (
          <Hero name={data.profile.name} title={data.profile.role} description={data.profile.bio} image={data.profile.image} />
        )}
        {data.sections.about && (
          <About name={data.profile.name} role={data.profile.role} bio={data.profile.bio} location={data.profile.location} />
        )}
        {data.sections.services && (
          <Services services={data.services} />
        )}
        {data.sections.portfolio && (
          <Portfolio projects={data.projects} />
        )}
        {data.sections.process && (
          <Process />
        )}
        {data.sections.testimonials && (
          <Testimonials testimonials={data.testimonials} />
        )}
        {data.sections.cta && (
          <CTA />
        )}
        {data.sections.contact && (
          <Contact email={data.profile.email} location={data.profile.location} socials={data.profile.socials} />
        )}
      </main>
      <Footer name={data.profile.name} />
      <ScrollToTop />
    </div>
  );
}

