import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Building2, Calendar } from "lucide-react";
import { formatSalaryRange, formatRelativeTime, truncateText } from "@/lib/utils";
import type { JobPosting } from "@/lib/api";

interface JobCardProps {
  job: JobPosting;
}

export function JobCard({ job }: JobCardProps) {
  // Get location - prefer location field, fallback to headquarterId lookup
  const getLocationName = () => {
    if (job.location) {
      return job.location;
    }
    // If no location field, use a default
    return "Hồ Chí Minh";
  };

  const getSalaryDisplay = () => {
    const min = job.minSalary || job.salaryMin;
    const max = job.maxSalary || job.salaryMax;
    if (min && max) {
      return formatSalaryRange(min, max);
    }
    return null;
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 p-6 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
            <Building2 className="h-4 w-4 mr-1" />
            <span>TechLeet</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEmploymentTypeColor(job.employmentType)} dark:opacity-80`}>
            {getEmploymentTypeLabel(job.employmentType)}
          </span>
          {job.experienceLevel && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
              {getExperienceLevelLabel(job.experienceLevel)}
            </span>
          )}
        </div>
      </div>

      {/* Location & Salary */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{getLocationName()}</span>
        </div>
        
        {getSalaryDisplay() && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <DollarSign className="h-4 w-4 mr-2" />
            <span className="font-medium text-green-600 dark:text-green-400">
              {getSalaryDisplay()}
            </span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Đăng {formatRelativeTime(job.createdAt)}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {truncateText(job.description, 120)}
        </p>
      </div>

      {/* Requirements Preview */}
      {job.requirements && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Yêu cầu:</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {truncateText(job.requirements, 80)}
          </p>
        </div>
      )}

      {/* Benefits Preview */}
      {job.benefits && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phúc lợi:</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {truncateText(job.benefits, 80)}
          </p>
        </div>
      )}

      {/* Application Deadline */}
      {job.applicationDeadline && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center text-sm text-yellow-800 dark:text-yellow-300">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              Hạn nộp: {new Date(job.applicationDeadline).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          ID: {job.jobPostingId}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/jobs/${job.slug || job.jobPostingId}`}>
              Xem chi tiết
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/jobs/${job.slug || job.jobPostingId}/apply`}>
              Ứng tuyển
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
