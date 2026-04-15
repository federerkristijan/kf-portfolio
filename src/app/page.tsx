"use client";

import { HeroSection } from "@/components/pages/HeroSection";

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <HeroSection 
        title="Welcome to My Portfolio"
        subtitle="I'm Kristijan Federer, a passionate software developer."
        image="/path/to/image"
      />
    </main>
  );
};

export default Page;