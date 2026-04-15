'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt } from 'react-icons/fa';

interface MobileHeroSectionProps {
  title: string;
  subtitle: string;
}

const MobileHeroSection: FC<MobileHeroSectionProps> = ({ title, subtitle }) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-b from-blue-500 to-purple-600">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaMobileAlt className="text-white text-6xl mb-4" />
        <h1 className="text-white text-4xl font-bold">{title}</h1>
        <p className="text-white mt-4">{subtitle}</p>
      </motion.div>
    </section>
  );
};

export default MobileHeroSection;