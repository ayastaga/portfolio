"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

interface ShuffleTextProps {
  text: string;
  isHovered: boolean;
}

const ShuffleText = ({ text, isHovered }: ShuffleTextProps) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Kill any ongoing animation
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    if (isHovered) {
      tweenRef.current = gsap.to(textRef.current, {
        duration: 0.6,
        scrambleText: {
          text: text,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          revealDelay: 0.1,
          speed: 0.3,
        },
      });
    } else {
      // Reset to original text immediately
      if (textRef.current) {
        textRef.current.textContent = text;
      }
    }
  }, [isHovered, text]);

  return <span ref={textRef}>{text}</span>;
};

interface NavLinkProps {
  href: string;
  children: string;
  isActive?: boolean;
}

const NavLink = ({ href, children, isActive = false }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`no-underline text-sm uppercase tracking-wider transition-opacity duration-300 hover:opacity-70 ${
        isActive ? "opacity-100" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShuffleText text={children} isHovered={isHovered} />
    </Link>
  );
};

interface SocialLinkProps {
  href: string;
  children: string;
}

const SocialLink = ({ href, children }: SocialLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className=" no-underline transition-opacity duration-300 hover:opacity-70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShuffleText text={children} isHovered={isHovered} />
    </Link>
  );
};

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="p-8 md:px-12 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section - Social Links */}
        <div className="flex items-center gap-2 text-sm uppercase tracking-wider">
          <SocialLink href="https://x.com/ayavasu">X</SocialLink>
          <span className="opacity-30">/</span>
          <SocialLink href="https://github.com/ayastaga">Github</SocialLink>
          <span className="opacity-30">/</span>
          <SocialLink href="https://www.linkedin.com/in/agastya-sharma-uw/">
            LinkedIn
          </SocialLink>
          <span className="opacity-30">/</span>
          <SocialLink href="./resume.pdf">RESUME/CV</SocialLink>
        </div>

        {/* Center - Time */}
        <div className="text-sm uppercase tracking-wider opacity-90 absolute left-1/2 -translate-x-1/2">
          Toronto {currentTime}
          <div className="lowercase">- a full stack developer -</div>
        </div>

        {/* Right Section - Navigation */}
        <div className="flex items-center gap-6">
          <NavLink href="/" isActive={true}>
            Home
          </NavLink>
          <NavLink href="/work">Work</NavLink>
          <NavLink href="mailto:a764shar@uwaterloo.ca">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
