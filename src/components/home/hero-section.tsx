"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "./animated-gradient";

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "công nghệ";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <AnimatedGradient className="py-20 relative overflow-hidden min-h-[600px] flex items-center justify-center" onMouseMove={handleMouseMove}>
      {/* Mouse following spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
        animate={{ opacity: 1 }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomDuration = 10 + Math.random() * 10;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 dark:bg-blue-500/20 rounded-full"
              initial={{
                x: `${randomX}%`,
                y: `${randomY}%`,
              }}
              animate={{
                y: [`${randomY}%`, `${(randomY + 20) % 100}%`],
                x: [`${randomX}%`, `${(randomX + 15) % 100}%`],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 h-[80px]"
        >
          Xây dựng tương lai{" "}
          <span className="text-blue-600 dark:text-blue-400 inline-block min-w-[200px]">
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[2px] h-[1em] bg-blue-600 dark:bg-blue-400 ml-1 align-middle"
            />
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Tham gia đội ngũ TechLeet và cùng chúng tôi tạo ra những sản phẩm công nghệ
          đột phá, thay đổi cách thế giới làm việc.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-8"
        >
          Được tin tưởng bởi 500+ nhân viên tài năng
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/jobs" className="flex items-center">
                Xem việc làm
                <ArrowRight className="ml-2 h-8 w-8" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/about">Tìm hiểu thêm</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedGradient>
  );
}

