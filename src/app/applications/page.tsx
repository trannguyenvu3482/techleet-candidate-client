"use client";

import { useState, useEffect, useCallback, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  Building2,
  Download,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowUpDown,
  X,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Application, JobPosting } from "@/lib/api";
import {
  formatDate,
  formatRelativeTime,
  isValidEmail,
  formatCurrency,
} from "@/lib/utils";
import Link from "next/link";

interface ApplicationWithJob extends Application {
  job?: JobPosting;
}

const EMAIL_STORAGE_KEY = "techleet_applications_email";

function ApplicationsContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    document.title = "My Applications | TechLeet Careers";

    const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
    }

    return () => {
      document.title = "TechLeet";
    };
  }, []);

  const getStatusColor = (status?: string): string => {
    if (!status) return "gray";

    const statusColors: Record<string, string> = {
      submitted: "blue",
      screening: "yellow",
      screening_passed: "green",
      screening_failed: "orange",
      interviewing: "purple",
      offer: "green",
      hired: "green",
      rejected: "red",
      withdrawn: "gray",
      passed_exam: "green",
      failed_exam: "red",
    };

    return statusColors[status] || "gray";
  };

  const getStatusLabel = (status?: string): string => {
    if (!status) return "Chưa xác định";

    const statusLabels: Record<string, string> = {
      submitted: "Đã gửi",
      screening: "Đang xem xét",
      screening_passed: "Đã qua sàng lọc",
      screening_failed: "Không qua sàng lọc",
      interviewing: "Phỏng vấn",
      offer: "Nhận offer",
      hired: "Đã tuyển",
      rejected: "Từ chối",
      withdrawn: "Đã hủy",
      passed_exam: "Đã qua bài test",
      failed_exam: "Không qua bài test",
    };

    return statusLabels[status] || status;
  };

  const getProgressStep = (
    status?: string,
    screeningStatus?: string
  ): number => {
    if (!status) return 1;

    if (status === "interviewing") return 3;
    if (
      status === "offer" ||
      status === "hired" ||
      status === "rejected" ||
      status === "withdrawn"
    ) {
      return 4;
    }

    if (status === "screening_passed") return 3;

    if (status === "screening_failed") return 2;

    if (status === "submitted" || status === "screening") {
      if (screeningStatus) {
        if (
          screeningStatus === "pending" ||
          screeningStatus === "processing" ||
          screeningStatus === "completed" ||
          screeningStatus === "passed" ||
          screeningStatus === "screening_passed"
        ) {
          return 2;
        }
        if (
          screeningStatus === "failed" ||
          screeningStatus === "screening_failed"
        ) {
          return 2;
        }
      }
      if (status === "submitted") return 1;
      if (status === "screening") return 2;
    }

    return 1;
  };

  const getProgressSteps = () => [
    { label: "Đã gửi", step: 1 },
    { label: "Đang xử lí", step: 2 },
    { label: "Đang sắp xếp lịch phỏng vấn", step: 3 },
    { label: "Hoàn tất", step: 4 },
  ];

  const handleSearchWithEmail = useCallback(async (emailToSearch: string) => {
    if (!emailToSearch.trim()) {
      return;
    }

    if (!isValidEmail(emailToSearch.trim())) {
      setError(
        "Email không hợp lệ. Vui lòng nhập địa chỉ email đúng định dạng."
      );
      setHasSearched(false);
      return;
    }

    setSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      const apps = await api.getApplicationsByEmail(emailToSearch.trim());

      if (apps.length === 0) {
        setApplications([]);
        localStorage.setItem(EMAIL_STORAGE_KEY, emailToSearch.trim());
        return;
      }

      const applicationsWithJobs: ApplicationWithJob[] = await Promise.all(
        apps.map(async (app) => {
          try {
            const job = await api.getJobPosting(app.jobPostingId);
            return {
              ...app,
              job,
            };
          } catch (err) {
            console.error(`Failed to fetch job ${app.jobPostingId}:`, err);
            return app;
          }
        })
      );

      setApplications(applicationsWithJobs);
      localStorage.setItem(EMAIL_STORAGE_KEY, emailToSearch.trim());
    } catch (err) {
      console.error("Error searching applications:", err);
      if (err instanceof ApiError) {
        if (err.status === 404) {
          setError(
            "Không tìm thấy đơn ứng tuyển nào với email này. Vui lòng kiểm tra lại email bạn đã sử dụng khi ứng tuyển."
          );
        } else if (err.status === 400) {
          setError(
            "Email không hợp lệ. Vui lòng nhập địa chỉ email đúng định dạng."
          );
        } else if (err.status >= 500) {
          setError("Lỗi hệ thống. Vui lòng thử lại sau.");
        } else {
          setError(
            err.message || `Lỗi ${err.status}: Không thể tìm thấy đơn ứng tuyển`
          );
        }
      } else {
        setError(
          "Có lỗi xảy ra khi tìm kiếm đơn ứng tuyển. Vui lòng kiểm tra kết nối internet và thử lại."
        );
      }
      setApplications([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleSearch = async () => {
    if (!email.trim()) {
      setError("Vui lòng nhập email của bạn");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError(
        "Email không hợp lệ. Vui lòng nhập địa chỉ email đúng định dạng."
      );
      return;
    }

    await handleSearchWithEmail(email);
  };

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      setHasSearched(false);
      handleSearchWithEmail(emailParam);
    }
  }, [searchParams, handleSearchWithEmail]);

  const toggleSection = (applicationId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [applicationId]: !prev[applicationId],
    }));
  };

  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(
        a.appliedAt || a.appliedDate || a.createdAt || 0
      ).getTime();
      const dateB = new Date(
        b.appliedAt || b.appliedDate || b.createdAt || 0
      ).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [applications, statusFilter, sortOrder]);

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "submitted", label: "Đã gửi" },
    { value: "screening", label: "Đang xem xét" },
    { value: "screening_passed", label: "Đã qua sàng lọc" },
    { value: "interviewing", label: "Phỏng vấn" },
    { value: "offer", label: "Nhận offer" },
    { value: "hired", label: "Đã tuyển" },
    { value: "rejected", label: "Từ chối" },
    { value: "withdrawn", label: "Đã hủy" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Đơn ứng tuyển của tôi
            </h1>
            <p className="text-gray-600 mb-6">
              Nhập email bạn đã sử dụng khi ứng tuyển để xem trạng thái các đơn
              ứng tuyển của bạn.
            </p>

            {/* Search Form */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Nhập email của bạn (ví dụ: your.email@example.com)"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="pl-10 h-12"
                  aria-invalid={
                    error && error.includes("Email") ? true : undefined
                  }
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={searching}
                className="h-12 px-8"
              >
                {searching ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Đang tìm...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Tìm kiếm
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                  {error.includes("Không tìm thấy") && (
                    <p className="text-red-700 text-xs mt-2">
                      Hãy đảm bảo bạn đã nhập đúng email đã sử dụng khi nộp đơn
                      ứng tuyển.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Đóng thông báo lỗi"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {hasSearched && !searching && applications.length === 0 && !error && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy đơn ứng tuyển
              </h3>
              <p className="text-gray-600 mb-4">
                Không có đơn ứng tuyển nào được tìm thấy với email này.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Nếu bạn chắc chắn đã nộp đơn, vui lòng kiểm tra lại email hoặc
                liên hệ với chúng tôi để được hỗ trợ.
              </p>
              <Button
                onClick={() => {
                  setHasSearched(false);
                  setEmail("");
                  setApplications([]);
                  setError(null);
                }}
                variant="outline"
              >
                Tìm kiếm lại
              </Button>
            </div>
          )}

          {applications.length > 0 && (
            <div className="space-y-6">
              {/* Filter and Sort Controls */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="status-filter"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <Filter className="inline h-4 w-4 mr-1" />
                      Lọc theo trạng thái
                    </label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="sort-order"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <ArrowUpDown className="inline h-4 w-4 mr-1" />
                      Sắp xếp
                    </label>
                    <select
                      id="sort-order"
                      value={sortOrder}
                      onChange={(e) =>
                        setSortOrder(e.target.value as "newest" | "oldest")
                      }
                      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="newest">Mới nhất trước</option>
                      <option value="oldest">Cũ nhất trước</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Hiển thị{" "}
                    <span className="font-medium text-gray-900">
                      {filteredAndSortedApplications.length}
                    </span>{" "}
                    / {applications.length} đơn ứng tuyển
                  </p>
                </div>
              </div>

              {filteredAndSortedApplications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có đơn ứng tuyển nào phù hợp
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thử thay đổi bộ lọc để xem thêm kết quả.
                  </p>
                  <Button
                    onClick={() => {
                      setStatusFilter("all");
                      setSortOrder("newest");
                    }}
                    variant="outline"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedApplications.map((app) => {
                    const isExpanded =
                      expandedSections[app.applicationId || 0] || false;
                    const statusColor = getStatusColor(app.status);
                    const statusLabel = getStatusLabel(app.status);
                    const statusColorClasses: Record<string, string> = {
                      blue: "bg-blue-100 text-blue-800 border-blue-200",
                      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
                      green: "bg-green-100 text-green-800 border-green-200",
                      orange: "bg-orange-100 text-orange-800 border-orange-200",
                      purple: "bg-purple-100 text-purple-800 border-purple-200",
                      red: "bg-red-100 text-red-800 border-red-200",
                      gray: "bg-gray-100 text-gray-800 border-gray-200",
                    };

                    return (
                      <div
                        key={app.applicationId}
                        className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Building2 className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                    {app.job ? (
                                      <Link
                                        href={`/jobs/${
                                          app.job.slug || app.job.jobPostingId
                                        }`}
                                        className="hover:text-blue-600 hover:underline transition-colors"
                                      >
                                        {app.job.title}
                                      </Link>
                                    ) : (
                                      <span className="flex items-center gap-2">
                                        <LoadingSpinner size="sm" />
                                        Đang tải thông tin việc làm...
                                      </span>
                                    )}
                                  </h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${
                                      statusColorClasses[statusColor] ||
                                      statusColorClasses.gray
                                    }`}
                                  >
                                    {statusLabel}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Nộp đơn:{" "}
                                    {app.appliedAt || app.appliedDate ? (
                                      <span>
                                        {formatRelativeTime(
                                          app.appliedAt || app.appliedDate!
                                        )}{" "}
                                        (
                                        {formatDate(
                                          app.appliedAt || app.appliedDate!
                                        )}
                                        )
                                      </span>
                                    ) : (
                                      "N/A"
                                    )}
                                  </span>
                                  {app.screeningScore !== undefined &&
                                    app.screeningScore !== null && (
                                      <span className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                      Điểm: {Number(app.screeningScore).toFixed(1)}
                                      /100
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          {app.job && (
                            <div className="ml-16 mb-4">
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {app.job.description?.substring(0, 150)}...
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {app.applicationId && (
                            <span className="text-xs text-gray-500">
                              ID: #{app.applicationId}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6 pt-6 border-t">
                        <div className="w-full">
                          {(() => {
                            const currentStep = getProgressStep(
                              app.status,
                              app.screeningStatus
                            );
                            return (
                              <div className="relative flex items-center justify-between">
                                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                                  <div
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{
                                      width:
                                        currentStep === 1
                                          ? "0%"
                                          : `${
                                              ((currentStep - 1) /
                                                (getProgressSteps().length -
                                                  1)) *
                                              100
                                            }%`,
                                    }}
                                  />
                                </div>

                                {getProgressSteps().map((stepItem) => {
                                  const isCompleted =
                                    currentStep > stepItem.step;
                                  const isCurrent =
                                    currentStep === stepItem.step;
                                  const isActive =
                                    currentStep >= stepItem.step;

                                  return (
                                    <div
                                      key={stepItem.step}
                                      className="flex flex-col items-center relative z-10 flex-1"
                                    >
                                      <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                          isCompleted
                                            ? "bg-blue-600 text-white shadow-md"
                                            : isCurrent
                                            ? "bg-blue-100 text-blue-600 border-2 border-blue-600 shadow-sm"
                                            : "bg-gray-200 text-gray-500"
                                        }`}
                                      >
                                        {isCompleted ? (
                                          <CheckCircle className="h-5 w-5" />
                                        ) : isCurrent ? (
                                          <Clock className="h-5 w-5" />
                                        ) : (
                                          stepItem.step
                                        )}
                                      </div>
                                      <span
                                        className={`mt-2 text-xs text-center px-1 ${
                                          isActive
                                            ? "text-gray-900 font-medium"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        {stepItem.label}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Application Details */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Ngày nộp:</span>
                            <span className="ml-2 font-medium">
                              {app.appliedAt || app.appliedDate
                                ? formatDate(
                                    app.appliedAt || app.appliedDate!
                                  )
                                : "N/A"}
                            </span>
                          </div>
                          {app.job && (
                            <div>
                              <span className="text-gray-600">Vị trí:</span>
                              <Link
                                href={`/jobs/${
                                  app.job.slug || app.job.jobPostingId
                                }`}
                                className="ml-2 font-medium text-blue-600 hover:underline inline-flex items-center gap-1"
                              >
                                {app.job.title}
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </div>
                          )}
                        </div>

                        {/* Additional Information Section */}
                        {(app.resumeUrl ||
                          app.coverLetter ||
                          app.screeningScore !== undefined) && (
                          <div className="mt-4 pt-4 border-t">
                            <button
                              onClick={() =>
                                toggleSection(app.applicationId || 0)
                              }
                              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                              <span>Thông tin chi tiết</span>
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="mt-4 space-y-4">
                                {app.resumeUrl && (
                                  <div>
                                    <label className="text-xs font-medium text-gray-600 block mb-1">
                                      CV/Resume
                                    </label>
                                    <a
                                      href={app.resumeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      <Download className="h-4 w-4" />
                                      Tải xuống CV
                                    </a>
                                  </div>
                                )}

                                {app.coverLetter && (
                                  <div>
                                    <label className="text-xs font-medium text-gray-600 block mb-2">
                                      Thư xin việc
                                    </label>
                                    <div className="p-3 bg-gray-50 rounded-md border text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                                      {app.coverLetter}
                                    </div>
                                  </div>
                                )}

                                {app.screeningScore !== undefined &&
                                  app.screeningScore !== null && (
                                    <div>
                                      <label className="text-xs font-medium text-gray-600 block mb-1">
                                        Điểm sàng lọc CV
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                          <div
                                            className={`h-2 rounded-full ${
                                              Number(app.screeningScore) >= 70
                                                ? "bg-green-600"
                                                : Number(app.screeningScore) >= 50
                                                ? "bg-yellow-600"
                                                : "bg-red-600"
                                            }`}
                                            style={{
                                              width: `${Number(app.screeningScore)}%`,
                                            }}
                                          />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                          {Number(app.screeningScore).toFixed(1)}/100
                                        </span>
                                        </div>
                                      </div>
                                    )}

                                  {app.screeningCompletedAt && (
                                    <div>
                                      <label className="text-xs font-medium text-gray-600 block mb-1">
                                        Hoàn thành sàng lọc
                                      </label>
                                      <span className="text-sm text-gray-700">
                                        {formatDate(app.screeningCompletedAt)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Offer Details */}
                        {app.status === "offer" &&
                          (app.offeredSalary ||
                            app.offerDate ||
                            app.offerExpiryDate) && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="font-medium text-green-900 mb-3">
                                Chi tiết Offer
                              </h4>
                              <div className="space-y-2 text-sm">
                                {app.offeredSalary && (
                                  <div>
                                    <span className="text-green-700 font-medium">
                                      Mức lương đề xuất:{" "}
                                    </span>
                                    <span className="text-green-900">
                                      {app.formattedOfferedSalary ||
                                        formatCurrency(app.offeredSalary)}
                                    </span>
                                  </div>
                                )}
                                {app.offerDate && (
                                  <div>
                                    <span className="text-green-700 font-medium">
                                      Ngày offer:{" "}
                                    </span>
                                    <span className="text-green-900">
                                      {formatDate(app.offerDate)}
                                    </span>
                                  </div>
                                )}
                                {app.offerExpiryDate && (
                                  <div>
                                    <span className="text-green-700 font-medium">
                                      Hạn phản hồi:{" "}
                                    </span>
                                    <span className="text-green-900">
                                      {formatDate(app.offerExpiryDate)}
                                      {app.daysUntilOfferExpiry !== undefined &&
                                        app.daysUntilOfferExpiry > 0 && (
                                          <span className="ml-2 text-xs">
                                            ({app.daysUntilOfferExpiry} ngày còn
                                            lại)
                                          </span>
                                        )}
                                    </span>
                                  </div>
                                )}
                                {app.expectedStartDate && (
                                  <div>
                                    <span className="text-green-700 font-medium">
                                      Ngày bắt đầu dự kiến:{" "}
                                    </span>
                                    <span className="text-green-900">
                                      {formatDate(app.expectedStartDate)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                        {/* Rejection Reason */}
                        {app.status === "rejected" && app.rejectionReason && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h4 className="font-medium text-red-900 mb-2">
                              Lý do từ chối
                            </h4>
                            <p className="text-sm text-red-800">
                              {app.rejectionReason}
                            </p>
                          </div>
                        )}

                        {/* Status-specific messages */}
                        {app.status === "screening" && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                              Đơn của bạn đang được xem xét bởi đội ngũ HR.
                              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm
                              nhất.
                            </p>
                          </div>
                        )}

                        {app.status === "interviewing" && (
                          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <p className="text-sm text-purple-800">
                              Bạn đã được chọn vào vòng phỏng vấn! Chúng tôi sẽ
                              liên hệ để sắp xếp lịch phỏng vấn.
                            </p>
                          </div>
                        )}

                        {app.status === "offer" &&
                          !app.offeredSalary &&
                          !app.offerDate && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-800">
                                Chúc mừng! Bạn đã nhận được offer từ TechLeet.
                                Vui lòng kiểm tra email để xem chi tiết.
                              </p>
                            </div>
                          )}

                        {app.status === "rejected" && !app.rejectionReason && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">
                              Cảm ơn bạn đã quan tâm đến TechLeet. Tiếc là lần
                              này chúng tôi không thể tiếp tục với đơn của bạn.
                            </p>
                          </div>
                        )}

                        {app.status === "hired" && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              🎉 Chúc mừng! Bạn đã được tuyển dụng. Chúng tôi
                              rất mong được làm việc cùng bạn!
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tra cứu đơn ứng tuyển
              </h3>
              <p className="text-gray-600 mb-4">
                Nhập email bạn đã sử dụng khi ứng tuyển để xem trạng thái các
                đơn ứng tuyển của bạn.
              </p>
              <p className="text-sm text-gray-500">
                Email của bạn sẽ được lưu lại để tiện tra cứu lần sau.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <ApplicationsContent />
    </Suspense>
  );
}
