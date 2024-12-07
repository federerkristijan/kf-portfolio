"use client";

import { Project } from "@/types/global";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as ReactIcons from "react-icons";

const Carousel = ({ projects }: { projects: Project[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (ReactIcons as any)[iconName];
    return IconComponent ? <IconComponent key={iconName} /> : null;
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container relative">
        <button
          onClick={prevProject}
          className="carousel-button prev absolute left-0 top-1/2 -translate-y-1/2"
          aria-label="Previous project"
        >
          &lt;
        </button>
        <div className="project-card mx-auto">
          <h3 className="project-title text-center text-lg font-semibold">
            {projects[currentIndex].title}
          </h3>
          <Link
            href={projects[currentIndex].url}
            target="_blank"
            rel="noreferrer"
            className="project-image-container my-4"
          >
            <Image
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              width={300}
              height={250}
              className="project-image rounded-xl w-full h-full object-cover"
            />
          </Link>
          <p className="project-description text-base px-2">
            {projects[currentIndex].description}
          </p>
          <div className="project-icons flex gap-3 text-xl justify-center mt-4">
            {projects[currentIndex].icons.map((iconName) => renderIcon(iconName))}
          </div>
        </div>
        <button
          onClick={nextProject}
          className="carousel-button next absolute right-0 top-1/2 -translate-y-1/2"
          aria-label="Next project"
        >
          &gt;
        </button>
      </div>
      <div className="carousel-dots flex justify-center mt-4">
        {projects.map((_, index) => (
          <span
            key={index}
            className={`dot w-3 h-3 rounded-full mx-1 cursor-pointer ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
