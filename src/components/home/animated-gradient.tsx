"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface AnimatedGradientProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  lightGradient?: string;
  darkGradient?: string;
}

export function AnimatedGradient({
  children,
  className = "",
  lightGradient = "from-blue-50 via-indigo-100 to-purple-50",
  darkGradient = "from-blue-950 via-indigo-950 to-purple-950",
  ...props
}: AnimatedGradientProps) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${lightGradient} dark:${darkGradient} ${className}`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

