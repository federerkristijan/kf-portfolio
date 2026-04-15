'use client'

import { FC } from 'react';
import { heroSection, aboutVars, quote, projectsTitles } from '@/utils/variables';
import ProjectsGrid from '@/components/ui/ProjectsGrid';

const HomePage: FC = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="py-12">
        <h1 className="text-4xl font-bold">{heroSection.title}</h1>
        <p className="mt-4 text-xl">{heroSection.subtitle}</p>
      </header>
      <section className="py-12">
        <h2 className="text-3xl font-semibold">{aboutVars.title}</h2>
        <p className="mt-2">{aboutVars.description}</p>
      </section>
      <section className="py-12">
        <h2 className="text-3xl font-semibold">{projectsTitles.title}</h2>
        <p className="mt-2">{projectsTitles.subtitle}</p>
        <ProjectsGrid />
      </section>
      <footer className="py-8">
        <p className="text-lg italic">"{quote}"</p>
      </footer>
    </div>
  );
};

export default HomePage;
