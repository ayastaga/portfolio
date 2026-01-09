"use client";
import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface TooltipPosition {
  left: number;
  top: number;
}

interface CursorDotProps {
  position: TooltipPosition;
  visible: boolean;
  isOnLink: boolean;
  isClicking: boolean;
}

const CursorDot: React.FC<CursorDotProps> = ({
  position,
  visible,
  isOnLink,
  isClicking,
}) => {
  const [positionX, setPositionX] = useState(position.left);
  const [positionY, setPositionY] = useState(position.top);

  useEffect(() => {
    setPositionX(position.left);
    setPositionY(position.top);
  }, [position.left, position.top]);

  return (
    <motion.div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        left: positionX,
        top: positionY,
        x: "-50%",
        y: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
    >
      <motion.div
        animate={{
          width: isOnLink ? "32px" : "12px",
          height: isOnLink ? "32px" : "12px",
          opacity: isClicking ? 1 : isOnLink ? 0.4 : 1,
          background: isClicking ? "#ff5733" : "#ff5733",
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        style={{
          borderRadius: "999px",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
};

// Global Mouse Tracker Provider
const GlobalMouseTracker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = useState<TooltipPosition>({
    left: 0,
    top: 0,
  });
  const [visible, setVisible] = useState(false);
  const [isOnLink, setIsOnLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ left: e.clientX, top: e.clientY });
      setVisible(true);

      // Check if hovering over a link
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      setIsOnLink(!!link);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {children}
      <CursorDot
        position={position}
        visible={visible}
        isOnLink={isOnLink}
        isClicking={isClicking}
      />
    </>
  );
};

export default GlobalMouseTracker;
