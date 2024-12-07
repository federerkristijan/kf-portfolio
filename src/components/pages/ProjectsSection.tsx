import { ProjectsSectionPayload } from "@/types/global";
import Image from "next/image";
import { projectsVars } from "@/utils/variables";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import * as ReactIcons from "react-icons";

const ProjectsSection = ({ title, subtitle }: ProjectsSectionPayload) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = (ReactIcons as any)[iconName];
    return IconComponent ? <IconComponent key={iconName} /> : null;
  };

  return (
    <div className="projects-section py-8 px-4">
      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center mb-6">{subtitle}</p>
        <Carousel projects={projectsVars} />
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:block">
        <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
        <p className="text-center mb-8">{subtitle}</p>
        <div className="projects-grid grid grid-cols-1 gap-6 md:grid-cols-3">
          {projectsVars.map((project, index) => (
            <div
              className="project-card flex flex-col gap-4 p-4 rounded-xl shadow-lg w-full bg-slate-300 border-2 border-slate-400 text-black"
              key={index}
            >
              <h3 className="project-title text-center text-lg font-semibold">{project.title}</h3>
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="project-image flex items-center justify-center py-1 px-2 w-full h-48 rounded-xl bg-black overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={250}
                  className="rounded-xl w-full h-full object-cover"
                />
              </Link>
              <p className="project-description text-base">{project.description}</p>
              <div className="project-icons flex gap-3 text-xl justify-center">
                {project.icons.map((iconName, iconIndex) => (
                  <span key={iconIndex}>{renderIcon(iconName)}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
