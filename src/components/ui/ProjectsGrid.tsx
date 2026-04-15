```typescript
// src/components/ProjectsGrid.tsx
"use client";

import { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

interface Project {
  title: string;
  techStack: string[];
  githubUrl: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-md rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
```