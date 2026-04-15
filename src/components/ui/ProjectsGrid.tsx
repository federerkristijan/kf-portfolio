'use client';

import { Project } from '@/types/global';
import { projectsVars } from '@/utils/variables';
import Link from 'next/link';
import * as ReactIcons from 'react-icons';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = (ReactIcons as any)[iconName];
    return IconComponent ? <IconComponent key={iconName} /> : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.title} className="border p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <div className="flex gap-2 mt-2">
            {project.icons.map((icon) => renderIcon(icon))}
          </div>
          <Link href={project.url} target="_blank" className="text-blue-500 mt-4 block">
            View on GitHub
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
