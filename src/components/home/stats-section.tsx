"use client";

import { motion } from "framer-motion";
import { Users, Building2, Briefcase } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";
import { ScrollReveal } from "./scroll-reveal";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Nhân viên tài năng",
    icon: Users,
    delay: 0,
  },
  {
    value: 5,
    suffix: "",
    label: "Văn phòng tại Việt Nam",
    icon: Building2,
    delay: 0.2,
  },
  {
    value: 50,
    suffix: "+",
    label: "Vị trí đang tuyển",
    icon: Briefcase,
    delay: 0.4,
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={index} delay={stat.delay}>
                <motion.div
                  className="text-center space-y-4 p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -8 }}
                >
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl font-bold text-blue-600 dark:text-blue-400"
                  />
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

