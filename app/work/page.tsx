"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import {
  featuredProjects,
  githubProjects,
  workExperience,
  type FeaturedProject,
  type GithubProject,
} from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const MotionLink = motion(Link);

function ProjectCard({ project }: { project: FeaturedProject }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <div ref={cardRef}>
      <MotionLink
        href={project.href}
        target="_blank"
        className="group block transition-all duration-300 ease-in-out"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
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
                  alt={project.name}
                  fill
                  className="object-cover scale-[1.02] transition-opacity duration-500"
                  sizes="100vw"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-0.5 mt-1 transition-colors duration-300 ease-in-out lg:flex-row">
            <h3 className="text-[17px] text-foreground line-clamp-2">
              {project.description}
            </h3>
            <h4 className="text-[15px] text-muted-foreground line-clamp-2 transition-colors duration-300 ease-in-out">
              {project.name}
            </h4>
          </div>
        </div>
      </MotionLink>
    </div>
  );
}

function GithubProjectCard({ project }: { project: GithubProject }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <div ref={cardRef}>
      <MotionLink
        href={project.href}
        target="_blank"
        className="group block border border-foreground/10 p-5 transition-all duration-300"
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-base font-medium text-foreground truncate">
                {project.name}
              </h3>
              <ArrowUpRight
                size={14}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <span className="text-xs text-muted-foreground/70 whitespace-nowrap mt-0.5">
            {project.language}
          </span>
        </div>
      </MotionLink>
    </div>
  );
}

function FeaturedProjectsGrid() {
  const leftColumn = featuredProjects.filter((_, i) => i % 2 === 0);
  const rightColumn = featuredProjects.filter((_, i) => i % 2 === 1);

  return (
    <section className="my-12">
      <div className="px-4 md:px-8 lg:px-15 mx-auto">
        <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {leftColumn.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {rightColumn.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section className="mb-12">
      <div className="px-4 md:px-8 lg:px-15 mx-auto">
        <h2
          ref={titleRef}
          className="text-2xl font-ppmontreal mb-6 text-muted-foreground"
        >
          More on GitHub
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {githubProjects.map((project) => (
            <GithubProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkExperienceTable() {
  if (workExperience.length === 0) return null;

  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    rowRefs.current.forEach((row, index) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <div className="flex px-4 md:px-8 lg:px-15 mx-auto flex-row items-center justify-between gap-8 lg:gap-10">
      <div
        ref={tableRef}
        className="flex-1 object-center font-ppmontreal max-w-2xl lg:max-w-none w-full"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-foreground/10 uppercase text-gray-400">
              <th className="px-0 py-3 text-left font-normal text-sm">
                Company
              </th>
              <th className="px-0 py-3 text-left font-normal text-sm">
                Title
              </th>
              <th className="px-0 py-3 text-left font-normal text-sm">
                Location
              </th>
              <th className="px-0 py-3 text-left font-normal text-sm">Year</th>
            </tr>
          </thead>
          <tbody>
            {workExperience.map((work, index) => (
              <tr
                key={`${work.company}-${work.year}`}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className="border-b border-foreground/10 transition-all duration-200 hover:bg-black hover:text-white group cursor-pointer"
              >
                <td className="px-0 py-4 align-top transition-transform duration-200 group-hover:translate-x-5">
                  <Link
                    href={work.href}
                    target="_blank"
                    className="inline-flex items-center gap-1 whitespace-nowrap w-fit text-base hover:text-custom"
                  >
                    {work.company}
                    <ArrowUpRight className="shrink-0" />
                  </Link>
                </td>
                <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                  <p className="text-base">{work.title}</p>
                </td>
                <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                  <p className="text-base">{work.location}</p>
                </td>
                <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                  <p className="text-base">{work.year}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full mt-5">
      <div
        ref={titleRef}
        className="text-7xl sm:text-8xl md:text-9xl font-instrumentserif flex mx-auto w-fit mb-5"
      >
        Work & Projects
      </div>
      <WorkExperienceTable />
      <FeaturedProjectsGrid />
      <GithubProjectsSection />
    </div>
  );
}
