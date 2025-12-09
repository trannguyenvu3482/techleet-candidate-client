"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import type { JobPosting } from "@/lib/api";
import { ScrollReveal } from "./scroll-reveal";

interface FeaturedJobsSectionProps {
  jobs: JobPosting[];
}

export function FeaturedJobsSection({ jobs }: FeaturedJobsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cơ hội nghề nghiệp nổi bật
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá những vị trí công việc hấp dẫn tại TechLeet và bắt đầu hành trình
              phát triển sự nghiệp của bạn.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <ScrollReveal key={job.jobPostingId} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/jobs/${job.slug || job.jobPostingId}`} className="block h-full">
                    <JobCard job={job} />
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Đang tải việc làm...
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Vui lòng đợi</p>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                    Full-time
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Đang tải thông tin việc làm...
                </p>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Xem chi tiết
                </Button>
              </motion.div>
            ))
          )}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg">
                <Link href="/jobs" className="flex items-center">
                  Xem tất cả việc làm
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

