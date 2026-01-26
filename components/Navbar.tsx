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
      className={`no-underline text-sm uppercase tracking-wider transition-opacity duration-300 hover:opacity-70 hover:text-custom ${
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
      className="no-underline transition-opacity duration-300 hover:opacity-70 hover:text-custom"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShuffleText text={children} isHovered={isHovered} />
    </Link>
  );
};

// Animated Menu Button Component
const AnimatedMenuButton = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-7 h-7 flex items-center justify-center cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100"
        height="100"
        className="w-full h-full"
      >
        <g>
          <g
            style={{
              transform: isOpen
                ? "rotate(45deg) translate(42.4px, 59.9px)"
                : "rotate(0deg) translate(37.7px, 35px)",
              transformOrigin: "50px 50px",
              transition: "transform 0.3s ease",
            }}
          >
            <rect
              x="-50"
              y="-5"
              width="100"
              height="10"
              fill="currentColor"
              rx="5"
            />
          </g>
          <g
            style={{
              opacity: isOpen ? 0 : 1,
              transform: "translate(37.7px, 51.6px)",
              transformOrigin: "50px 50px",
              transition: "opacity 0.2s ease",
            }}
          >
            <rect
              x="-50"
              y="-5"
              width="100"
              height="10"
              fill="currentColor"
              rx="5"
            />
          </g>
          <g
            style={{
              transform: isOpen
                ? "rotate(-45deg) translate(40.1px, 42.4px)"
                : "rotate(0deg) translate(37.7px, 68.2px)",
              transformOrigin: "50px 50px",
              transition: "transform 0.3s ease",
            }}
          >
            <rect
              x="-50"
              y="-5"
              width="100"
              height="10"
              fill="currentColor"
              rx="5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// Menu Link with Image
interface MenuLinkItemProps {
  href: string;
  number: string;
  text: string;
  imageUrl?: string;
  alignRight?: boolean;
  onClick?: () => void;
}

const MenuLinkItem = ({
  href,
  number,
  text,
  imageUrl,
  alignRight = false,
  onClick,
}: MenuLinkItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="block py-6 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`flex items-center gap-4 ${
          alignRight ? "flex-row-reverse" : ""
        }`}
      >
        {imageUrl && (
          <div
            className="w-20 h-20 overflow-hidden rounded-lg transition-transform duration-300"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <img
              src={imageUrl}
              alt={text}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="text-xl opacity-40 min-w-[3rem]">{number}</div>
        <div className="text-3xl font-light tracking-wide transition-opacity duration-300 group-hover:opacity-70">
          {text}
        </div>
      </div>
    </Link>
  );
};

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "America/Toronto",
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

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="p-8 md:px-12 z-50 relative ">
        <div className="flex items-center justify-between">
          {/* Left Section - Social Links */}
          <div className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider">
            <Link className="hover:text-custom" href="https://x.com/ayavasu">
              X
            </Link>
            <span className="opacity-30">/</span>
            <SocialLink href="https://github.com/ayastaga">Github</SocialLink>
            <span className="opacity-30">/</span>
            <SocialLink href="https://www.linkedin.com/in/agastya-sharma-uw/">
              LinkedIn
            </SocialLink>
            <span className="opacity-30">/</span>
            <SocialLink href="./resume.pdf">CV</SocialLink>
          </div>
          <div className="flex md:hidden"></div>

          {/* Center - Time */}
          <div className="text-xs sm:text-sm uppercase tracking-wider opacity-90 absolute left-1/2 -translate-x-1/2">
            Toronto {currentTime}
            <div className="lowercase">- a full stack developer -</div>
          </div>

          {/* Right Section - Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" isActive={true}>
              Home
            </NavLink>
            <NavLink href="/work">Work</NavLink>
            <NavLink href="mailto:a764shar@uwaterloo.ca">Contact</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              className="p-2 -mr-2 z-[60]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatedMenuButton isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-black text-white z-50 transform transition-transform duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-8 md:px-12">
            <button
              className="p-2 -mr-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <AnimatedMenuButton isOpen={isMenuOpen} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col font-ppmontreal">
            {/* Menu Header */}
            <div className="mb-8">
              <h2 className="text-9xl font-light tracking-tight font-instrumentserif">
                Menu
              </h2>
            </div>

            {/* Menu Links */}
            <div className="space-y-2 flex-grow">
              <MenuLinkItem
                href="/"
                number="01"
                text="Home"
                imageUrl="/photo1.jpg"
                alignRight={true}
                onClick={() => setIsMenuOpen(false)}
              />
              <MenuLinkItem
                href="/work"
                number="02"
                text="Work"
                imageUrl="/utrahacks.jpg"
                onClick={() => setIsMenuOpen(false)}
              />
              <MenuLinkItem
                href="/resume.pdf"
                number="03"
                text="Resume"
                alignRight={true}
                imageUrl="/resume-photo.png"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            {/* Menu Footer */}
            <div className="mt-auto pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="opacity-60 leading-relaxed">
                    Waterloo, Ontario
                    <br />
                    Canada
                  </p>
                </div>
                <div className="space-y-2">
                  <a
                    href="mailto:a764shar@uwaterloo.ca"
                    className="block hover:opacity-70 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    → Email
                  </a>
                  <a
                    href="https://x.com/ayavasu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-70 transition-opacity"
                  >
                    → X/Twitter
                  </a>
                  <a
                    href="https://www.linkedin.com/in/agastya-sharma-uw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-70 transition-opacity"
                  >
                    → LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
