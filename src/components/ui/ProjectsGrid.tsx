'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  title: string;
  technologies: string[];
  githubUrl: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-bold mb-2">{project.title}</h2>
          <ul className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, idx) => (
              <li key={idx} className="text-sm bg-gray-200 rounded-full px-3 py-1">
                {tech}
              </li>
            ))}
          </ul>
          <Link href={project.githubUrl} passHref>
            <a className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
              <FaGithub className="mr-2" />
              View on GitHub
            </a>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}