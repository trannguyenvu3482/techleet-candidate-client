"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Plane,
  Heart,
  BookOpen,
  Building,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const benefits = [
  {
    icon: DollarSign,
    title: "Lương thưởng hấp dẫn",
    items: [
      "Lương tháng 13 đầy đủ",
      "Thưởng hiệu suất theo quý",
      "Review lương 2 lần/năm",
      "Thưởng dự án đặc biệt",
    ],
    gradient: "from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20",
    iconColor: "text-green-600 dark:text-green-400",
    delay: 0,
  },
  {
    icon: Plane,
    title: "Nghỉ phép & Du lịch",
    items: [
      "14+ ngày phép năm",
      "Du lịch công ty hàng năm",
      "Team building hàng quý",
      "Nghỉ sinh nhật có lương",
    ],
    gradient: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    delay: 0.1,
  },
  {
    icon: Heart,
    title: "Sức khỏe & Bảo hiểm",
    items: [
      "Bảo hiểm sức khỏe cao cấp",
      "Khám sức khỏe định kỳ",
      "Bảo hiểm tai nạn 24/7",
      "Hỗ trợ gym & thể thao",
    ],
    gradient: "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    delay: 0.2,
  },
  {
    icon: BookOpen,
    title: "Phát triển nghề nghiệp",
    items: [
      "Ngân sách đào tạo 20M/năm",
      "Khóa học online miễn phí",
      "Hội thảo & conference",
      "Mentoring 1-on-1",
    ],
    gradient: "from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    delay: 0.3,
  },
  {
    icon: Building,
    title: "Môi trường làm việc",
    items: [
      "Văn phòng hiện đại, thoáng mát",
      "Flexible working time",
      "Work from home 2 ngày/tuần",
      "Free coffee & snacks",
    ],
    gradient: "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20",
    iconColor: "text-red-600 dark:text-red-400",
    delay: 0.4,
  },
  {
    icon: PartyPopper,
    title: "Sự kiện & Hoạt động",
    items: [
      "Happy hour hàng tuần",
      "Game tournament",
      "Lễ hội văn hóa",
      "Volunteer activities",
    ],
    gradient: "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    delay: 0.5,
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Phúc lợi & Quyền lợi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Chúng tôi tin rằng nhân viên hạnh phúc sẽ tạo ra những sản phẩm tuyệt vời.
              Vì vậy, chúng tôi đầu tư mạnh vào phúc lợi và môi trường làm việc.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={index} delay={benefit.delay}>
                <motion.div
                  className={`bg-gradient-to-br ${benefit.gradient} rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 ${benefit.iconColor}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {benefit.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: benefit.delay + itemIndex * 0.05 }}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg">
                <Link href="/benefits" className="flex items-center">
                  Xem tất cả phúc lợi
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

