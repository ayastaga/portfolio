"use client";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<number[][] | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  // Optimized Game of Life
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cellSize = 8;
    let cols: number, rows: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.floor(rect.width / cellSize);
      rows = Math.floor(rect.height / cellSize);

      // Initialize with sparse random pattern for elegance
      gridRef.current = Array(rows)
        .fill(null)
        .map(() =>
          Array(cols)
            .fill(null)
            .map(() => (Math.random() < 0.15 ? 1 : 0)),
        );
    };

    resize();
    window.addEventListener("resize", resize);

    const countNeighbors = (grid: number[][], x: number, y: number): number => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const row = (y + i + rows) % rows;
          const col = (x + j + cols) % cols;
          count += grid[row][col];
        }
      }
      return count;
    };

    const update = () => {
      if (!isAnimating || !gridRef.current) return;

      const grid = gridRef.current;
      const next = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(0));

      // Only update cells that could possibly change (optimization)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const neighbors = countNeighbors(grid, x, y);
          const cell = grid[y][x];

          if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
            next[y][x] = 1;
          } else if (cell === 0 && neighbors === 3) {
            next[y][x] = 1;
          }
        }
      }

      gridRef.current = next;
    };

    const draw = () => {
      if (!gridRef.current) return;

      // Clear with black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grid = gridRef.current;

      // Draw cells with fade effect
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y][x] === 1) {
            const opacity = 0.15;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillRect(
              x * cellSize,
              y * cellSize,
              cellSize - 1,
              cellSize - 1,
            );
          }
        }
      }
    };

    let lastUpdate = 0;
    const updateInterval = 75; // ms between updates

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate > updateInterval) {
        update();
        lastUpdate = timestamp;
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  const links = [
    { label: "Work", href: "/work" },
    { label: "Photography", href: "https://vsco.co/ayastaga" },
    { label: "Music", href: "http://soundcloud.com/aeiwon/" },
    { label: "Contact", href: "mailto:a764shar@uwaterloo.ca" },
  ];

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden font-ppmontreal mt-10">
      {/* Conway's Game of Life Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isAnimating ? 0.7 : 0, transition: "opacity 0.5s" }}
      />

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extralight tracking-tight font-instrumentserif">
                  HELLO!
                </h2>
              </div>

              <p className="font-mono text-xs text-gray-400 max-w-md font-light leading-relaxed">
                You made it to the footer! So here's a bit more about me; I'm a
                creative and I love to push the bounds of what's possible; that
                means comiing up with new, bold, innovative solutions and making
                them look <b className="font-extrabold">good</b>. If you wanna
                reach out to me, contact me via any of my socials. Thank you for
                checking out my website!
              </p>

              {/* Toggle button */}
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="group flex items-center gap-3 text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                <div className="relative w-10 h-5 bg-white/10 rounded-full transition-colors duration-300 group-hover:bg-white/20">
                  <div
                    className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                    style={{
                      transform: isAnimating
                        ? "translateX(20px)"
                        : "translateX(0)",
                    }}
                  />
                </div>
                <span className="font-mono">
                  {isAnimating ? "SIMULATION ON" : "SIMULATION OFF"}
                </span>
              </button>
            </div>

            {/* Right section - Navigation */}
            <div className="space-y-1">
              {links.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group block"
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <div className="flex items-center justify-between py-4 sm:py-5 border-b border-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:pl-2 hover:text-custom">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        0{i + 1}
                      </span>
                      <span className="text-2xl sm:text-3xl font-light tracking-tight">
                        {link.label}
                      </span>
                    </div>

                    <svg
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <ArrowRight />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
