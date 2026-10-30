"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Keyed by pathname so each route enters with a soft blur-to-sharp pop-in
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        // Drop filter/transform once done so fixed/sticky children aren't trapped
        transitionEnd: { filter: "none", transform: "none" },
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
