'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { projectsVars } from '@/utils/variables';
import * as Icons from 'react-icons/all';

interface Project {
  title: string;
  icons: string[];
  url: string;
}

const ProjectsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectsVars.map((project: Project) => (
        <motion.div
          key={project.title}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
          
          <div className="flex flex-wrap space-x-2 mb-4">
            {project.icons.map((iconName) => {
              const IconComponent = (Icons as any)[iconName];
              return IconComponent ? (
                <IconComponent key={iconName} className="text-xl" />
              ) : null;
            })}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black inline-flex items-center"
            >
              <FiGithub className="mr-1" /> GitHub
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;