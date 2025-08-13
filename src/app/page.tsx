import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Users, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
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
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
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
            Xây dựng tương lai
            <span className="text-blue-600"> công nghệ</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tham gia đội ngũ TechLeet và cùng chúng tôi tạo ra những sản phẩm công nghệ
            đột phá, thay đổi cách thế giới làm việc.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/jobs" className="flex items-center">
                Xem việc làm
                <ArrowRight className="ml-2 h-8 w-8" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/about">
                Tìm hiểu thêm
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Nhân viên tài năng</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">5</div>
              <div className="text-gray-600">Văn phòng tại Việt Nam</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Vị trí đang tuyển</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quy trình tuyển dụng của chúng tôi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm tuyển dụng minh bạch và chuyên nghiệp
              để bạn có thể thể hiện tốt nhất khả năng của mình.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200 hidden md:block">
                <div className="h-full bg-blue-600 w-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Step 1 */}
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ứng tuyển</h3>
                  <p className="text-sm text-gray-600">
                    Nộp hồ sơ trực tuyến với CV và thư xin việc
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sàng lọc</h3>
                  <p className="text-sm text-gray-600">
                    HR xem xét hồ sơ và liên hệ trong vòng 3-5 ngày
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phỏng vấn</h3>
                  <p className="text-sm text-gray-600">
                    Phỏng vấn kỹ thuật và văn hóa công ty (1-2 vòng)
                  </p>
                </div>

                {/* Step 4 */}
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Thỏa thuận</h3>
                  <p className="text-sm text-gray-600">
                    Thương lượng lương và điều kiện làm việc
                  </p>
                </div>

                {/* Step 5 */}
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-xl font-bold">5</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Onboarding</h3>
                  <p className="text-sm text-gray-600">
                    Chương trình đào tạo và hòa nhập 2 tuần đầu
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Thời gian trung bình từ ứng tuyển đến nhận offer: <span className="font-semibold text-blue-600">10-14 ngày</span>
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/process">
                  Tìm hiểu chi tiết quy trình
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Perks Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Phúc lợi & Quyền lợi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi tin rằng nhân viên hạnh phúc sẽ tạo ra những sản phẩm tuyệt vời.
              Vì vậy, chúng tôi đầu tư mạnh vào phúc lợi và môi trường làm việc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                💰
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lương thưởng hấp dẫn</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lương tháng 13 đầy đủ</li>
                <li>• Thưởng hiệu suất theo quý</li>
                <li>• Review lương 2 lần/năm</li>
                <li>• Thưởng dự án đặc biệt</li>
              </ul>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                🏖️
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nghỉ phép & Du lịch</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 14+ ngày phép năm</li>
                <li>• Du lịch công ty hàng năm</li>
                <li>• Team building hàng quý</li>
                <li>• Nghỉ sinh nhật có lương</li>
              </ul>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                🏥
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sức khỏe & Bảo hiểm</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bảo hiểm sức khỏe cao cấp</li>
                <li>• Khám sức khỏe định kỳ</li>
                <li>• Bảo hiểm tai nạn 24/7</li>
                <li>• Hỗ trợ gym & thể thao</li>
              </ul>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                📚
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phát triển nghề nghiệp</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ngân sách đào tạo 20M/năm</li>
                <li>• Khóa học online miễn phí</li>
                <li>• Hội thảo & conference</li>
                <li>• Mentoring 1-on-1</li>
              </ul>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                🏢
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Môi trường làm việc</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Văn phòng hiện đại, thoáng mát</li>
                <li>• Flexible working time</li>
                <li>• Work from home 2 ngày/tuần</li>
                <li>• Free coffee & snacks</li>
              </ul>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                🎉
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sự kiện & Hoạt động</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Happy hour hàng tuần</li>
                <li>• Game tournament</li>
                <li>• Lễ hội văn hóa</li>
                <li>• Volunteer activities</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/benefits" className="flex items-center">
                Xem tất cả phúc lợi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cơ hội nghề nghiệp nổi bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những vị trí công việc hấp dẫn tại TechLeet và bắt đầu hành trình
              phát triển sự nghiệp của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Sample job cards - will be replaced with real data */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Senior Software Engineer
                    </h3>
                    <p className="text-sm text-gray-600">Engineering Team</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Full-time
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  Hồ Chí Minh
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Tham gia phát triển các sản phẩm công nghệ tiên tiến với đội ngũ kỹ sư
                  giàu kinh nghiệm...
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Xem chi tiết
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/jobs" className="flex items-center">
                Xem tất cả việc làm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
                Công ty công nghệ hàng đầu Việt Nam, chuyên phát triển các giải pháp
                số hóa doanh nghiệp.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Công ty</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">Về chúng tôi</Link></li>
                <li><Link href="/culture" className="hover:text-white">Văn hóa</Link></li>
                <li><Link href="/news" className="hover:text-white">Tin tức</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nghề nghiệp</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs" className="hover:text-white">Việc làm</Link></li>
                <li><Link href="/internship" className="hover:text-white">Thực tập</Link></li>
                <li><Link href="/benefits" className="hover:text-white">Phúc lợi</Link></li>
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
