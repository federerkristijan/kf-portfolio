```tsx
"use client";

import { FC } from "react";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <FiGithub className="mr-2" />
            View on GitHub
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
```