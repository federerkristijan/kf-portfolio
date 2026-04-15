import { HeroSection } from "@/components/pages/HeroSection";
import ContactSection from "@/components/pages/ContactSection";
import { heroSection, aboutVars, skills } from "@/utils/variables";
import AboutPage from "@/components/pages/AboutPage";

export default async function Page() {

import { HeroSection } from "@/components/pages/HeroSection";

const Page = () => {
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

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
    </>
  );
};

export default Page;