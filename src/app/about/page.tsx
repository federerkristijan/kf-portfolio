import { AboutPagePayload, AboutPageProps } from "@/types/global";
import AboutPage from "@/components/pages/AboutPage";
import { aboutVars, skills } from "@/utils/variables";

export default async function About() {
  // Fetch data for the About page
  const aboutPageData: AboutPageProps = {
    title: aboutVars.title,
    description: aboutVars.description,
    image: {
      src: "@/assets/CV Foto Glasses 1 - Edited 1.png",
      height: 200,
      width: 200,
    },
    skills: skills,
  };

  return (
    <AboutPage
    title={aboutPageData.title}
    description={aboutPageData.description}
    image={aboutPageData.image}
    skills={aboutPageData.skills}
  />
  );
}
