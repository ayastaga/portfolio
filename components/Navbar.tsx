"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

const ShuffleText = ({ text, isHovered }) => {
  const textRef = useRef(null);
  const tweenRef = useRef(null);

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
      textRef.current.textContent = text;
    }
  }, [isHovered, text]);

  return <span ref={textRef}>{text}</span>;
};

const NavLink = ({ href, children, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`text-white no-underline text-sm uppercase tracking-wider transition-opacity duration-300 hover:opacity-70 ${
        isActive ? "opacity-100" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShuffleText text={children} isHovered={isHovered} />
    </a>
  );
};

const SocialLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white no-underline transition-opacity duration-300 hover:opacity-70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShuffleText text={children} isHovered={isHovered} />
    </a>
  );
};

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const timeString = now.toLocaleTimeString("en-US", options);
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="p-8 md:px-12 z-50 mix-blend-difference">
      <div className="flex items-center justify-between">
        {/* Left Section - Social Links */}
        <div className="flex items-center gap-2 text-sm uppercase tracking-wider">
          <SocialLink href="https://x.com/ayavsu">Twitter</SocialLink>
          <span className="opacity-30">/</span>
          <SocialLink href="https://www.linkedin.com/in/agastya-sharma-uw/">
            LinkedIn
          </SocialLink>
        </div>

        {/* Center - Time */}
        <div className="text-sm text-white uppercase tracking-wider opacity-90 absolute left-1/2 -translate-x-1/2">
          Toronto {currentTime}
        </div>

        {/* Right Section - Navigation */}
        <div className="flex items-center gap-6">
          <NavLink href="/" isActive={true}>
            Home
          </NavLink>
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/info">Info</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
