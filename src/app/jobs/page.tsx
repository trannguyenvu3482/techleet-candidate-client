"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
// import { api, ApiError } from "@/lib/api"; // TODO: Use real API when backend is ready
import type { JobPosting } from "@/lib/api";
import { mockApi } from "@/data/mock-jobs";

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
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

  const JOBS_PER_PAGE = 5;

  // Fetch jobs function
  const fetchJobs = useCallback(async (pageNum: number, currentFilters: JobFilters, reset = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      // Build API parameters
      const params: Record<string, unknown> = {
        page: pageNum,
        limit: JOBS_PER_PAGE,
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

      // Use mock data for now, replace with real API later
      const newJobs = await mockApi.getJobPostings(params);

      console.log("JOBS: ", newJobs);
      

      if (reset || pageNum === 1) {
        setJobs(newJobs);
      } else {
        setJobs(prev => [...prev, ...newJobs]);
      }

      // Check if there are more jobs to load
      setHasMore(newJobs.length === JOBS_PER_PAGE);
      
    } catch (err) {
      console.error('Error fetching jobs:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Có lỗi xảy ra khi tải danh sách việc làm');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchJobs(1, filters);
  }, [fetchJobs, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setPage(1);
    fetchJobs(1, updatedFilters, true);
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    handleFilterChange({ search: searchTerm });
  };

  // Load more jobs
  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchJobs(nextPage, filters);
    }
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
    setPage(1);
    fetchJobs(1, clearedFilters, true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cơ hội nghề nghiệp tại TechLeet
            </h1>
            <p className="text-gray-600 mb-6">
              Khám phá {jobs.length > 0 ? `${jobs.length}+` : ''} vị trí công việc hấp dẫn 
              và bắt đầu hành trình phát triển sự nghiệp của bạn.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo vị trí, kỹ năng, công ty..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 h-12"
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
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {Object.values(filters).filter(v => v !== "").length}
                  </span>
                )}
              </Button>
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
              <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Jobs Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 mb-4">{error}</div>
                  <Button onClick={() => fetchJobs(1, filters, true)}>
                    Thử lại
                  </Button>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy việc làm phù hợp
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Xóa tất cả bộ lọc
                  </Button>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Hiển thị {jobs.length} việc làm
                      {filters.search && ` cho "${filters.search}"`}
                    </p>
                  </div>

                  {/* Jobs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                      <JobCard key={job.jobPostingId} job={job} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={loadMore}
                        disabled={loadingMore}
                        size="lg"
                        variant="outline"
                      >
                        {loadingMore ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Đang tải...
                          </>
                        ) : (
                          'Xem thêm việc làm'
                        )}
                      </Button>
                    </div>
                  )}

                  {/* End of Results */}
                  {!hasMore && jobs.length > 0 && (
                    <div className="text-center mt-8 py-6 border-t">
                      <p className="text-gray-500">
                        Bạn đã xem hết tất cả việc làm phù hợp
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
