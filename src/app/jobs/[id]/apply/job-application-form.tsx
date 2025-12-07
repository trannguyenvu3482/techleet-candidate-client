"use client";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { api, ApiError } from "@/lib/api";
import type { JobPosting, CompanyDepartment, CompanyHeadquarter } from "@/lib/api";
import { formatSalaryRange, extractJobIdFromSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Upload,
  X,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Zod schema for form validation
const applicationFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "Họ là bắt buộc").min(2, "Họ phải có ít nhất 2 ký tự"),
  lastName: z.string().min(1, "Tên là bắt buộc").min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().min(1, "Email là bắt buộc").email({ message: "Email không hợp lệ" }),
  phoneNumber: z.string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ"),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  
  // Professional Information
  education: z.string().min(1, "Học vấn là bắt buộc").min(10, "Vui lòng mô tả chi tiết hơn về học vấn"),
  workExperience: z.string().min(1, "Kinh nghiệm làm việc là bắt buộc").min(20, "Vui lòng mô tả chi tiết hơn về kinh nghiệm"),
  skills: z.string().min(1, "Kỹ năng là bắt buộc").min(10, "Vui lòng liệt kê chi tiết các kỹ năng"),
  certifications: z.string().optional(),
  portfolioUrl: z.string().url({ message: "URL không hợp lệ" }).optional().or(z.literal("")),
  linkedinUrl: z.string().url({ message: "URL LinkedIn không hợp lệ" }).optional().or(z.literal("")),
  
  // Application Specific
  coverLetter: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

interface JobApplicationFormProps {
  job: JobPosting;
}

export function JobApplicationForm({ job }: JobApplicationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [headquarters, setHeadquarters] = useState<CompanyHeadquarter[]>([]);
  const [departments, setDepartments] = useState<CompanyDepartment[]>([]);
  const [loadingCompanyData, setLoadingCompanyData] = useState(true);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  
  const STORAGE_KEY = `job_application_draft_${job.jobPostingId}`;
  const TOTAL_STEPS = 4;

  // Initialize React Hook Form with Zod validation
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onBlur", // Validate on blur for real-time feedback
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      city: "",
      postalCode: "",
      education: "",
      workExperience: "",
      skills: "",
      certifications: "",
      portfolioUrl: "",
      linkedinUrl: "",
      coverLetter: "",
    },
  });

  // Load draft data from localStorage on mount
  useEffect(() => {
    try {
      const draftData = localStorage.getItem(STORAGE_KEY);
      if (draftData) {
        const parsed = JSON.parse(draftData);
        if (parsed && parsed.formData) {
          form.reset(parsed.formData);
          setHasDraft(true);
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, [STORAGE_KEY, form]);

  // Auto-save form data to localStorage
  useEffect(() => {
    const subscription = form.watch((data) => {
      try {
        const draft = {
          formData: data,
          jobId: job.jobPostingId,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        setHasDraft(true);
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, STORAGE_KEY, job.jobPostingId]);

  // Clear draft after successful submission
  const clearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasDraft(false);
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  };

  // Update page title when component mounts
  useEffect(() => {
    document.title = `Apply for ${job.title} | TechLeet Careers`;
    
    return () => {
      document.title = "TechLeet";
    };
  }, [job.title]);

  // Load company data
  useEffect(() => {
    const loadCompanyData = async () => {
      setLoadingCompanyData(true);
      try {
        const [hqData, deptData] = await Promise.all([
          api.getHeadquarters().catch(() => []),
          api.getDepartments().catch(() => [])
        ]);
        setHeadquarters(hqData);
        setDepartments(deptData);
      } catch (error) {
        console.error('Error loading company data:', error);
      } finally {
        setLoadingCompanyData(false);
      }
    };

    loadCompanyData();
  }, []);

  const getLocationName = (headquarterId?: number) => {
    if (!headquarterId) return "Hồ Chí Minh";
    if (!Array.isArray(headquarters) || headquarters.length === 0) {
      return "Hồ Chí Minh";
    }
    const hq = headquarters.find(h => h.headquarterId === headquarterId);
    return hq?.city || "Hồ Chí Minh";
  };

  const getDepartmentName = (departmentId: number) => {
    if (!Array.isArray(departments) || departments.length === 0) {
      return "Engineering";
    }
    const dept = departments.find(d => d.departmentId === departmentId);
    return dept?.departmentName || "Engineering";
  };

  // React Dropzone for file upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some(e => e.code === 'file-too-large')) {
          setFileError('File không được vượt quá 5MB');
        } else if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
          setFileError('Chỉ chấp nhận file PDF, DOC, DOCX');
        }
        return;
      }
      
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setResumeFile(file);
        setFileError(null);
        
        // Preview PDF files
        if (file.type === 'application/pdf') {
          const reader = new FileReader();
          reader.onload = (e) => {
            setResumePreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setResumePreview(null);
        }
      }
    },
  });

  const removeFile = () => {
    setResumeFile(null);
    setResumePreview(null);
  };

  const steps = [
    { id: 1, name: 'Thông tin cá nhân', description: 'Họ tên, email, số điện thoại' },
    { id: 2, name: 'Thông tin nghề nghiệp', description: 'Học vấn, kinh nghiệm, kỹ năng' },
    { id: 3, name: 'CV/Resume', description: 'Tải lên CV của bạn' },
    { id: 4, name: 'Thư xin việc', description: 'Viết thư xin việc (tùy chọn)' },
  ];

  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      // Validate current step before proceeding
      const fieldsToValidate = getFieldsForStep(currentStep);
      form.trigger(fieldsToValidate).then((isValid) => {
        if (isValid) {
          setCurrentStep(currentStep + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getFieldsForStep = (step: number): (keyof ApplicationFormData)[] => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phoneNumber'];
      case 2:
        return ['education', 'workExperience', 'skills'];
      case 3:
        return [];
      case 4:
        return [];
      default:
        return [];
    }
  };

  const handleFormSubmit = (_data: ApplicationFormData) => {
    if (!resumeFile) {
      setFileError('Vui lòng tải lên CV của bạn');
      return;
    }

    // Show confirmation dialog
    setPendingSubmit(true);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingSubmit) return;
    
    setShowConfirmDialog(false);
    const data = form.getValues();
    await onSubmit(data);
    setPendingSubmit(false);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setSubmitting(true);
    setError(null);
    setFileError(null);
    setUploadProgress(0);
    
    try {
      // Extract job ID from slug if needed
      const jobId = extractJobIdFromSlug(job.slug || '') || job.jobPostingId;

      // Step 1: Create candidate profile
      setUploadProgress(20);
      const candidateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthDate: data.dateOfBirth || undefined,
        address: data.address || undefined,
        city: data.city || undefined,
        postalCode: data.postalCode || undefined,
        educationLevel: data.education || undefined,
        skills: data.skills || undefined,
        programmingLanguages: data.skills || undefined,
        certifications: data.certifications || undefined,
        portfolioUrl: data.portfolioUrl || undefined,
        linkedInUrl: data.linkedinUrl || undefined,
        summary: data.workExperience || undefined,
      };

      let candidate;
      try {
        candidate = await api.createCandidate(candidateData);
      } catch (candidateError) {
        // If candidate already exists (email duplicate), provide better error message
        if (candidateError instanceof ApiError && candidateError.status === 400) {
          const errorMessage = candidateError.message || '';
          if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('duplicate')) {
            throw new Error('Email này đã được sử dụng trong hệ thống. Nếu bạn đã ứng tuyển trước đó, vui lòng liên hệ với chúng tôi để cập nhật thông tin. Hoặc bạn có thể sử dụng email khác để tiếp tục.');
          }
          throw new Error(errorMessage || 'Thông tin không hợp lệ. Vui lòng kiểm tra lại và thử lại.');
        }
        throw candidateError;
      }

      setUploadProgress(40);

      // Step 2: Upload resume file
      if (!resumeFile) {
        throw new Error('Vui lòng tải lên CV của bạn');
      }
      const fileUploadResult = await api.uploadResume(resumeFile, jobId, candidate.candidateId);
      setUploadProgress(60);

      // Step 3: Create application
      const applicationData = {
        candidateId: candidate.candidateId!,
        jobPostingId: jobId,
        coverLetter: data.coverLetter || undefined,
        resumeUrl: fileUploadResult.fileUrl,
        // Do not send status - backend will set it to 'submitted' automatically
      };

      const application = await api.createApplication(applicationData);
      setUploadProgress(100);

      setApplicationId(application.applicationId || null);
      clearDraft(); // Clear draft after successful submission
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      
      if (err instanceof ApiError) {
        if (err.status === 400) {
          setError(err.message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.');
        } else if (err.status === 401 || err.status === 403) {
          setError('Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập.');
        } else if (err.status >= 500) {
          setError('Lỗi hệ thống. Vui lòng thử lại sau.');
        } else {
          setError(err.message || `Lỗi ${err.status}: Không thể nộp hồ sơ.`);
        }
      } else if (err instanceof Error) {
        setError(err.message || 'Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại.');
      } else {
        setError('Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại.');
      }
      
      // Focus on first error field
      const firstErrorField = Object.keys(form.formState.errors)[0];
      if (firstErrorField) {
        const fieldElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
        if (fieldElement) {
          setTimeout(() => {
            fieldElement.focus();
            fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 py-8">
        <div className="max-w-lg mx-auto text-center bg-white dark:bg-zinc-900 rounded-lg shadow-sm border dark:border-zinc-800 p-6 sm:p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ứng tuyển thành công!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Cảm ơn bạn đã ứng tuyển vào vị trí <strong className="text-blue-600">{job.title}</strong>. 
            Chúng tôi sẽ xem xét hồ sơ và liên hệ với bạn trong thời gian sớm nhất.
          </p>
          {applicationId && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-1">Mã đơn ứng tuyển:</p>
              <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">#{applicationId}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Vui lòng lưu mã này để theo dõi trạng thái đơn ứng tuyển
              </p>
            </div>
          )}
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Các bước tiếp theo:</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Chúng tôi sẽ xem xét hồ sơ của bạn trong vòng 5-7 ngày làm việc</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Nếu phù hợp, chúng tôi sẽ liên hệ qua email hoặc số điện thoại bạn đã cung cấp</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bạn có thể xem thêm các vị trí tuyển dụng khác phù hợp với bạn</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/jobs">
                Xem thêm việc làm khác
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/jobs/${job.slug}`}>
                Quay lại chi tiết việc làm
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Trang chủ</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-blue-600 dark:hover:text-blue-400">Việc làm</Link>
            <span>/</span>
            <Link href={`/jobs/${job.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">{job.title}</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Ứng tuyển</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <BackButton className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </BackButton>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border dark:border-zinc-800 p-4 sm:p-6 lg:p-8">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  <span className="block sm:inline">Ứng tuyển vào vị trí:</span>
                  <span className="block sm:inline sm:ml-1 text-blue-600 dark:text-blue-400">{job.title}</span>
                </h1>

                {/* Draft indicator */}
                {hasDraft && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-800 dark:text-blue-300">
                        Bạn có bản nháp đã lưu. Dữ liệu sẽ được tự động lưu khi bạn điền form.
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm('Bạn có chắc muốn xóa bản nháp?')) {
                          clearDraft();
                          form.reset();
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Xóa nháp
                    </Button>
                  </div>
                )}

                {/* Progress Steps */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <button
                            type="button"
                            onClick={() => goToStep(step.id)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                              currentStep === step.id
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : currentStep > step.id
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-white border-gray-300 text-gray-400'
                            }`}
                            disabled={currentStep < step.id}
                          >
                            {currentStep > step.id ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </button>
                          <div className="mt-2 text-center hidden sm:block">
                            <p className={`text-xs font-medium ${
                              currentStep === step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {step.name}
                            </p>
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-2 ${
                            currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bước {currentStep} / {TOTAL_STEPS}: {steps[currentStep - 1].description}
                    </p>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" id="personal-info">
                          Thông tin cá nhân
                        </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Họ *</FormLabel>
                              <FormControl>
                                <Input placeholder="Nguyễn" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tên *</FormLabel>
                              <FormControl>
                                <Input placeholder="Văn An" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="an.nguyen@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Số điện thoại *</FormLabel>
                              <FormControl>
                                <Input placeholder="0901 234 567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ngày sinh</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Địa chỉ</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Nguyễn Huệ, Quận 1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thành phố</FormLabel>
                              <FormControl>
                                <Input placeholder="Hồ Chí Minh" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      </div>
                    )}

                    {/* Step 2: Professional Information */}
                    {currentStep === 2 && (
                      <div id="professional-info">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Thông tin nghề nghiệp
                        </h2>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="education"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Học vấn *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Ví dụ: Cử nhân Công nghệ Thông tin - Đại học Bách Khoa TP.HCM (2020-2024)"
                                  rows={3}
                                  maxLength={500}
                                  {...field} 
                                />
                              </FormControl>
                              <div className="flex justify-between items-center">
                                <FormMessage />
                                <span className="text-xs text-muted-foreground">
                                  {field.value?.length || 0}/500
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="workExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kinh nghiệm làm việc *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Mô tả kinh nghiệm làm việc của bạn..."
                                  rows={4}
                                  maxLength={1000}
                                  {...field} 
                                />
                              </FormControl>
                              <div className="flex justify-between items-center">
                                <FormMessage />
                                <span className="text-xs text-muted-foreground">
                                  {field.value?.length || 0}/1000
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kỹ năng *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Ví dụ: JavaScript, React, Node.js, PostgreSQL..."
                                  rows={3}
                                  maxLength={500}
                                  {...field} 
                                />
                              </FormControl>
                              <div className="flex justify-between items-center">
                                <FormMessage />
                                <span className="text-xs text-muted-foreground">
                                  {field.value?.length || 0}/500
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="certifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chứng chỉ</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Ví dụ: AWS Certified Developer, Google Cloud Professional..."
                                  rows={3}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="portfolioUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Portfolio URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://portfolio.example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="linkedinUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>LinkedIn URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      </div>
                    )}

                    {/* Step 3: Resume Upload */}
                    {currentStep === 3 && (
                      <div id="resume-section">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                          CV/Resume
                        </h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tải lên CV *
                        </label>
                        <div 
                          {...getRootProps()} 
                          role="button"
                          aria-label="Tải lên CV"
                          aria-describedby="resume-upload-description"
                          tabIndex={0}
                          className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                            isDragActive 
                              ? 'border-blue-400 bg-blue-50' 
                              : resumeFile 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input {...getInputProps()} aria-label="Chọn file CV" />
                          <span id="resume-upload-description" className="sr-only">
                            Chọn file CV ở định dạng PDF, DOC hoặc DOCX, tối đa 5MB
                          </span>
                          {resumeFile ? (
                            <div className="space-y-2">
                              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                              <div className="flex items-center justify-center text-sm text-green-600">
                                <FileText className="h-4 w-4 mr-1" />
                                {resumeFile.name}
                              </div>
                              <p className="text-xs text-gray-500">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile();
                                }}
                                className="mt-2"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Xóa file
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <div className="text-sm text-gray-600 mb-2">
                                {isDragActive ? (
                                  "Thả file vào đây..."
                                ) : (
                                  "Kéo thả file hoặc click để chọn file"
                                )}
                              </div>
                              <p className="text-xs text-gray-500">PDF, DOC, DOCX (tối đa 5MB)</p>
                            </div>
                          )}
                        </div>
                        {fileError && (
                          <p className="text-red-500 text-sm mt-1">{fileError}</p>
                        )}

                        {/* PDF Preview */}
                        {resumePreview && resumeFile?.type === 'application/pdf' && (
                          <div className="mt-4 border rounded-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Xem trước PDF</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setResumePreview(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="h-96 overflow-auto">
                              <iframe
                                src={resumePreview}
                                className="w-full h-full"
                                title="PDF Preview"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      </div>
                    )}

                    {/* Step 4: Cover Letter */}
                    {currentStep === 4 && (
                      <div id="cover-letter-section">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                          Thư xin việc (tùy chọn)
                        </h2>
                      
                      <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thư xin việc</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Viết thư xin việc để thể hiện sự quan tâm và phù hợp với vị trí..."
                                rows={6}
                                maxLength={2000}
                                {...field} 
                              />
                            </FormControl>
                            <div className="flex justify-between items-center">
                              <FormDescription>
                                Thư xin việc giúp nhà tuyển dụng hiểu rõ hơn về động lực và sự phù hợp của bạn với vị trí.
                              </FormDescription>
                              <span className="text-xs text-muted-foreground">
                                {field.value?.length || 0}/2000
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="pt-6 border-t flex items-center justify-between">
                      <div>
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Quay lại
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-3">
                        {currentStep < TOTAL_STEPS ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                          >
                            Tiếp theo
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            type="submit" 
                            disabled={submitting || !resumeFile}
                            size="lg"
                            aria-label="Nộp hồ sơ ứng tuyển"
                          >
                            {submitting ? (
                              <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Đang nộp hồ sơ... {uploadProgress > 0 && `(${uploadProgress}%)`}
                              </>
                            ) : (
                              'Nộp hồ sơ ứng tuyển'
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Error Display */}
                    <div className="pt-6 border-t">
                      {(error || fileError) && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-800 text-sm font-medium mb-1">Có lỗi xảy ra:</p>
                          <ul className="text-red-700 text-sm list-disc list-inside space-y-1">
                            {error && <li>{error}</li>}
                            {fileError && <li>{fileError}</li>}
                          </ul>
                        </div>
                      )}
                      
                      {Object.keys(form.formState.errors).length > 0 && (
                        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800 text-sm font-medium mb-1">
                            Vui lòng kiểm tra lại các trường sau:
                          </p>
                          <ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
                            {form.formState.errors.firstName && <li>Họ: {form.formState.errors.firstName.message}</li>}
                            {form.formState.errors.lastName && <li>Tên: {form.formState.errors.lastName.message}</li>}
                            {form.formState.errors.email && <li>Email: {form.formState.errors.email.message}</li>}
                            {form.formState.errors.phoneNumber && <li>Số điện thoại: {form.formState.errors.phoneNumber.message}</li>}
                            {form.formState.errors.education && <li>Học vấn: {form.formState.errors.education.message}</li>}
                            {form.formState.errors.workExperience && <li>Kinh nghiệm: {form.formState.errors.workExperience.message}</li>}
                            {form.formState.errors.skills && <li>Kỹ năng: {form.formState.errors.skills.message}</li>}
                            {form.formState.errors.portfolioUrl && <li>Portfolio URL: {form.formState.errors.portfolioUrl.message}</li>}
                            {form.formState.errors.linkedinUrl && <li>LinkedIn URL: {form.formState.errors.linkedinUrl.message}</li>}
                          </ul>
                        </div>
                      )}
                      
                      {submitting && uploadProgress > 0 && (
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* Job Summary Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-4 order-2 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin việc làm
                </h3>
                
                {loadingCompanyData ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{job.title}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">TechLeet • {getDepartmentName(job.departmentId)}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{getLocationName(job.headquarterId)}</span>
                        </div>
                        {(() => {
                          const min = job.minSalary || job.salaryMin;
                          const max = job.maxSalary || job.salaryMax;
                          return min && max ? (
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="font-medium text-green-600 truncate">
                                {formatSalaryRange(min, max)}
                              </span>
                            </div>
                          ) : null;
                        })()}
                        {job.applicationDeadline && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Hạn nộp: {new Date(job.applicationDeadline).toLocaleDateString('vi-VN')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Lưu ý quan trọng
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Đảm bảo thông tin chính xác và đầy đủ</li>
                  <li>• CV phải ở định dạng PDF, DOC hoặc DOCX</li>
                  <li>• Chúng tôi sẽ liên hệ trong vòng 5-7 ngày làm việc</li>
                  <li>• Mọi thông tin sẽ được bảo mật tuyệt đối</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Xác nhận nộp hồ sơ
            </h3>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-600">
                Bạn có chắc chắn muốn nộp hồ sơ ứng tuyển cho vị trí:
              </p>
              <p className="font-medium text-gray-900">{job.title}</p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                <p><strong>Họ tên:</strong> {form.getValues().firstName} {form.getValues().lastName}</p>
                <p><strong>Email:</strong> {form.getValues().email}</p>
                <p><strong>CV:</strong> {resumeFile?.name || 'Chưa chọn'}</p>
              </div>
              <p className="text-xs text-gray-500">
                Sau khi nộp, bạn sẽ không thể chỉnh sửa hồ sơ. Vui lòng kiểm tra lại thông tin trước khi xác nhận.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowConfirmDialog(false);
                  setPendingSubmit(false);
                }}
              >
                Hủy
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={handleConfirmSubmit}
              >
                Xác nhận nộp hồ sơ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
