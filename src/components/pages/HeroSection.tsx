'use client';

import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-4">
        <h1 className="w-full">{renderHeaderName()}</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl">{subtitle}</h2>
        <p className="text-base sm:text-lg md:text-xl max-w-md">
          I write clean code to create quality applications with intuitive user
          experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button href="/about">Discover a Talent</Button>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-8 hidden md:block w-full lg:w-1/2">
        <Image
          src={Foto}
          alt="Kristijan Federer"
          width={500}
          height={600}
          className="rounded-xl w-80 sm:w-96 md:w-104 lg:w-120 mx-auto"
          priority
        />
      </div>
    </div>
  );
};

export default HeroSection;