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

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TechLeet</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
              Việc làm
            </Link>
            <Link href="/about" className="text-blue-600 font-medium">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Liên hệ
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Về <span className="text-blue-600">TechLeet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chúng tôi là công ty công nghệ hàng đầu Việt Nam, chuyên phát triển
            các giải pháp số hóa doanh nghiệp và tạo ra những sản phẩm công nghệ
            đột phá.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sứ mệnh & Tầm nhìn
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Sứ mệnh
                    </h3>
                    <p className="text-gray-600">
                      Tạo ra những giải pháp công nghệ tiên tiến, giúp doanh
                      nghiệp Việt Nam chuyển đổi số thành công và cạnh tranh
                      trên thị trường toàn cầu.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Tầm nhìn
                    </h3>
                    <p className="text-gray-600">
                      Trở thành công ty công nghệ hàng đầu Đông Nam Á, được biết
                      đến với những sản phẩm chất lượng cao và văn hóa làm việc
                      xuất sắc.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Giá trị cốt lõi
                    </h3>
                    <p className="text-gray-600">
                      Đổi mới sáng tạo, chất lượng vượt trội, làm việc nhóm hiệu
                      quả, và luôn đặt khách hàng làm trung tâm trong mọi quyết
                      định.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2020
                  </div>
                  <div className="text-gray-600">Năm thành lập</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Nhân viên</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    100+
                  </div>
                  <div className="text-gray-600">Khách hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                  <div className="text-gray-600">Văn phòng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Câu chuyện của chúng tôi
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                TechLeet được thành lập vào năm 2020 bởi một nhóm kỹ sư phần mềm
                đầy đam mê với mục tiêu tạo ra những giải pháp công nghệ thực sự
                có ý nghĩa cho doanh nghiệp Việt Nam.
              </p>
              <p className="mb-6">
                Bắt đầu từ một startup nhỏ với 10 người, chúng tôi đã phát triển
                thành một trong những công ty công nghệ được tin tưởng nhất tại
                Việt Nam. Với hơn 500 nhân viên tài năng và 5 văn phòng trên
                toàn quốc, chúng tôi tự hào phục vụ hơn 100 khách hàng từ
                startup đến tập đoàn lớn.
              </p>
              <p className="mb-6">
                Thành công của chúng tôi đến từ việc luôn đặt con người làm
                trung tâm - không chỉ khách hàng mà còn cả nhân viên. Chúng tôi
                tin rằng một môi trường làm việc tích cực và văn hóa công ty
                mạnh mẽ sẽ tạo ra những sản phẩm xuất sắc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Đội ngũ lãnh đạo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Lại Dương Minh Hiếu
              </h3>
              <p className="text-blue-600 mb-2">CEO & Co-founder</p>
              <p className="text-sm text-gray-600">
                15+ năm kinh nghiệm trong lĩnh vực công nghệ và quản lý doanh
                nghiệp.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Trần Nguyên Vũ
              </h3>
              <p className="text-blue-600 mb-2">CTO & Co-founder</p>
              <p className="text-sm text-gray-600">
                Chuyên gia về kiến trúc hệ thống và phát triển sản phẩm công
                nghệ.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Lê Minh Quang
              </h3>
              <p className="text-blue-600 mb-2">VP of Engineering</p>
              <p className="text-sm text-gray-600">
                Dẫn dắt đội ngũ kỹ thuật với hơn 12 năm kinh nghiệm phát triển
                phần mềm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Giải thưởng & Công nhận
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Top 10 Startup
              </h3>
              <p className="text-sm text-gray-600">
                Vietnam Startup Awards 2023
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Best Workplace
              </h3>
              <p className="text-sm text-gray-600">Great Place to Work 2023</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Growing</h3>
              <p className="text-sm text-gray-600">
                Deloitte Technology Fast 50
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Innovation Award
              </h3>
              <p className="text-sm text-gray-600">ASEAN ICT Awards 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng tham gia hành trình cùng chúng tôi?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Khám phá các cơ hội nghề nghiệp tại TechLeet và cùng chúng tôi xây
            dựng tương lai công nghệ Việt Nam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/jobs" className="flex items-center">
                Xem việc làm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact">Liên hệ với chúng tôi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-6 w-6" />
                <span className="text-xl font-bold">TechLeet</span>
              </div>
              <p className="text-gray-400">
                Công ty công nghệ hàng đầu Việt Nam, chuyên phát triển các giải
                pháp số hóa doanh nghiệp.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Công ty</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/culture" className="hover:text-white">
                    Văn hóa
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-white">
                    Tin tức
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nghề nghiệp</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Việc làm
                  </Link>
                </li>
                <li>
                  <Link href="/internship" className="hover:text-white">
                    Thực tập
                  </Link>
                </li>
                <li>
                  <Link href="/benefits" className="hover:text-white">
                    Phúc lợi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>careers@techleet.com</li>
                <li>+84-28-3822-1234</li>
                <li>123 Nguyễn Huệ, Q1, TP.HCM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechLeet. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
