"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

// Project type definition
interface Project {
  title: string;
  subtitle: string;
  href: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  aspectRatio: string;
}

// Individual project card component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <MotionLink
      href={project.href}
      target="_blank"
      className="group block transition-all duration-300 ease-in-out"
      whileHover={{ opacity: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-2">
        <div
          className="relative w-full border border-foreground/10 overflow-hidden box-border transition-all duration-300 ease-in-out"
          style={{ aspectRatio: project.aspectRatio }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {project.mediaType === "video" ? (
              <video
                src={project.mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover scale-[1.02] transition-opacity duration-500 ease-in-out"
              />
            ) : (
              <Image
                src={project.mediaSrc}
                alt={project.title}
                fill
                className="object-cover scale-[1.02] transition-opacity duration-500"
                sizes="100vw"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-background/0 transition-colors duration-300 ease-in-out group-hover:bg-background/40" />
        </div>
        <div className="flex flex-col justify-between gap-0.5 mt-1 transition-colors duration-300 ease-in-out lg:flex-row">
          <h3
            className="text-[17px] overflow-hidden text-foreground"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.title}
          </h3>
          <h4
            className="transition-colors duration-300 ease-in-out text-[15px] overflow-hidden text-muted-foreground"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.subtitle}
          </h4>
        </div>
      </div>
    </MotionLink>
  );
};

export function BentoGrid1() {
  const projects: Project[] = [
    {
      title:
        "Creating a platform to manage your mental health at a touch of a button.",
      subtitle: "MentaLink ",
      href: "https://pitch.com/v/tu20---the-golden-parachutes---mentalink-hq6mvs",
      mediaType: "video",
      mediaSrc: "./Mentalink.mp4",
      aspectRatio: "16/9",
    },
    {
      title: "Counting calories just got smarter - and sexier.",
      subtitle: "NutriSmart (Work)",
      href: "https://devpost.com/software/serviceswap",
      mediaType: "video",
      mediaSrc: "./Nutrismart.mp4",
      aspectRatio: "8/5",
    },
    {
      title:
        "Dashboard for music-junkies who love to know everything about their music",
      subtitle: "Ecoute",
      href: "https://github.com/ayastaga/Ecoute",
      mediaType: "video",
      mediaSrc: "./ecoute.mp4",
      aspectRatio: "10/7",
    },
    {
      title:
        "A memory-support system for dementia patients powered by voice, vision, and AI",
      subtitle: "Memento",
      href: "https://devpost.com/software/memento-9j2ny3",
      mediaType: "video",
      mediaSrc: "/memento.mp4",
      aspectRatio: "16/8",
    },
    {
      title:
        "An IR & Ultrasonic Sensor obstacle avoider and path finding robot.",
      subtitle: "UTRA Challenges",
      href: "https://devpost.com/software/av-challenge-the-akatsuki",
      mediaType: "image",
      mediaSrc: "/utrahacks.jpg",
      aspectRatio: "16/8",
    },
    {
      title:
        "A peer-to-peer platform where users exchange services without money.",
      subtitle: "ServiceSwap",
      href: "https://nutrismart-liard.vercel.app/",
      mediaType: "video",
      mediaSrc: "./ServiceSwap.mp4",
      aspectRatio: "10/7",
    },
  ];

  // Split projects into two columns
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="mt-10">
      <div className="px-4 md:px-8 lg:px-15 mx-auto">
        <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {leftColumn.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {rightColumn.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
