import { AboutPagePayload } from "@/types/global";
import Image from "next/image";
import Foto from "@/assets/CV Foto Glasses 1 - Edited 1.png";
import { aboutVars, quote } from "@/utils/variables";

export default function AboutPage({ image, skills }: AboutPagePayload) {
  return (
    <div className="about-wrapper">
      <h1 className="about-title">{aboutVars.title}</h1>
      {image && (
        <Image
          src={Foto}
          alt="foto"
          width={150}
          height={150}
          className="about-pic"
        />
      )}
      <p className="about-description">{aboutVars.description}</p>
      <div className="about-skills-wrapper">
        {skills &&
          skills.map((skill, index) => (
            <span key={index} className="about-skill">
              {skill.title}
            </span>
          ))}
      </div>
      <p className="about-quote">{'"' + quote + '"'}</p>
    </div>
  );
}
