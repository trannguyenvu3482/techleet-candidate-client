import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import { generateJobSlug } from "@/lib/utils";
import { JobCard } from "@/components/jobs/job-card";

export const metadata: Metadata = {
  title: "TechLeet - Leading Technology Company in Vietnam",
  description: "Join TechLeet and build the future of technology. We create breakthrough tech products that change how the world works.",
  keywords: ["TechLeet", "technology", "careers", "jobs", "Vietnam", "software development"],
  openGraph: {
    title: "TechLeet - Leading Technology Company in Vietnam",
    description: "Join TechLeet and build the future of technology. We create breakthrough tech products that change how the world works.",
    type: "website",
  },
};

export default async function Home() {
  // Fetch featured jobs
  let featuredJobs: any[] = [];
  try {
    const jobs = await api.getJobPostings({ 
      status: 'published', 
      limit: 3,
      page: 1 
    });
    featuredJobs = jobs.map(job => ({
      ...job,
      slug: job.slug || generateJobSlug(job.title, job.jobPostingId)
    }));
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    // Continue with empty array if fetch fails
  }

  return (
    <div>

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
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job) => (
                <JobCard key={job.jobPostingId} job={job} />
              ))
            ) : (
              // Fallback when no jobs available
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Đang tải việc làm...
                      </h3>
                      <p className="text-sm text-gray-600">Vui lòng đợi</p>
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
                    Đang tải thông tin việc làm...
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Xem chi tiết
                  </Button>
                </div>
              ))
            )}
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
    </div>
  );
}
