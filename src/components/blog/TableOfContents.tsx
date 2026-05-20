'use client';

import { useEffect, useRef, useState } from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3'));
    if (!elements.length) return;

    const tick = () => {
      let current = 0;
      const vh = window.innerHeight;
      const threshold = vh * 0.4;
      const isNearBottom = document.body.getBoundingClientRect().bottom <= vh + 50;

      elements.forEach((el, i) => {
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) current = i;
      });

      if (isNearBottom) {
        elements.forEach((el, i) => {
          const top = el.getBoundingClientRect().top;
          if (top > 0 && top < vh) current = i;
        });
      }

      setActiveIndex(current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-8 w-52 shrink-0 hidden lg:block self-start">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
        On this page
      </p>
      <ul className="space-y-4">
        {headings.map(({ id, text, level }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block text-sm py-0.5 transition-colors ${
                level === 3 ? 'pl-3' : ''
              } ${
                activeIndex === index
                  ? 'text-blue-400 font-medium'
                  : 'text-gray-500 hover:text-blue-300'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
