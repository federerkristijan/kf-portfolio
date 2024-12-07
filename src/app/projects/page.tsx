import ContactSection from "@/components/pages/ContactSection";
import ProjectsSection from "@/components/pages/ProjectsSection";
import { projectsTitles, projectsVars } from "@/utils/variables";

export default async function Projects() {
  return (
    <>
      <ProjectsSection
        title={projectsTitles.title}
        subtitle={projectsTitles.subtitle}
        projects={projectsVars}
      />
      <ContactSection />
    </>
  );
}
