"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Users, Zap, Smile, Coffee, ArrowRight } from "lucide-react";

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
      staggerChildren: 0.1
    }
  }
};

export default function CulturePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 dark:from-slate-900 dark:to-slate-800 py-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight">
              Văn hóa <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-400">TechLeet</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Nơi con người được đặt làm trọng tâm, sự sáng tạo được khuyến khích và mỗi cá nhân đều được tỏa sáng.
            </p>
          </motion.div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-yellow-300 dark:bg-yellow-900/30 rounded-full blur-3xl mix-blend-multiply animate-blob" />
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-red-300 dark:bg-red-900/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
        </div>
      </section>

      {/* Core Values Detail */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">DNA của người TechLeet</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Những phẩm chất tạo nên bản sắc riêng biệt và là kim chỉ nam cho mọi hành động của chúng tôi.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { 
                icon: Zap, 
                color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20", 
                title: "Dám khác biệt", 
                desc: "Chúng tôi không ngại thử thách những lối mòn cũ kỹ để tìm ra những giải pháp đột phá mới." 
              },
              { 
                icon: Heart, 
                color: "text-red-500 bg-red-100 dark:bg-red-900/20", 
                title: "Đam mê cháy bỏng", 
                desc: "Làm việc với tất cả nhiệt huyết và tình yêu nghề, luôn nỗ lực để tạo ra sản phẩm tốt nhất." 
              },
              { 
                icon: Users, 
                color: "text-blue-500 bg-blue-100 dark:bg-blue-900/20", 
                title: "Đồng đội là số 1", 
                desc: "Thành công của bạn là thành công của tôi. Chúng tôi cùng nhau đi nhanh hơn và xa hơn." 
              },
              { 
                icon: Smile, 
                color: "text-green-500 bg-green-100 dark:bg-green-900/20", 
                title: "Vui vẻ & Tích cực", 
                desc: "Mang lại tiếng cười và năng lượng tích cực cho mọi người xung quanh mỗi ngày." 
              },
              { 
                icon: Coffee, 
                color: "text-orange-500 bg-orange-100 dark:bg-orange-900/20", 
                title: "Cân bằng cuộc sống", 
                desc: "Làm hết sức, nhưng cũng chơi hết mình. Chúng tôi trân trọng sức khỏe và đời sống tinh thần." 
              },
              { 
                icon: ArrowRight, 
                color: "text-purple-500 bg-purple-100 dark:bg-purple-900/20", 
                title: "Luôn học hỏi", 
                desc: "Thế giới công nghệ thay đổi từng giây, việc học tập không bao giờ là đủ và không bao giờ dừng lại." 
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="p-8 rounded-2xl border bg-background hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Life at TechLeet */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4 translate-y-8">
                   <div className="h-64 rounded-2xl bg-muted overflow-hidden relative">
                    {/* Placeholder images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20" />
                   </div>
                   <div className="h-40 rounded-2xl bg-muted overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-teal-500 opacity-20" />
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div className="h-40 rounded-2xl bg-muted overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-400 to-red-500 opacity-20" />
                   </div>
                   <div className="h-64 rounded-2xl bg-muted overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tl from-pink-400 to-rose-500 opacity-20" />
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="order-1 lg:order-2 space-y-8">
               <h2 className="text-4xl font-bold">Cuộc sống tại TechLeet</h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Chúng tôi tin rằng môi trường làm việc hạnh phúc sẽ tạo ra những sản phẩm tuyệt vời. Tại TechLeet, bạn không chỉ đến để làm việc, mà còn để trải nghiệm, kết nối và tận hưởng từng khoảnh khắc.
               </p>
               <ul className="space-y-4">
                 {[
                   "Văn phòng mở, hiện đại với nhiều góc thư giãn",
                   "Happy Hour và Teambuilding hàng tháng",
                   "Câu lạc bộ thể thao, âm nhạc, boardgame",
                   "Pantry ngập tràn đồ ăn nhẹ và đồ uống miễn phí"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                     <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                       <ArrowRight className="w-3 H-3" />
                     </div>
                     {item}
                   </li>
                 ))}
               </ul>
               <Button size="lg" className="mt-4">
                 Xem album ảnh hoạt động
               </Button>
             </div>
           </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bạn có thấy mình phù hợp?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Nếu bạn chia sẻ những giá trị này và muốn trở thành một phần của đại gia đình TechLeet, đừng ngần ngại gia nhập cùng chúng tôi.
          </p>
          <Button asChild size="lg" className="px-8 h-12 text-lg">
            <Link href="/jobs">Gia nhập TechLeet ngay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
