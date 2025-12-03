"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "./animated-gradient";

export function HeroSection() {
  return (
    <AnimatedGradient className="py-20 relative overflow-hidden">
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
          className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Xây dựng tương lai
          <span className="text-blue-600 dark:text-blue-400"> công nghệ</span>
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

