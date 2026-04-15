```typescript
import { FC } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  techStack: string[];
  githubUrl: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
          <ul className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="bg-gray-200 text-xs font-medium px-2 py-1 rounded"
              >
                {tech}
              </li>
            ))}
          </ul>
          <Link href={project.githubUrl} target="_blank" rel="noreferrer">
            <a className="flex items-center text-blue-500 hover:text-blue-700">
              <FaGithub className="mr-2" />
              View on GitHub
            </a>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
```