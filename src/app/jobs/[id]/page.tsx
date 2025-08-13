"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Share2,
  Bookmark
} from "lucide-react";
import { formatSalaryRange, formatRelativeTime, formatDate } from "@/lib/utils";
import type { JobPosting } from "@/lib/api";
import { mockJobs, mockHeadquarters, mockDepartments } from "@/data/mock-jobs";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = parseInt(params.id as string);
  
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find job in mock data
        const foundJob = mockJobs.find(j => j.jobPostingId === jobId);
        
        if (!foundJob) {
          setError("Không tìm thấy việc làm này");
          return;
        }
        
        setJob(foundJob);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Có lỗi xảy ra khi tải thông tin việc làm');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const getLocationName = (headquarterId: number) => {
    const hq = mockHeadquarters.find(h => h.headquarterId === headquarterId);
    return hq?.city || "Hồ Chí Minh";
  };

  const getDepartmentName = (departmentId: number) => {
    const dept = mockDepartments.find(d => d.departmentId === departmentId);
    return dept?.departmentName || "Engineering";
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full-time': 'Toàn thời gian',
      'part-time': 'Bán thời gian', 
      'contract': 'Hợp đồng',
      'internship': 'Thực tập',
    };
    return labels[type] || type;
  };

  const getEmploymentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800', 
      'internship': 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getExperienceLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      'entry': 'Mới ra trường',
      'mid': 'Trung cấp',
      'senior': 'Cao cấp',
      'lead': 'Trưởng nhóm',
      'executive': 'Điều hành',
    };
    return labels[level] || level;
  };

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffInDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Không tìm thấy việc làm"}
          </h1>
          <p className="text-gray-600 mb-6">
            Việc làm này có thể đã bị xóa hoặc không còn tồn tại.
          </p>
          <div className="space-x-4">
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <Button asChild>
              <Link href="/jobs">
                Xem tất cả việc làm
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-blue-600">Việc làm</Link>
            <span>/</span>
            <span className="text-gray-900">{job.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            onClick={() => router.back()} 
            variant="ghost" 
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center text-lg text-gray-600 mb-3">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span>TechLeet • {getDepartmentName(job.departmentId)}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmploymentTypeColor(job.employmentType)}`}>
                        {getEmploymentTypeLabel(job.employmentType)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                        {getExperienceLevelLabel(job.experienceLevel)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Job Meta Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{getLocationName(job.headquarterId)}</span>
                  </div>
                  
                  {job.minSalary && job.maxSalary && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 mr-2" />
                      <span className="font-medium text-green-600">
                        {formatSalaryRange(job.minSalary, job.maxSalary)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Đăng {formatRelativeTime(job.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 lg:w-48">
                <Button asChild size="lg" className="w-full">
                  <Link href={`/jobs/${job.jobPostingId}/apply`}>
                    Ứng tuyển ngay
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Lưu
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-1" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>

            {/* Application Deadline Warning */}
            {job.applicationDeadline && isDeadlineSoon(job.applicationDeadline) && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center text-yellow-800">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    Hạn nộp hồ sơ: {formatDate(job.applicationDeadline)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Job Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Mô tả công việc
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Yêu cầu công việc
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.requirements}
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Quyền lợi & Phúc lợi
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.benefits}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ứng tuyển nhanh
                </h3>
                <Button asChild className="w-full mb-3">
                  <Link href={`/jobs/${job.jobPostingId}/apply`}>
                    <Users className="mr-2 h-4 w-4" />
                    Ứng tuyển ngay
                  </Link>
                </Button>
                <p className="text-sm text-gray-600">
                  Chỉ mất 5 phút để hoàn thành hồ sơ ứng tuyển
                </p>
              </div>

              {/* Job Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin việc làm
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại hình:</span>
                    <span className="font-medium">{getEmploymentTypeLabel(job.employmentType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cấp độ:</span>
                    <span className="font-medium">{getExperienceLevelLabel(job.experienceLevel)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa điểm:</span>
                    <span className="font-medium">{getLocationName(job.headquarterId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phòng ban:</span>
                    <span className="font-medium">{getDepartmentName(job.departmentId)}</span>
                  </div>
                  {job.applicationDeadline && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hạn nộp:</span>
                      <span className="font-medium">{formatDate(job.applicationDeadline)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Về TechLeet
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    Công ty công nghệ hàng đầu Việt Nam, chuyên phát triển các giải pháp 
                    số hóa doanh nghiệp.
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>500+ nhân viên</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>5 văn phòng tại Việt Nam</span>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full mt-3">
                    <Link href="/about">
                      Tìm hiểu thêm về TechLeet
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
