"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);

interface TrailImage {
  id: number;
  src: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  zIndex: number;
  width: number;
  height: number;
}

export default function Home() {
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [trailEnabled, setTrailEnabled] = useState(true);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLSpanElement | null>(null);
  const aboutTextRef = useRef<HTMLParagraphElement | null>(null);
  const aboutListRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const cachMousePosRef = useRef({ x: 0, y: 0 });
  const imgPositionRef = useRef(0);
  const zIndexRef = useRef(1);
  const animationFrameRef = useRef<number | null>(null);
  const isMouseInsideRef = useRef(false);

  const carouselImages = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
    "/photo5.jpg",
    "/photo6.jpg",
  ];

  const trailImageSources = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
    "/photo5.jpg",
  ];

  const imageWidths = [180, 220, 160, 200, 190];

  // Load GSAP from CDN
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // GSAP entrance animations - Staggered fade-up style
  useEffect(() => {
    if (!gsapLoaded || typeof window.gsap === "undefined") return;

    const gsap = window.gsap;

    // Collect all text elements to animate
    const textElements = [
      carouselRef.current,
      heroTextRef.current,
      aboutTextRef.current,
      aboutListRef.current,
    ].filter(Boolean);

    // Apply staggered animation
    gsap.fromTo(
      textElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "sine.out",
        stagger: 0.2,
      },
    );
  }, [gsapLoaded]);

  // Carousel effect - rapid montage
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselImage((prev) => (prev + 1) % carouselImages.length);
    }, 300);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Mouse tracking - only within Hero container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroContainerRef.current) return;

      const rect = heroContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        isMouseInsideRef.current = true;
        mousePosRef.current = { x, y };
      } else {
        isMouseInsideRef.current = false;
      }
    };

    const handleMouseLeave = () => {
      isMouseInsideRef.current = false;
    };

    const container = heroContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Image trail effect
  useEffect(() => {
    if (!trailEnabled) return;

    const threshold = 100;

    const render = () => {
      if (!isMouseInsideRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const mousePos = mousePosRef.current;
      const lastMousePos = lastMousePosRef.current;
      const cacheMousePos = cachMousePosRef.current;

      const dist = distance(
        mousePos.x,
        mousePos.y,
        lastMousePos.x,
        lastMousePos.y,
      );

      cacheMousePos.x = lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
      cacheMousePos.y = lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

      if (dist > threshold) {
        const imgIndex = imgPositionRef.current;
        const id = Date.now() + Math.random();
        const imageWidth = imageWidths[imgIndex];
        const imageHeight = Math.round(imageWidth * 0.67);

        setTrailImages((prev) => [
          ...prev,
          {
            id,
            src: trailImageSources[imgIndex],
            startX: cacheMousePos.x,
            startY: cacheMousePos.y,
            endX: mousePos.x,
            endY: mousePos.y,
            zIndex: zIndexRef.current,
            width: imageWidth,
            height: imageHeight,
          },
        ]);

        setTimeout(() => {
          setTrailImages((prev) => prev.filter((img) => img.id !== id));
        }, 1000);

        zIndexRef.current++;
        imgPositionRef.current =
          (imgPositionRef.current + 1) % trailImageSources.length;
        lastMousePosRef.current = { ...mousePos };
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trailEnabled]);

  return (
    <div
      ref={heroContainerRef}
      className="items-center relative overflow-hidden"
    >
      {/* Trail Toggle Button */}
      <button
        onClick={() => setTrailEnabled(!trailEnabled)}
        className="absolute top-50 z-20 p-2 px-4 bg-custom text-white text-sm hover:bg-black transition-colors duration-200 whitespace-nowrap hidden md:block"
        style={{ writingMode: "vertical-rl" }}
      >
        {trailEnabled ? "Disable Trail" : "Enable Trail"}
      </button>

      <div className="hidden md:flex absolute inset-0 pointer-events-none z-10">
        {trailImages.map((img) => (
          <TrailImage
            key={img.id}
            src={img.src}
            startX={img.startX}
            startY={img.startY}
            endX={img.endX}
            endY={img.endY}
            zIndex={img.zIndex}
            width={img.width}
            height={img.height}
          />
        ))}
      </div>

      {/* Carousel */}
      <div ref={carouselRef}>
        <div className="md:hidden w-full max-w-xs mx-auto aspect-square relative overflow-hidden">
          {carouselImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
              style={{
                opacity: currentCarouselImage === index ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero text */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none z-0">
        <span
          ref={heroTextRef}
          style={{
            fontSize: "clamp(48px, 35vw, 500px)",
            marginTop: "-10vw",
          }}
          className="font-instrumentserif font-medium text-black leading-[1.4] tracking-[-0.02em] whitespace-nowrap sm:mt-0"
        >
          agastya
        </span>
      </div>

      {/* About me */}
      <div className="flex gap-6 mb-5 items-end justify-between mt-[-1vh] font-ppmontreal max-w-[82%] mx-auto ">
        <p
          ref={aboutTextRef}
          className="max-w-3xl text-xl md:text-3xl lg:text-4xl"
        >
          I'm a 1st year CS student @ the University of Waterloo. I'm a
          full-stack developer & product designer based in Toronto.
        </p>
        <Link
          href="/work"
          className="
    group relative inline-flex items-center
    transition-all duration-500 ease-out
  "
        >
          {/* Tooltip (xs / sm / md only) */}
          <span
            className="
      pointer-events-none
      absolute -top-15 left-1/2 -translate-x-1/2
      text-lg tracking-wide
      opacity-0 translate-y-1
      transition-all duration-300 ease-out
      group-hover:opacity-100 group-hover:translate-y-0
      xl:hidden
    "
          >
            view work
          </span>

          {/* MOBILE / TABLET */}
          <div
            className="
      relative
      flex items-center justify-center
      size-14
      rounded-full
      bg-black text-white
      transition-all duration-300
      xl:hidden
    "
          >
            <ArrowUpRight
              size={22}
              className="
        transition-transform duration-300
        group-hover:translate-x-0.5 group-hover:-translate-y-0.5
      "
            />
          </div>

          {/* DESKTOP (LG+) — UNCHANGED BEHAVIOR */}
          <div
            className="
      hidden xl:flex items-center gap-3
      px-4 py-2
      text-4xl font-medium
      transition-all duration-500
      group-hover:px-6
      group-hover:bg-black
      group-hover:text-white
      rounded-full
    "
          >
            <span
              className="
        transition-transform duration-500
        group-hover:translate-x-1
      "
            >
              view work
            </span>

            <ArrowUpRight
              size={26}
              className="
        transition-transform duration-500
        group-hover:translate-x-2
      "
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

interface TrailImageProps {
  src: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  zIndex: number;
  width: number;
  height: number;
}

function TrailImage({
  src,
  startX,
  startY,
  endX,
  endY,
  zIndex,
  width,
  height,
}: TrailImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const initialX = startX;
    const initialY = startY - height;
    const finalX = endX;
    const finalY = endY - height;

    img.style.opacity = "1";
    img.style.transform = `translate(${initialX}px, ${initialY}px) scale(1)`;
    img.style.zIndex = zIndex.toString();

    requestAnimationFrame(() => {
      if (img) {
        img.style.transition = "transform cubic-bezier(0.16, 1, 0.3, 1)";
        img.style.transform = `translate(${finalX}px, ${finalY}px)`;
      }
    });
  }, [startX, startY, endX, endY, zIndex, width, height]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className="absolute top-0 left-0 object-cover"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        willChange: "transform",
      }}
    />
  );
}
