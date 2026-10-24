import Foto from "@/assets/CV Foto Glasses 1 - Edited 1.png";
import AboutPage from "@/components/pages/AboutPage";
import { aboutVars } from "@/utils/variables";

export default function About() {
  return (
    <AboutPage
      headingAs="h1"
      title={aboutVars.title}
      description={aboutVars.description}
      image={Foto}
      skills={aboutVars.skills}
    />
  );
}
