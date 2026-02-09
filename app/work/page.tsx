"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import TechStack from "@/components/TechStack";

gsap.registerPlugin(ScrollTrigger);

const MotionLink = motion(Link);

interface Project {
  title: string;
  subtitle: string;
  href: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  aspectRatio: string;
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 60,
        },
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
    }
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
                  alt={project.title}
                  fill
                  className="object-cover scale-[1.02] transition-opacity duration-500"
                  sizes="100vw"
                />
              )}
            </div>
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
              className="transition-colors duration-300 ease-in-out text-[15px]  text-muted-foreground"
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
    </div>
  );
};

function BentoGrid1() {
  const projects: Project[] = [
    {
      title:
        "A platform to manage your mental health at the touch of a button.",
      subtitle: "MentaLink ",
      href: "https://pitch.com/v/tu20---the-golden-parachutes---mentalink-hq6mvs",
      mediaType: "video",
      mediaSrc: "./Mentalink.mp4",
      aspectRatio: "16/9",
    },
    {
      title: "Counting calories just got smarter - and sexier.",
      subtitle: "Nutrasmart (Work)",
      href: "https://nutrismart-liard.vercel.app/",
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
      subtitle: "UTRA ",
      href: "https://devpost.com/software/av-challenge-the-akatsuki",
      mediaType: "image",
      mediaSrc: "/utrahacks.jpg",
      aspectRatio: "16/8",
    },
    {
      title: "A platform where users exchange services without money.",
      subtitle: "ServiceSwap",
      href: "https://devpost.com/software/serviceswap",
      mediaType: "video",
      mediaSrc: "./ServiceSwap.mp4",
      aspectRatio: "10/7",
    },
    {
      title: "Model for predicting oil prices with Linear Regression",
      subtitle: "Personal Project",
      href: "https://github.com/ayastaga/oil-prediction-model/",
      mediaType: "image",
      mediaSrc: "/oilPrediction.png",
      aspectRatio: "10/7",
    },
    {
      title: "A smart & efficient way to organize your files into folders",
      subtitle: "FileOrganizer",
      href: "https://github.com/ayastaga/file-organizer/",
      mediaType: "image",
      mediaSrc: "/fileOrganizer.png",
      aspectRatio: "10/7",
    },
  ];

  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="my-12">
      <div className="px-4 md:px-8 lg:px-15 mx-auto">
        <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {leftColumn.map((project, index) => (
              <ProjectCard key={index} project={project} index={index * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {rightColumn.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index * 2 + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorkComponent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
        },
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
    }

    // Animate table container
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        {
          opacity: 0,
          x: 30,
        },
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

    // Animate table rows with stagger
    rowRefs.current.forEach((row, index) => {
      if (row) {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            x: -20,
          },
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
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full mt-5">
      <div className="text-7xl sm:text-8xl md:text-9xl font-instrumentserif flex mx-auto w-fit mb-5">
        Work & Projects
      </div>

      <div className="flex px-4 md:px-8 lg:px-15 mx-auto  flex-row items-center justify-between gap-8 lg:gap-10">
        {/* Table */}
        <div
          ref={tableRef}
          className="flex-1 object-center font-ppmontreal max-w-2xl lg:max-w-none w-full"
        >
          <div className="w-full">
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
                  <th className="px-0 py-3 text-left font-normal text-sm">
                    Year
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  ref={(el) => {
                    rowRefs.current[0] = el;
                  }}
                  className="border-b border-foreground/10 transition-all duration-200 hover:bg-black hover:text-white group cursor-pointer"
                >
                  <td className="px-0 py-4 align-top transition-transform duration-200 group-hover:translate-x-5">
                    <Link
                      href="https://sylphiaconsulting.com/"
                      target="_blank"
                      className="
                      inline-flex items-center gap-1
                      whitespace-nowrap
                      w-fit
                      text-base
                      hover:text-custom
                    "
                    >
                      Sylphia Consulting Inc.
                      <ArrowUpRight className="shrink-0" />
                    </Link>
                  </td>

                  <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                    <p className="text-base">Software Development Intern</p>
                  </td>
                  <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                    <p className="text-base">Toronto, Remote</p>
                  </td>
                  <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                    <p className="text-base">2025</p>
                  </td>
                </tr>

                <tr
                  ref={(el) => {
                    rowRefs.current[1] = el;
                  }}
                  className="border-b border-foreground/10 transition-all duration-200 hover:bg-black hover:text-white group cursor-pointer"
                >
                  <td className="px-0 py-4 align-top transition-transform duration-200 group-hover:translate-x-5">
                    <Link
                      href="http://steelcitycodes.org/"
                      target="_blank"
                      className="
                        inline-flex items-center gap-1
                        whitespace-nowrap
                        w-fit
                        text-base
                        hover:text-custom
                      "
                    >
                      Steel City Codes Ontario
                      <ArrowUpRight className="shrink-0" />
                    </Link>
                  </td>
                  <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                    <p className="text-base">
                      Founder & Lead Eductional Instructor
                    </p>
                  </td>
                  <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                    <p className="text-base">Brampton, Remote</p>
                  </td>
                  <td className="px-0 py-4 align-top group-hover:translate-x-5 transition-transform duration-200">
                    <p className="text-base">2024</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BentoGrid1 />
    </div>
  );
}
