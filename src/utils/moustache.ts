'use client';

import { useEffect, useState } from "react";

export const useMoustacheRotation = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Rotate left and right slowly
      setRotation((prevRotation) => (prevRotation >= 0 ? -5 : 5));
    }, 3000);

    const pauseIntervalId = setInterval(() => {
      clearInterval(intervalId);
      setTimeout(() => {
        const newIntervalId = setInterval(() => {
          setRotation((prevRotation) => (prevRotation >= 0 ? -5 : 5));
        }, 2000);

        setTimeout(() => {
          clearInterval(newIntervalId);
        }, 2000);
      }, 10000);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearInterval(pauseIntervalId);
    };
  }, []);

  return rotation;
};

