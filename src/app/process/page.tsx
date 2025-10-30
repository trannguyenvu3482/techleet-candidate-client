import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Users,
  Calendar,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment Process | TechLeet",
  description: "Learn about TechLeet's recruitment process - from application to onboarding. Transparent and professional hiring process.",
  keywords: ["recruitment", "hiring process", "TechLeet", "job application", "interview", "onboarding"],
  openGraph: {
    title: "Recruitment Process | TechLeet",
    description: "Learn about TechLeet's recruitment process - from application to onboarding.",
    type: "website",
  },
};

export default function ProcessPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Quy trình tuyển dụng tại <span className="text-blue-600">TechLeet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm tuyển dụng minh bạch và chuyên nghiệp
            để bạn có thể thể hiện tốt nhất khả năng của mình.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                5 Bước Tuyển Dụng
              </h2>
              <p className="text-gray-600">
                Thời gian trung bình từ ứng tuyển đến nhận offer: <span className="font-semibold text-blue-600">10-14 ngày</span>
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Ứng tuyển</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Nộp hồ sơ trực tuyến với CV và thư xin việc. Hệ thống của chúng tôi sẽ tự động
                    sàng lọc và đánh giá CV của bạn trong vòng 24-48 giờ.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Điền đầy đủ thông tin cá nhân và nghề nghiệp</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Tải lên CV ở định dạng PDF, DOC hoặc DOCX</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Viết thư xin việc thể hiện động lực và sự phù hợp</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Thời gian: 15-20 phút</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Sàng lọc CV</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    HR xem xét hồ sơ và liên hệ trong vòng 3-5 ngày làm việc. Chúng tôi sử dụng
                    hệ thống AI để đánh giá ban đầu và sau đó team HR sẽ xem xét kỹ lưỡng.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Đánh giá kinh nghiệm và kỹ năng phù hợp với vị trí</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Xem xét trình độ học vấn và chứng chỉ</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Kiểm tra tính phù hợp văn hóa công ty</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Thời gian: 3-5 ngày làm việc</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Phỏng vấn</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Phỏng vấn kỹ thuật và văn hóa công ty (1-2 vòng). Chúng tôi sẽ đánh giá
                    không chỉ kỹ năng kỹ thuật mà còn khả năng làm việc nhóm và phù hợp văn hóa.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Vòng 1:</strong> Phỏng vấn với HR về động lực và mục tiêu nghề nghiệp</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Vòng 2:</strong> Phỏng vấn kỹ thuật với team lead và senior developers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Có thể bao gồm bài test kỹ thuật hoặc coding challenge</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Thời gian: 1-2 tuần (bao gồm lịch hẹn)</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Thỏa thuận</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Thương lượng lương và điều kiện làm việc. Chúng tôi cam kết minh bạch và
                    công bằng trong mọi thỏa thuận.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Thảo luận về mức lương và phúc lợi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Xác nhận ngày bắt đầu làm việc</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gửi offer letter chính thức</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Thời gian: 2-3 ngày làm việc</span>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Onboarding</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Chương trình đào tạo và hòa nhập 2 tuần đầu. Chúng tôi sẽ hỗ trợ bạn
                    làm quen với môi trường làm việc và team.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Orientation về công ty và văn hóa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Setup môi trường làm việc và tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Giới thiệu với team và mentor</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bắt đầu dự án đầu tiên với sự hỗ trợ</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Thời gian: 2 tuần đầu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Timeline Tuyển Dụng
            </h2>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">1-2 ngày</div>
                  <div className="text-sm text-gray-600">Ứng tuyển</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">3-5 ngày</div>
                  <div className="text-sm text-gray-600">Sàng lọc CV</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">1-2 tuần</div>
                  <div className="text-sm text-gray-600">Phỏng vấn</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">2-3 ngày</div>
                  <div className="text-sm text-gray-600">Thỏa thuận</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">2 tuần</div>
                  <div className="text-sm text-gray-600">Onboarding</div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-700">
                  <strong>Tổng thời gian:</strong> <span className="text-blue-600">10-14 ngày</span> từ ứng tuyển đến nhận offer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mẹo Để Ứng Tuyển Thành Công
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">✓ Chuẩn bị CV tốt</h3>
                <p className="text-sm text-gray-600">
                  Đảm bảo CV của bạn rõ ràng, có cấu trúc tốt và highlight được những thành tựu
                  phù hợp với vị trí ứng tuyển.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">✓ Nghiên cứu công ty</h3>
                <p className="text-sm text-gray-600">
                  Tìm hiểu về TechLeet, sản phẩm, văn hóa công ty để thể hiện sự quan tâm thật sự
                  trong buổi phỏng vấn.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">✓ Thư xin việc cá nhân hóa</h3>
                <p className="text-sm text-gray-600">
                  Viết thư xin việc riêng cho từng vị trí, giải thích tại sao bạn phù hợp và
                  động lực của bạn.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">✓ Chuẩn bị cho phỏng vấn</h3>
                <p className="text-sm text-gray-600">
                  Luyện tập trả lời các câu hỏi phỏng vấn thường gặp và chuẩn bị câu hỏi để hỏi
                  interviewer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Khám phá các cơ hội nghề nghiệp tại TechLeet và ứng tuyển ngay hôm nay.
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
    </div>
  );
}

