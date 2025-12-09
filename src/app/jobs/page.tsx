"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Search, Filter, SlidersHorizontal, Briefcase } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { JobPosting } from "@/lib/api";
import { generateJobSlug } from "@/lib/utils";

interface JobFilters {
  search: string;
  employmentType: string;
  experienceLevel: string;
  departmentId: string;
  headquarterId: string;
  minSalary: string;
  maxSalary: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    employmentType: "",
    experienceLevel: "",
    departmentId: "",
    headquarterId: "",
    minSalary: "",
    maxSalary: "",
  });


  // Set page title (client component approach)
  useEffect(() => {
    document.title = "Tìm việc làm - TechLeet";

    return () => {
      document.title = "TechLeet";
    };
  }, []);

  // Fetch jobs function
  const fetchJobs = useCallback(async (currentFilters: JobFilters) => {
    try {
      setLoading(true);
      setError(null);

      // Build API parameters (no page/limit - fetch all)
      const params: Record<string, unknown> = {
        status: 'published',
      };

      // Add filters to params
      if (currentFilters.search) params.search = currentFilters.search;
      if (currentFilters.employmentType) params.employmentType = currentFilters.employmentType;
      if (currentFilters.experienceLevel) params.experienceLevel = currentFilters.experienceLevel;
      if (currentFilters.departmentId) params.departmentId = parseInt(currentFilters.departmentId);
      if (currentFilters.headquarterId) params.headquarterId = parseInt(currentFilters.headquarterId);
      if (currentFilters.minSalary) params.minSalary = parseInt(currentFilters.minSalary);
      if (currentFilters.maxSalary) params.maxSalary = parseInt(currentFilters.maxSalary);

      // Use real API - fetches all jobs
      const allJobs = await api.getJobPostings(params);

      // Generate slugs for jobs that don't have them
      const jobsWithSlugs = allJobs.map(job => ({
        ...job,
        slug: job.slug || generateJobSlug(job.title, job.jobPostingId)
      }));

      setJobs(jobsWithSlugs);
      
    } catch (err) {
      console.error('Error fetching jobs:', err);
      if (err instanceof ApiError) {
        setError(err.message || `Lỗi ${err.status}: Không thể tải danh sách việc làm`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Có lỗi xảy ra khi tải danh sách việc làm. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchJobs(filters);
  }, [fetchJobs, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchJobs(updatedFilters);
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    handleFilterChange({ search: searchTerm });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: JobFilters = {
      search: "",
      employmentType: "",
      experienceLevel: "",
      departmentId: "",
      headquarterId: "",
      minSalary: "",
      maxSalary: "",
    };
    setFilters(clearedFilters);
    fetchJobs(clearedFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Cơ hội nghề nghiệp tại TechLeet
            </h1>
            <p className="text-lg text-muted-foreground">
              Khám phá {jobs.length > 0 ? `${jobs.length}+` : ''} vị trí công việc hấp dẫn 
              và bắt đầu hành trình phát triển sự nghiệp của bạn.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo vị trí, kỹ năng, công ty..."
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 h-12 bg-background"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-6"
                >
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  Bộ lọc
                  {Object.values(filters).some(v => v !== "") && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {Object.values(filters).filter(v => v !== "").length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                 <JobFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner size="lg" />
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-card rounded-xl border shadow-sm">
                  <div className="text-destructive mb-4 text-lg font-medium">{error}</div>
                  <Button onClick={() => fetchJobs(filters)} variant="outline">
                    Thử lại
                  </Button>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border shadow-sm">
                  <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Filter className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Không tìm thấy việc làm phù hợp
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn để tìm thấy nhiều kết quả hơn.
                  </p>
                  <Button onClick={clearFilters} variant="secondary">
                    Xóa tất cả bộ lọc
                  </Button>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-muted-foreground">
                      Hiển thị <span className="font-medium text-foreground">{jobs.length}</span> việc làm
                      {filters.search && <span className="text-muted-foreground"> cho "{filters.search}"</span>}
                    </p>
                  </div>

                  {/* Jobs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                      <JobCard key={job.jobPostingId} job={job} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

