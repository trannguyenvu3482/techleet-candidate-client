"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { BackButton } from "@/components/ui/back-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  X
} from "lucide-react";
import { formatSalaryRange } from "@/lib/utils";
import type { JobPosting } from "@/lib/api";
import { mockDepartments, mockHeadquarters } from "@/data/mock-jobs";

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
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Initialize React Hook Form with Zod validation
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
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

  // Update page title when component mounts
  useEffect(() => {
    document.title = `Apply for ${job.title} | TechLeet Careers`;
    
    return () => {
      document.title = "TechLeet";
    };
  }, [job.title]);

  const getLocationName = (headquarterId: number) => {
    const hq = mockHeadquarters.find(h => h.headquarterId === headquarterId);
    return hq?.city || "Hồ Chí Minh";
  };

  const getDepartmentName = (departmentId: number) => {
    const dept = mockDepartments.find(d => d.departmentId === departmentId);
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
          setError('File không được vượt quá 5MB');
        } else if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
          setError('Chỉ chấp nhận file PDF, DOC, DOCX');
        }
        return;
      }
      
      if (acceptedFiles.length > 0) {
        setResumeFile(acceptedFiles[0]);
        setError(null);
      }
    },
  });

  const removeFile = () => {
    setResumeFile(null);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      setError('Vui lòng tải lên CV của bạn');
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, you would:
      // 1. Create candidate profile with form data
      // 2. Upload resume file
      // 3. Submit application
      console.log('Form data:', data);
      console.log('Resume file:', resumeFile);
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-sm border p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Ứng tuyển thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã ứng tuyển vào vị trí <strong>{job.title}</strong>. 
            Chúng tôi sẽ xem xét hồ sơ và liên hệ với bạn trong thời gian sớm nhất.
          </p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-blue-600">Việc làm</Link>
            <span>/</span>
            <Link href={`/jobs/${job.slug}`} className="hover:text-blue-600">{job.title}</Link>
            <span>/</span>
            <span className="text-gray-900">Ứng tuyển</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                  Ứng tuyển vào vị trí
                </h1>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
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

                    {/* Professional Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
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
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
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

                    {/* Resume Upload */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        CV/Resume
                      </h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tải lên CV *
                        </label>
                        <div 
                          {...getRootProps()} 
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            isDragActive 
                              ? 'border-blue-400 bg-blue-50' 
                              : resumeFile 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input {...getInputProps()} />
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
                        {error && (
                          <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
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
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Thư xin việc giúp nhà tuyển dụng hiểu rõ hơn về động lực và sự phù hợp của bạn với vị trí.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t">
                      <Button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full"
                        size="lg"
                      >
                        {submitting ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Đang nộp hồ sơ...
                          </>
                        ) : (
                          'Nộp hồ sơ ứng tuyển'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* Job Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin việc làm
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{job.title}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>TechLeet • {getDepartmentName(job.departmentId)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{getLocationName(job.headquarterId)}</span>
                      </div>
                      {job.minSalary && job.maxSalary && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span className="font-medium text-green-600">
                            {formatSalaryRange(job.minSalary, job.maxSalary)}
                          </span>
                        </div>
                      )}
                      {job.applicationDeadline && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Hạn nộp: {new Date(job.applicationDeadline).toLocaleDateString('vi-VN')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
    </div>
  );
}
