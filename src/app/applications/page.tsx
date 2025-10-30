"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Search, FileText, Clock, CheckCircle, Calendar, Building2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Application, JobPosting } from "@/lib/api";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

interface ApplicationWithJob extends Application {
  job?: JobPosting;
}

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    document.title = "My Applications | TechLeet Careers";
    
    return () => {
      document.title = "TechLeet";
    };
  }, []);

  const getProgressStep = (status?: string, screeningStatus?: string): number => {
    // Nếu không có status, return step 1
    if (!status) return 1;

    // Nếu status đã ở các bước cao hơn, ưu tiên status
    if (status === 'interviewing') return 3;
    if (status === 'offer' || status === 'hired' || status === 'rejected' || status === 'withdrawn') {
      return 4;
    }

    // screening_passed nghĩa là đã qua screening, đang chờ sắp xếp phỏng vấn
    if (status === 'screening_passed') return 3;
    
    // screening_failed nghĩa là đã fail screening, nhưng vẫn ở bước xử lí
    if (status === 'screening_failed') return 2;

    // Nếu status là 'submitted' hoặc 'screening', kiểm tra screeningStatus
    if (status === 'submitted' || status === 'screening') {
      if (screeningStatus) {
        if (screeningStatus === 'pending' || 
            screeningStatus === 'processing' || 
            screeningStatus === 'completed' || 
            screeningStatus === 'passed' ||
            screeningStatus === 'screening_passed') {
          return 2; // Đang xử lí
        }
        if (screeningStatus === 'failed' || screeningStatus === 'screening_failed') {
          return 2; // Đang xử lí (nhưng đã fail)
        }
      }
      // Nếu không có screeningStatus hoặc screeningStatus không phải các giá trị trên
      if (status === 'submitted') return 1;
      if (status === 'screening') return 2;
    }
    
    return 1;
  };

  const getProgressSteps = () => [
    { label: 'Đã gửi', step: 1 },
    { label: 'Đang xử lí', step: 2 },
    { label: 'Đang sắp xếp lịch phỏng vấn', step: 3 },
    { label: 'Hoàn tất', step: 4 },
  ];

  const handleSearchWithEmail = useCallback(async (emailToSearch: string) => {
    if (!emailToSearch.trim()) {
      return;
    }

    setSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      const apps = await api.getApplicationsByEmail(emailToSearch.trim());
      
      if (apps.length === 0) {
        setApplications([]);
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
    } catch (err) {
      console.error('Error searching applications:', err);
      if (err instanceof ApiError) {
        setError(err.message || `Lỗi ${err.status}: Không thể tìm thấy đơn ứng tuyển`);
      } else {
        setError('Có lỗi xảy ra khi tìm kiếm đơn ứng tuyển. Vui lòng thử lại.');
      }
      setApplications([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleSearch = async () => {
    if (!email.trim()) {
      setError('Vui lòng nhập email của bạn');
      return;
    }
    await handleSearchWithEmail(email);
  };

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setHasSearched(false);
      handleSearchWithEmail(emailParam);
    }
  }, [searchParams, handleSearchWithEmail]);

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
              Nhập email bạn đã sử dụng khi ứng tuyển để xem trạng thái các đơn ứng tuyển của bạn.
            </p>

            {/* Search Form */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Nhập email của bạn (ví dụ: your.email@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="pl-10 h-12"
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
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
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
              <Button onClick={() => {
                setHasSearched(false);
                setEmail("");
                setApplications([]);
              }} variant="outline">
                Tìm kiếm lại
              </Button>
            </div>
          )}

          {applications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Đã tìm thấy {applications.length} đơn ứng tuyển
              </h2>
              
              {applications.map((app) => (
                <div key={app.applicationId} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {app.job ? (
                              <Link 
                                href={`/jobs/${app.job.slug || app.job.jobPostingId}`}
                                className="hover:text-blue-600 hover:underline transition-colors"
                              >
                                {app.job.title}
                              </Link>
                            ) : (
                              'Đang tải thông tin việc làm...'
                            )}
                          </h3>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Nộp đơn: {(app.appliedAt || app.appliedDate) ? formatRelativeTime(app.appliedAt || app.appliedDate!) : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {app.job && (
                        <div className="ml-16 mb-4">
                          <p className="text-sm text-gray-600">
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
                        const currentStep = getProgressStep(app.status, app.screeningStatus);
                        return (
                          <div className="relative flex items-center justify-between">
                            {/* Connection lines */}
                            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                              <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{
                                  width: currentStep === 1 
                                    ? '0%' 
                                    : `${((currentStep - 1) / (getProgressSteps().length - 1)) * 100}%`,
                                }}
                              />
                            </div>
                            
                            {/* Steps */}
                            {getProgressSteps().map((stepItem) => {
                              const isCompleted = currentStep > stepItem.step;
                              const isCurrent = currentStep === stepItem.step;
                              const isActive = currentStep >= stepItem.step;
                          
                          return (
                            <div key={stepItem.step} className="flex flex-col items-center relative z-10 flex-1">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                  isCompleted
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : isCurrent
                                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600 shadow-sm'
                                    : 'bg-gray-200 text-gray-500'
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
                                  isActive ? 'text-gray-900 font-medium' : 'text-gray-500'
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
                          {(app.appliedAt || app.appliedDate) ? formatDate(app.appliedAt || app.appliedDate!) : 'N/A'}
                        </span>
                      </div>
                      {app.job && (
                        <div>
                          <span className="text-gray-600">Vị trí:</span>
                          <Link href={`/jobs/${app.job.slug || app.job.jobPostingId}`} className="ml-2 font-medium text-blue-600 hover:underline">
                            {app.job.title}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status-specific messages */}
                  {app.status === 'screening' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Đơn của bạn đang được xem xét bởi đội ngũ HR. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                      </p>
                    </div>
                  )}
                  
                  {app.status === 'interviewing' && (
                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-800">
                        Bạn đã được chọn vào vòng phỏng vấn! Chúng tôi sẽ liên hệ để sắp xếp lịch phỏng vấn.
                      </p>
                    </div>
                  )}
                  
                  {app.status === 'offer' && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Chúc mừng! Bạn đã nhận được offer từ TechLeet. Vui lòng kiểm tra email để xem chi tiết.
                      </p>
                    </div>
                  )}
                  
                  {app.status === 'rejected' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        Cảm ơn bạn đã quan tâm đến TechLeet. Tiếc là lần này chúng tôi không thể tiếp tục với đơn của bạn.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tra cứu đơn ứng tuyển
              </h3>
              <p className="text-gray-600 mb-4">
                Nhập email bạn đã sử dụng khi ứng tuyển để xem trạng thái các đơn ứng tuyển của bạn.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

