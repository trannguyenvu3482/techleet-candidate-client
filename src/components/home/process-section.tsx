"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Search, Users, Handshake, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

const steps = [
  {
    number: 1,
    title: "Ứng tuyển",
    description: "Nộp hồ sơ trực tuyến với CV và thư xin việc",
    icon: FileText,
    delay: 0,
  },
  {
    number: 2,
    title: "Sàng lọc",
    description: "HR xem xét hồ sơ và liên hệ trong vòng 3-5 ngày",
    icon: Search,
    delay: 0.2,
  },
  {
    number: 3,
    title: "Phỏng vấn",
    description: "Phỏng vấn kỹ thuật và văn hóa công ty (1-2 vòng)",
    icon: Users,
    delay: 0.4,
  },
  {
    number: 4,
    title: "Thỏa thuận",
    description: "Thương lượng lương và điều kiện làm việc",
    icon: Handshake,
    delay: 0.6,
  },
  {
    number: 5,
    title: "Onboarding",
    description: "Chương trình đào tạo và hòa nhập 2 tuần đầu",
    icon: GraduationCap,
    delay: 0.8,
  },
];

export function ProcessSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quy trình tuyển dụng của chúng tôi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm tuyển dụng minh bạch và chuyên nghiệp
              để bạn có thể thể hiện tốt nhất khả năng của mình.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto" ref={containerRef}>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.number} delay={step.delay} direction="up">
                    <motion.div
                      className="text-center relative group"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                      <motion.h3
                        className="font-semibold text-gray-900 dark:text-white mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal delay={1}>
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thời gian trung bình từ ứng tuyển đến nhận offer:{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  10-14 ngày
                </span>
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" size="lg">
                  <Link href="/process">Tìm hiểu chi tiết quy trình</Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

