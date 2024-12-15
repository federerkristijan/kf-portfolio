"use client";

import { HeroSectionPayload } from "@/types/global";
import Image from "next/image";
import Foto from "@/assets/CV Foto Glasses 1 - Edited 1.png";
import { Button } from "@/components/ui/Button";

export const MobileHeroSection = ({ subtitle }: HeroSectionPayload) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-8 text-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-wider">
          Kristijan
          <br />
          Federer
        </h1>

        <p className="text-base max-w-[300px] mx-auto">
          I write clean code to create quality applications with intuitive user experience.
        </p>

        <Image
          src={Foto}
          alt="Kristijan Federer"
          width={200}
          height={200}
          className="rounded-full mx-auto my-6"
          priority
        />

        <div className="flex flex-col gap-4">
          <Button href="/about">Discover a Talent</Button>
          <Button className="button2" href="/projects">
            See Projects
          </Button>
        </div>
      </div>
    </div>
  );
};
