import { AboutPagePayload } from "@/types/global";
import Image from "next/image";
import Foto from "@/assets/CV Foto Glasses 1 - Edited 1.png";
import { aboutVars, quote } from "@/utils/variables";

type Props = Partial<AboutPagePayload> & {
  // The homepage already has the hero <h1>; /about passes "h1".
  headingAs?: "h1" | "h2";
};

export default function AboutPage({ image, skills, headingAs: Heading = "h2" }: Props) {
  return (
    <div className="about-wrapper">
      <Heading className="about-title">{aboutVars.title}</Heading>
      {image && (
        <Image
          src={Foto}
          alt="Kristijan Federer"
          width={150}
          height={150}
          className="about-pic"
        />
      )}
      <p className="about-description">{aboutVars.description}</p>
      <div className="about-skills-wrapper">
        {skills &&
          skills.map((skill) => (
            <span key={skill} className="about-skill">
              {skill}
            </span>
          ))}
      </div>
      <p className="about-quote">{'"' + quote + '"'}</p>
    </div>
  );
}
