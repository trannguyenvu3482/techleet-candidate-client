"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Target,
  Award,
  Globe,
  Heart,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight">
              Về <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">TechLeet</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Tiên phong kiến tạo giải pháp công nghệ số, nâng tầm doanh nghiệp Việt 
              trên bản đồ công nghệ thế giới.
            </p>
          </motion.div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-300 dark:bg-purple-900/30 rounded-full blur-3xl mix-blend-multiply animate-blob" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <div>
                <motion.h2 variants={fadeIn} className="text-4xl font-bold text-foreground mb-6">
                  Sứ mệnh & Tầm nhìn
                </motion.h2>
                <motion.div variants={fadeIn} className="h-1 w-20 bg-primary rounded-full mb-8" />
              </div>
              
              <motion.div variants={fadeIn} className="flex gap-6 group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Target className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Sứ mệnh</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Tạo ra những giải pháp công nghệ đột phá, là đòn bẩy giúp doanh nghiệp 
                    chuyển đổi số toàn diện và bền vững.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex gap-6 group">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Globe className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Tầm nhìn</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Trở thành biểu tượng công nghệ hàng đầu khu vực, nơi hội tụ nhân tài 
                    và lan tỏa giá trị tri thức.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex gap-6 group">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Heart className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Giá trị cốt lõi</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Đổi mới không ngừng - Chất lượng cam kết - Con người là trung tâm.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-muted/50 rounded-3xl p-10 border border-border shadow-lg"
            >
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Năm thành lập", value: "2020", color: "text-blue-600 dark:text-blue-400" },
                  { label: "Nhân viên", value: "500+", color: "text-green-600 dark:text-green-400" },
                  { label: "Khách hàng", value: "100+", color: "text-purple-600 dark:text-purple-400" },
                  { label: "Văn phòng", value: "5", color: "text-orange-600 dark:text-orange-400" }
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className={`text-4xl font-bold ${item.color} mb-2`}>{item.value}</div>
                    <div className="text-muted-foreground font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những người dẫn đường đầy tâm huyết và giàu kinh nghiệm
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
          >
            {[
              { name: "Lại Dương Minh Hiếu", role: "CEO & Co-founder", desc: "Visionary Leader" },
              { name: "Trần Nguyên Vũ", role: "CTO & Co-founder", desc: "Tech Architect" },
              { name: "Lê Minh Quang", role: "VP of Engineering", desc: "Engineering Excellence" }
            ].map((leader, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="group relative overflow-hidden bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                   {/* Placeholder for real image */}
                   <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 z-10" />
                   <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-muted-foreground opacity-30">
                     {leader.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   
                   <div className="absolute bottom-6 left-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <p className="text-sm font-medium text-blue-300 mb-1">{leader.role}</p>
                     <h3 className="text-xl font-bold">{leader.name}</h3>
                   </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">{leader.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-16">Giải thưởng & Công nhận</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: Award, label: "Top 10 Startup", sub: "Vietnam Startup Awards" },
              { icon: Users, label: "Best Workplace", sub: "Great Place into Work" },
              { icon: Building2, label: "Fast Growing", sub: "Deloitte Fast 50" },
              { icon: Globe, label: "Innovation", sub: "ASEAN ICT Awards" },
            ].map((award, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-background rounded-full shadow-lg flex items-center justify-center mb-6 text-primary">
                  <award.icon className="h-10 w-10" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{award.label}</h3>
                <p className="text-sm text-muted-foreground">{award.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-90 dark:opacity-80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn sàng thay đổi tương lai?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Gia nhập TechLeet ngay hôm nay để cùng chúng tôi viết tiếp câu chuyện công nghệ đầy cảm hứng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 h-14">
                <Link href="/jobs" className="flex items-center">
                  Xem việc làm
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14 bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors"
              >
                <Link href="/contact">Liên hệ ngay</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

