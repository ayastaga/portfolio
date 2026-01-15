"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";

const TransitionContext = createContext<boolean>(false);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  // Get page title from pathname
  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/").filter(Boolean);
    if (pathSegments.length === 0) {
      return "Home";
    }
    const title = pathSegments[pathSegments.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return title;
  };

  useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (pathname !== displayPath) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setDisplayPath(pathname);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={isTransitioning}>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={`overlay-${displayPath}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-instrumentserif text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              {getPageTitle(pathname)}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          delay: isTransitioning ? 0 : 0.2,
        }}
      >
        {children}
      </motion.div>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
