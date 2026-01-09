"use client";
import { useState, useEffect, useRef } from "react";

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

export default function Hero() {
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const cachMousePosRef = useRef({ x: 0, y: 0 });
  const imgPositionRef = useRef(0);
  const zIndexRef = useRef(1);
  const animationFrameRef = useRef<number | null>(null);
  const isMouseInsideRef = useRef(false);

  const carouselImages = [
    {
      src: "https://framerusercontent.com/images/9IrnqqHDGkmjwVpO2gXJEbmzw.webp",
      alt: "Anima Living - Website",
    },
    {
      src: "https://framerusercontent.com/images/ofNaiar0bc46xwVZM81rI8VXY.webp",
      alt: "",
    },
    {
      src: "https://framerusercontent.com/images/hMPfPz4iRpvRUPKPnGlcOZd3Dw8.webp",
      alt: "Montara",
    },
    {
      src: "https://framerusercontent.com/images/4rsUkom5pHxkWnsQQyMEIDlcf9Y.webp",
      alt: "",
    },
    {
      src: "https://framerusercontent.com/images/HryqSRkpOCZBVmcFknsqqNX59ZQ.webp",
      alt: "",
    },
  ];

  const trailImageSources = [
    "https://framerusercontent.com/images/9IrnqqHDGkmjwVpO2gXJEbmzw.webp",
    "https://framerusercontent.com/images/ofNaiar0bc46xwVZM81rI8VXY.webp",
    "https://framerusercontent.com/images/hMPfPz4iRpvRUPKPnGlcOZd3Dw8.webp",
    "https://framerusercontent.com/images/4rsUkom5pHxkWnsQQyMEIDlcf9Y.webp",
    "https://framerusercontent.com/images/HryqSRkpOCZBVmcFknsqqNX59ZQ.webp",
  ];

  const imageWidths = [180, 220, 160, 200, 190];

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking - only within Hero container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroContainerRef.current) return;

      const rect = heroContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is inside the container
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
    const threshold = 100;

    const render = () => {
      // Only create trails if mouse is inside the container
      if (!isMouseInsideRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const mousePos = mousePosRef.current;
      const lastMousePos = lastMousePosRef.current;
      const cacheMousePos = cachMousePosRef.current;

      // Calculate distance
      const dist = distance(
        mousePos.x,
        mousePos.y,
        lastMousePos.x,
        lastMousePos.y
      );

      // Lerp cache position
      cacheMousePos.x = lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
      cacheMousePos.y = lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

      // Show next image if threshold exceeded
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
  }, []);

  return (
    <div ref={heroContainerRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-">
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

      {/* Hero text */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none z-0">
        <span
          className="font-instrumentserif font-medium text-black leading-[1.4] tracking-[-0.02em] whitespace-nowrap"
          style={{
            fontSize: "clamp(48px, 40vw, 500px)",
          }}
        >
          agastya
        </span>
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
        img.style.transition = "transform 2s cubic-bezier(0.16, 1, 0.3, 1)";
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
