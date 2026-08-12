import BackgroundFX from "@/components/BackgroundFX";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Writing from "@/components/Writing";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EditToolbar from "@/components/edit/EditToolbar";
import { ContentProvider } from "@/lib/content-store";
import type { SiteContent } from "@/lib/schema";
import siteContent from "@/content/site.json";

export default function Home() {
  return (
    <ContentProvider initial={siteContent as unknown as SiteContent}>
      <main className="relative">
        <BackgroundFX />
        <div className="relative z-10">
          <Nav />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Writing />
          <Certifications />
          <Contact />
          <Footer />
        </div>
        <EditToolbar />
      </main>
    </ContentProvider>
  );
}
