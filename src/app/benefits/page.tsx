import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  DollarSign,
  Umbrella,
  GraduationCap,
  Building2,
  Calendar,
  Heart,
  Award,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefits & Perks | TechLeet",
  description: "Discover TechLeet's comprehensive benefits package including competitive salary, health insurance, professional development, and more.",
  keywords: ["benefits", "perks", "TechLeet", "health insurance", "salary", "professional development", "work-life balance"],
  openGraph: {
    title: "Benefits & Perks | TechLeet",
    description: "Discover TechLeet's comprehensive benefits package.",
    type: "website",
  },
};

export default function BenefitsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Phúc lợi & <span className="text-blue-600">Quyền lợi</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chúng tôi tin rằng nhân viên hạnh phúc sẽ tạo ra những sản phẩm tuyệt vời.
            Vì vậy, chúng tôi đầu tư mạnh vào phúc lợi và môi trường làm việc.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Salary & Compensation */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lương thưởng hấp dẫn</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lương tháng 13 đầy đủ</li>
                <li>• Thưởng hiệu suất theo quý</li>
                <li>• Review lương 2 lần/năm</li>
                <li>• Thưởng dự án đặc biệt</li>
                <li>• Equity/Stock options</li>
              </ul>
            </div>

            {/* Vacation & Travel */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nghỉ phép & Du lịch</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 14+ ngày phép năm</li>
                <li>• Du lịch công ty hàng năm</li>
                <li>• Team building hàng quý</li>
                <li>• Nghỉ sinh nhật có lương</li>
                <li>• Nghỉ lễ quốc gia đầy đủ</li>
              </ul>
            </div>

            {/* Health & Insurance */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <Umbrella className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sức khỏe & Bảo hiểm</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bảo hiểm sức khỏe cao cấp</li>
                <li>• Khám sức khỏe định kỳ</li>
                <li>• Bảo hiểm tai nạn 24/7</li>
                <li>• Hỗ trợ gym & thể thao</li>
                <li>• Health checkup hàng năm</li>
              </ul>
            </div>

            {/* Professional Development */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phát triển nghề nghiệp</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ngân sách đào tạo 20M/năm</li>
                <li>• Khóa học online miễn phí</li>
                <li>• Hội thảo & conference</li>
                <li>• Mentoring 1-on-1</li>
                <li>• Certificate sponsorship</li>
              </ul>
            </div>

            {/* Work Environment */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Môi trường làm việc</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Văn phòng hiện đại, thoáng mát</li>
                <li>• Flexible working time</li>
                <li>• Work from home 2 ngày/tuần</li>
                <li>• Free coffee & snacks</li>
                <li>• Ergonomic workspace</li>
              </ul>
            </div>

            {/* Events & Activities */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sự kiện & Hoạt động</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Happy hour hàng tuần</li>
                <li>• Game tournament</li>
                <li>• Lễ hội văn hóa</li>
                <li>• Volunteer activities</li>
                <li>• Birthday celebrations</li>
              </ul>
            </div>

            {/* Equipment & Tools */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Thiết bị & Công cụ</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Laptop MacBook Pro/ThinkPad</li>
                <li>• Dual monitor setup</li>
                <li>• Software licenses đầy đủ</li>
                <li>• Stipend cho home office</li>
                <li>• Latest tech tools</li>
              </ul>
            </div>

            {/* Learning & Growth */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Học hỏi & Phát triển</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tech talks hàng tháng</li>
                <li>• Code review sessions</li>
                <li>• Pair programming</li>
                <li>• Book club & knowledge sharing</li>
                <li>• Career path planning</li>
              </ul>
            </div>

            {/* Work-Life Balance */}
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cân bằng Cuộc sống</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Không làm overtime thường xuyên</li>
                <li>• Support cho family time</li>
                <li>• Flexible schedule</li>
                <li>• Mental health support</li>
                <li>• Employee assistance program</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Phúc lợi Bổ sung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3">Tài chính</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Thưởng onboarding</li>
                  <li>• Referral bonus</li>
                  <li>• Performance bonus</li>
                  <li>• Profit sharing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3">Phúc lợi Xã hội</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Bảo hiểm xã hội đầy đủ</li>
                  <li>• Bảo hiểm thất nghiệp</li>
                  <li>• Chế độ nghỉ thai sản</li>
                  <li>• Chế độ nghỉ ốm đau</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3">Hỗ trợ Cá nhân</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Counseling & therapy support</li>
                  <li>• Legal consultation</li>
                  <li>• Financial planning</li>
                  <li>• Career counseling</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3">Phúc lợi Khác</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Employee discount programs</li>
                  <li>• Mobile phone allowance</li>
                  <li>• Internet allowance</li>
                  <li>• Transportation support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TechLeet */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Tại sao chọn TechLeet?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Chúng tôi không chỉ cung cấp mức lương cạnh tranh, mà còn đầu tư vào sự phát triển
              và hạnh phúc của từng nhân viên. Tại TechLeet, bạn không chỉ là một nhân viên,
              bạn là một phần của gia đình.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Nhân viên hạnh phúc</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-lg opacity-90">Employee satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.8/5</div>
                <div className="text-lg opacity-90">Glassdoor rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn sàng tham gia đội ngũ TechLeet?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Khám phá các cơ hội nghề nghiệp và bắt đầu hành trình của bạn ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/jobs" className="flex items-center">
                Xem việc làm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Tìm hiểu thêm về TechLeet</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

