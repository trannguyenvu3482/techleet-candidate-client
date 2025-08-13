import type { JobPosting } from "@/lib/api";
import { generateJobSlug } from "@/lib/utils";

// Mock job data for development
export const mockJobs: JobPosting[] = [
  {
    jobPostingId: 1,
    slug: generateJobSlug("Senior Frontend Developer", 1),
    title: "Senior Frontend Developer",
    description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React, TypeScript và Next.js để tham gia đội ngũ phát triển sản phẩm. Bạn sẽ làm việc với các công nghệ hiện đại và tham gia xây dựng các ứng dụng web quy mô lớn.",
    requirements: "• 3+ năm kinh nghiệm với React và TypeScript\n• Kinh nghiệm với Next.js, Tailwind CSS\n• Hiểu biết về REST API và GraphQL\n• Kinh nghiệm với Git và CI/CD",
    minSalary: 25000000,
    maxSalary: 40000000,
    employmentType: "full-time",
    experienceLevel: "senior",
    benefits: "• Lương tháng 13\n• Bảo hiểm sức khỏe cao cấp\n• 15 ngày phép năm\n• Làm việc từ xa 2 ngày/tuần",
    applicationDeadline: "2024-12-31T23:59:59.000Z",
    status: "published",
    departmentId: 1,
    positionId: 1,
    headquarterId: 1,
    createdAt: "2024-11-15T08:00:00.000Z",
    updatedAt: "2024-11-15T08:00:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 2,
    slug: generateJobSlug("Backend Developer (Node.js)", 2),
    title: "Backend Developer (Node.js)",
    description: "Tham gia phát triển hệ thống backend cho các ứng dụng web và mobile. Làm việc với Node.js, Express, PostgreSQL và các công nghệ cloud hiện đại.",
    requirements: "• 2+ năm kinh nghiệm với Node.js\n• Kinh nghiệm với PostgreSQL, MongoDB\n• Hiểu biết về microservices\n• Kinh nghiệm với Docker và AWS",
    minSalary: 20000000,
    maxSalary: 35000000,
    employmentType: "full-time",
    experienceLevel: "mid",
    benefits: "• Thưởng hiệu suất hàng quý\n• Đào tạo và phát triển kỹ năng\n• Team building định kỳ\n• Môi trường làm việc trẻ trung",
    applicationDeadline: "2024-12-25T23:59:59.000Z",
    status: "published",
    departmentId: 1,
    positionId: 2,
    headquarterId: 1,
    createdAt: "2024-11-14T09:30:00.000Z",
    updatedAt: "2024-11-14T09:30:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 3,
    slug: generateJobSlug("DevOps Engineer", 3),
    title: "DevOps Engineer",
    description: "Quản lý và tối ưu hóa hạ tầng cloud, xây dựng CI/CD pipeline và đảm bảo tính ổn định của hệ thống. Làm việc với AWS, Docker, Kubernetes.",
    requirements: "• 3+ năm kinh nghiệm DevOps\n• Thành thạo AWS, Docker, Kubernetes\n• Kinh nghiệm với Terraform, Ansible\n• Hiểu biết về monitoring và logging",
    minSalary: 30000000,
    maxSalary: 50000000,
    employmentType: "full-time",
    experienceLevel: "senior",
    benefits: "• Lương cạnh tranh\n• Chứng chỉ AWS được tài trợ\n• Flexible working hours\n• Laptop MacBook Pro",
    applicationDeadline: "2025-01-15T23:59:59.000Z",
    status: "published",
    departmentId: 2,
    positionId: 3,
    headquarterId: 1,
    createdAt: "2024-11-13T14:15:00.000Z",
    updatedAt: "2024-11-13T14:15:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 4,
    slug: generateJobSlug("QA Engineer", 4),
    title: "QA Engineer",
    description: "Đảm bảo chất lượng sản phẩm thông qua việc thiết kế và thực hiện các test case, automation testing. Làm việc chặt chẽ với team development.",
    requirements: "• 2+ năm kinh nghiệm QA\n• Kinh nghiệm với automation testing\n• Hiểu biết về Selenium, Cypress\n• Kỹ năng phân tích và báo cáo bug",
    minSalary: 18000000,
    maxSalary: 28000000,
    employmentType: "full-time",
    experienceLevel: "mid",
    benefits: "• Đào tạo testing tools\n• Cơ hội thăng tiến\n• Bảo hiểm đầy đủ\n• Du lịch công ty hàng năm",
    applicationDeadline: "2024-12-20T23:59:59.000Z",
    status: "published",
    departmentId: 3,
    positionId: 4,
    headquarterId: 2,
    createdAt: "2024-11-12T11:00:00.000Z",
    updatedAt: "2024-11-12T11:00:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 5,
    slug: generateJobSlug("Data Scientist", 5),
    title: "Data Scientist",
    description: "Phân tích dữ liệu lớn, xây dựng mô hình machine learning và cung cấp insights cho business. Làm việc với Python, SQL, và các công cụ ML hiện đại.",
    requirements: "• Bằng cử nhân về Toán, Thống kê hoặc CS\n• Thành thạo Python, SQL, R\n• Kinh nghiệm với ML frameworks\n• Kỹ năng trực quan hóa dữ liệu",
    minSalary: 22000000,
    maxSalary: 38000000,
    employmentType: "full-time",
    experienceLevel: "mid",
    benefits: "• Khóa học ML/AI được tài trợ\n• Tham gia hội thảo quốc tế\n• Research budget\n• Flexible schedule",
    applicationDeadline: "2025-01-10T23:59:59.000Z",
    status: "published",
    departmentId: 4,
    positionId: 5,
    headquarterId: 1,
    createdAt: "2024-11-11T16:45:00.000Z",
    updatedAt: "2024-11-11T16:45:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 6,
    slug: generateJobSlug("Mobile Developer (React Native)", 6),
    title: "Mobile Developer (React Native)",
    description: "Phát triển ứng dụng mobile cross-platform với React Native. Tối ưu hiệu suất và trải nghiệm người dùng trên cả iOS và Android.",
    requirements: "• 2+ năm kinh nghiệm React Native\n• Hiểu biết về iOS và Android\n• Kinh nghiệm với Redux, TypeScript\n• Đã publish app lên store",
    minSalary: 20000000,
    maxSalary: 32000000,
    employmentType: "full-time",
    experienceLevel: "mid",
    benefits: "• iPhone và Android test devices\n• Khóa học mobile development\n• Code review với senior\n• Bonus khi app thành công",
    applicationDeadline: "2024-12-30T23:59:59.000Z",
    status: "published",
    departmentId: 5,
    positionId: 6,
    headquarterId: 1,
    createdAt: "2024-11-10T13:20:00.000Z",
    updatedAt: "2024-11-10T13:20:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 7,
    slug: generateJobSlug("UI/UX Designer", 7),
    title: "UI/UX Designer",
    description: "Thiết kế giao diện và trải nghiệm người dùng cho các sản phẩm web và mobile. Làm việc chặt chẽ với team product và development.",
    requirements: "• 2+ năm kinh nghiệm UI/UX\n• Thành thạo Figma, Adobe Creative Suite\n• Hiểu biết về design system\n• Portfolio ấn tượng",
    minSalary: 15000000,
    maxSalary: 25000000,
    employmentType: "full-time",
    experienceLevel: "mid",
    benefits: "• Creative software licenses\n• Design conferences\n• Ergonomic workspace\n• Creative freedom",
    applicationDeadline: "2025-01-05T23:59:59.000Z",
    status: "published",
    departmentId: 6,
    positionId: 7,
    headquarterId: 1,
    createdAt: "2024-11-09T10:30:00.000Z",
    updatedAt: "2024-11-09T10:30:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 8,
    slug: generateJobSlug("Product Manager", 8),
    title: "Product Manager",
    description: "Quản lý sản phẩm từ ý tưởng đến triển khai. Làm việc với stakeholders, định nghĩa requirements và đảm bảo sản phẩm đáp ứng nhu cầu thị trường.",
    requirements: "• 3+ năm kinh nghiệm Product Management\n• Hiểu biết về Agile/Scrum\n• Kỹ năng phân tích và communication\n• Kinh nghiệm với product analytics",
    minSalary: 25000000,
    maxSalary: 45000000,
    employmentType: "full-time",
    experienceLevel: "senior",
    benefits: "• Product management courses\n• Conference budget\n• Stock options\n• Leadership development",
    applicationDeadline: "2025-01-20T23:59:59.000Z",
    status: "published",
    departmentId: 6,
    positionId: 8,
    headquarterId: 1,
    createdAt: "2024-11-08T15:00:00.000Z",
    updatedAt: "2024-11-08T15:00:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 9,
    slug: generateJobSlug("Junior Frontend Developer", 9),
    title: "Junior Frontend Developer",
    description: "Vị trí dành cho fresh graduate hoặc developer có ít kinh nghiệm. Sẽ được mentoring và đào tạo để phát triển kỹ năng frontend development.",
    requirements: "• Kiến thức cơ bản về HTML, CSS, JavaScript\n• Hiểu biết về React (có thể học thêm)\n• Đam mê học hỏi và phát triển\n• Tinh thần làm việc nhóm tốt",
    minSalary: 12000000,
    maxSalary: 18000000,
    employmentType: "full-time",
    experienceLevel: "entry",
    benefits: "• Mentoring 1-on-1\n• Training program 3 tháng\n• Career development path\n• Friendly team environment",
    applicationDeadline: "2024-12-15T23:59:59.000Z",
    status: "published",
    departmentId: 1,
    positionId: 9,
    headquarterId: 2,
    createdAt: "2024-11-07T09:15:00.000Z",
    updatedAt: "2024-11-07T09:15:00.000Z",
    isActive: true,
  },
  {
    jobPostingId: 10,
    slug: generateJobSlug("Internship - Software Development", 10),
    title: "Internship - Software Development",
    description: "Chương trình thực tập 6 tháng dành cho sinh viên năm cuối. Cơ hội học hỏi và làm việc với các dự án thực tế trong môi trường chuyên nghiệp.",
    requirements: "• Sinh viên năm 3-4 ngành CNTT\n• Kiến thức cơ bản về lập trình\n• Có thể commit full-time 6 tháng\n• Tiếng Anh giao tiếp cơ bản",
    minSalary: 5000000,
    maxSalary: 8000000,
    employmentType: "internship",
    experienceLevel: "entry",
    benefits: "• Mentoring từ senior developers\n• Real project experience\n• Certificate completion\n• Potential full-time offer",
    applicationDeadline: "2024-12-10T23:59:59.000Z",
    status: "published",
    departmentId: 1,
    positionId: 10,
    headquarterId: 1,
    createdAt: "2024-11-06T14:30:00.000Z",
    updatedAt: "2024-11-06T14:30:00.000Z",
    isActive: true,
  },
];

// Mock company data for filters
export const mockDepartments = [
  {
    departmentId: 1,
    departmentName: "Engineering",
    description: "Software development and engineering teams",
    departmentCode: "ENG",
    headquarterId: 1,
    isActive: true
  },
  {
    departmentId: 2,
    departmentName: "DevOps",
    description: "Infrastructure and deployment operations",
    departmentCode: "DEVOPS",
    headquarterId: 1,
    isActive: true
  },
  {
    departmentId: 3,
    departmentName: "Quality Assurance",
    description: "Software testing and quality control",
    departmentCode: "QA",
    headquarterId: 1,
    isActive: true
  },
  {
    departmentId: 4,
    departmentName: "Data Science",
    description: "Data analysis and machine learning",
    departmentCode: "DS",
    headquarterId: 2,
    isActive: true
  },
  {
    departmentId: 5,
    departmentName: "Mobile Development",
    description: "iOS and Android application development",
    departmentCode: "MOBILE",
    headquarterId: 2,
    isActive: true
  },
  {
    departmentId: 6,
    departmentName: "Product & Design",
    description: "Product management and UX/UI design",
    departmentCode: "PRODUCT",
    headquarterId: 3,
    isActive: true
  },
];

export const mockHeadquarters = [
  {
    headquarterId: 1,
    headquarterName: "TechLeet HQ",
    headquarterAddress: "123 Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh",
    headquarterPhone: "+84 28 1234 5678",
    headquarterEmail: "hcm@techleet.vn",
    city: "Hồ Chí Minh",
    postalCode: "700000",
    description: "Main headquarters with all departments",
    isMainHeadquarter: true,
    isActive: true
  },
  {
    headquarterId: 2,
    headquarterName: "TechLeet Hanoi",
    headquarterAddress: "456 Hoàn Kiếm, Quận Hoàn Kiếm, Hà Nội",
    headquarterPhone: "+84 24 1234 5678",
    headquarterEmail: "hanoi@techleet.vn",
    city: "Hà Nội",
    postalCode: "100000",
    description: "Northern branch office",
    isMainHeadquarter: false,
    isActive: true
  },
  {
    headquarterId: 3,
    headquarterName: "TechLeet Da Nang",
    headquarterAddress: "789 Hàn Thuyên, Quận Hải Châu, Đà Nẵng",
    headquarterPhone: "+84 236 1234 567",
    headquarterEmail: "danang@techleet.vn",
    city: "Đà Nẵng",
    postalCode: "550000",
    description: "Central Vietnam branch office",
    isMainHeadquarter: false,
    isActive: true
  },
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  async getJobPostings(params?: {
    status?: string;
    departmentId?: number;
    search?: string;
    page?: number;
    limit?: number;
    employmentType?: string;
    experienceLevel?: string;
    headquarterId?: number;
    minSalary?: number;
    maxSalary?: number;
  }): Promise<JobPosting[]> {
    await delay(500); // Simulate network delay
    
    let filteredJobs = [...mockJobs];
    
    // Apply filters
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.requirements.toLowerCase().includes(searchLower)
      );
    }
    
    if (params?.departmentId) {
      filteredJobs = filteredJobs.filter(job => job.departmentId === params.departmentId);
    }
    
    if (params?.employmentType) {
      filteredJobs = filteredJobs.filter(job => job.employmentType === params.employmentType);
    }
    
    if (params?.experienceLevel) {
      filteredJobs = filteredJobs.filter(job => job.experienceLevel === params.experienceLevel);
    }
    
    if (params?.headquarterId) {
      filteredJobs = filteredJobs.filter(job => job.headquarterId === params.headquarterId);
    }
    
    if (params?.minSalary) {
      filteredJobs = filteredJobs.filter(job => job.maxSalary >= params.minSalary!);
    }
    
    if (params?.maxSalary) {
      filteredJobs = filteredJobs.filter(job => job.minSalary <= params.maxSalary!);
    }
    
    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return filteredJobs.slice(startIndex, endIndex);
  },

  async getJobPostingBySlug(slug: string): Promise<JobPosting | null> {
    await delay(300);
    return mockJobs.find(job => job.slug === slug) || null;
  },

  async getDepartments() {
    await delay(200);
    return mockDepartments;
  },

  async getHeadquarters() {
    await delay(200);
    return mockHeadquarters;
  }
};
