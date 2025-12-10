"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
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
             <div className="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chưa có việc làm nổi bật
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  Hiện tại chưa có việc làm nổi bật nào được hiển thị. Vui lòng quay lại sau hoặc xem tất cả việc làm.
                </p>
                <Button asChild variant="outline">
                  <Link href="/jobs">Xem tất cả việc làm</Link>
                </Button>
            </div>
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

