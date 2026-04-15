import { HeroSection } from "@/components/pages/HeroSection";
import ContactSection from "@/components/pages/ContactSection";
import { heroSection, aboutVars, skills, projectsVars } from "@/utils/variables";
import AboutPage from "@/components/pages/AboutPage";
import ProjectsGrid from "@/components/ui/ProjectsGrid";

export default async function Page() {
  return (
    <>
        {/* Hero Section */}
        <section>
          <HeroSection
            title={heroSection?.title || ""}
            subtitle={heroSection?.subtitle || "Fullstack Developer"}
          />
        </section>

        {/* About Section */}
        <section>
          <AboutPage title={aboutVars.title} description={aboutVars.description} skills={skills} />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsGrid projects={projectsVars} />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
    </>
  );
}
