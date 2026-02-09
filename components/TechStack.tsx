import React, { useState } from "react";

interface TechItem {
  name: string;
  logo: string;
  width: number;
  height: number;
  invert?: boolean;
}

const TechStackGrid: React.FC = () => {
  const [highlightStyle, setHighlightStyle] = useState({
    transform: "translate(0px, 0px)",
    width: "0px",
    height: "0px",
    opacity: 0,
  });

  const topRowTechs: TechItem[] = [
    {
      name: "React",
      logo: "/images/svg/react-logo.svg",
      width: 90,
      height: 90,
    },
    {
      name: "Next.js",
      logo: "/images/svg/nextjs-logotype-light-background.svg",
      width: 150,
      height: 150,
    },
    {
      name: "TypeScript",
      logo: "/images/svg/typescript-logo.svg",
      width: 70,
      height: 70,
    },
  ];

  const bottomRowTechs: TechItem[] = [
    {
      name: "GSAP",
      logo: "/images/svg/gsap-black.svg",
      width: 80,
      height: 80,
    },
    {
      name: "Motion",
      logo: "/images/svg/motion.svg",
      width: 80,
      height: 80,
    },
    {
      name: "TailwindCSS",
      logo: "/images/svg/tailwindcss-logo.svg",
      width: 70,
      height: 70,
    },
    {
      name: "Supabase",
      logo: "/images/svg/supabase-logo.svg",
      width: 50,
      height: 50,
    },
    {
      name: "Vercel",
      logo: "/images/svg/vercel-logotype-light.svg",
      width: 90,
      height: 90,
    },
    {
      name: "Figma",
      logo: "/images/svg/figma-logo.svg",
      width: 60,
      height: 60,
    },
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const container = element.closest(".relative");
    const containerRect = container?.getBoundingClientRect();

    if (containerRect) {
      setHighlightStyle({
        transform: `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative container mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-rows-2">
        {/* Top Row */}
        <div className="grid grid-cols-3 border-b border-neutral-300 h-[clamp(200px,20vw,400px)]">
          {topRowTechs.map((tech, index) => (
            <a
              key={tech.name}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center px-6 cursor-pointer ${
                index < topRowTechs.length - 1
                  ? "border-r border-neutral-300"
                  : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                width={tech.width}
                height={tech.height}
                className="z-10 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
              />
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-flow-col auto-cols-fr h-[clamp(200px,15vw,400px)]">
          {bottomRowTechs.map((tech, index) => (
            <a
              key={tech.name}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center px-6 cursor-pointer ${
                index < bottomRowTechs.length - 1
                  ? "border-r border-neutral-300"
                  : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center justify-center w-full max-w-[120px]">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  width={tech.width}
                  height={tech.height}
                  className="z-10 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Hover Highlight */}
      <div
        className="hidden lg:block absolute top-0 left-0 bg-neutral-900 pointer-events-none transition-all duration-300"
        style={highlightStyle}
      />
    </div>
  );
};

export default TechStackGrid;
