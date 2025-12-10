"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Linkedin, Mail, Twitter, ChevronRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const leaders = [
  {
    name: "Lại Dương Minh Hiếu",
    role: "Co-Founder & CEO",
    bio: "Hơn 15 năm kinh nghiệm trong ngành công nghệ phần mềm. Từng giữ vị trí lãnh đạo cấp cao tại các tập đoàn công nghệ đa quốc gia trước khi sáng lập TechLeet. Là người truyền cảm hứng với tầm nhìn đưa công nghệ Việt vươn tầm thế giới.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=800",
    social: { linkedin: "#", twitter: "#", email: "hieu@techleet.vn" }
  },
  {
    name: "Trần Nguyên Vũ", 
    role: "Co-Founder & CTO",
    bio: "Kiến trúc sư trưởng của hệ thống TechLeet. Chuyên gia về Cloud Computing và AI với nhiều bằng sáng chế công nghệ. Đam mê xây dựng các hệ thống scalable và high-performance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=800",
    social: { linkedin: "#", twitter: "#", email: "vu@techleet.vn" }
  },
  {
    name: "Lê Minh Quang",
    role: "VP of Engineering",
    bio: "Người dẫn dắt đội ngũ kỹ sư hơn 200 người. Luôn chú trọng vào văn hóa engineering excellence và phát triển con người. Có kinh nghiệm xây dựng quy trình phát triển phần mềm chuẩn mực.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=800",
    social: { linkedin: "#", twitter: "#", email: "quang@techleet.vn" }
  },
  {
    name: "Nguyễn Thị Mai",
    role: "Head of Product",
    bio: "Chuyên gia về trải nghiệm người dùng và thiết kế sản phẩm. Luôn đặt khách hàng làm trung tâm trong mọi quyết định phát triển sản phẩm. 10 năm kinh nghiệm trong lĩnh vực Product Management.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800",
    social: { linkedin: "#", twitter: "#", email: "mai@techleet.vn" }
  },
  {
    name: "Phạm Văn Hùng",
    role: "Head of Growth",
    bio: "Chiến lược gia về tăng trưởng và marketing. Đã từng scale up user base cho nhiều startup công nghệ từ con số 0 lên hàng triệu người dùng.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800",
    social: { linkedin: "#", twitter: "#", email: "hung@techleet.vn" }
  },
  {
    name: "Hoàng Thanh Tâm",
    role: "Head of People",
    bio: "Người kiến tạo văn hóa TechLeet. Luôn tâm huyết với việc xây dựng môi trường làm việc hạnh phúc, nơi mỗi nhân viên đều được quan tâm và phát triển.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=800",
    social: { linkedin: "#", twitter: "#", email: "tam@techleet.vn" }
  }
];

export default function LeadershipPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight">
              Ban Lãnh Đạo <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">TechLeet</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Những "thuyền trưởng" tài năng và tâm huyết, dẫn dắt con tàu TechLeet vươn ra biển lớn.
            </p>
          </motion.div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/50 dark:from-blue-900/20 to-transparent skew-x-12 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-100/50 dark:from-indigo-900/20 to-transparent -skew-x-12 pointer-events-none" />
      </section>

      {/* Leadership Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {leaders.map((leader, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="group relative bg-background rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  {/* Using standard img for external URLs, in production should use next/image with configured domains */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                      <a href={leader.social.linkedin} className="text-white hover:text-blue-400 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={`mailto:${leader.social.email}`} className="text-white hover:text-red-400 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{leader.name}</h3>
                    <p className="text-primary font-medium">{leader.role}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Leadership CTA */}
      <section className="py-24 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Chúng tôi luôn tìm kiếm những người dẫn đầu</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                TechLeet đang tìm kiếm những nhà lãnh đạo tương lai để cùng chúng tôi chinh phục những đỉnh cao mới.
              </p>
              <Button asChild size="lg" variant="secondary" className="px-8 h-12 text-lg">
                <Link href="/jobs" className="flex items-center gap-2">
                  Xem các vị trí Manager <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
