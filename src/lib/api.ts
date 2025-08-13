/**
 * API Client for TechLeet Recruitment Service
 * Handles all communication with the backend microservices
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface JobPosting {
  jobPostingId: number;
  title: string;
  description: string;
  requirements: string;
  minSalary: number;
  maxSalary: number;
  employmentType: string;
  experienceLevel: string;
  benefits: string;
  applicationDeadline: string;
  status: 'draft' | 'active' | 'closed';
  departmentId: number;
  positionId: number;
  headquarterId: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Candidate {
  candidateId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  postalCode?: string;
  education: string;
  workExperience: string;
  skills: string;
  certifications?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  applicationId?: number;
  candidateId: number;
  jobPostingId: number;
  coverLetter?: string;
  resumeUrl?: string;
  status: 'submitted' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected' | 'withdrawn';
  appliedAt?: string;
  notes?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || 'An error occurred',
          statusCode: response.status,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        statusCode: 500,
      };
    }
  }

  // Job Posting APIs
  async getJobPostings(params?: {
    status?: string;
    departmentId?: number;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<JobPosting[]>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request<JobPosting[]>(
      `/api/v1/recruitment-service/job-postings${query ? `?${query}` : ''}`
    );
  }

  async getJobPosting(id: number): Promise<ApiResponse<JobPosting>> {
    return this.request<JobPosting>(`/api/v1/recruitment-service/job-postings/${id}`);
  }

  // Candidate APIs
  async createCandidate(candidate: Omit<Candidate, 'candidateId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Candidate>> {
    return this.request<Candidate>('/api/v1/recruitment-service/candidates', {
      method: 'POST',
      body: JSON.stringify(candidate),
    });
  }

  async getCandidate(id: number): Promise<ApiResponse<Candidate>> {
    return this.request<Candidate>(`/api/v1/recruitment-service/candidates/${id}`);
  }

  async updateCandidate(id: number, candidate: Partial<Candidate>): Promise<ApiResponse<Candidate>> {
    return this.request<Candidate>(`/api/v1/recruitment-service/candidates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(candidate),
    });
  }

  // Application APIs
  async createApplication(application: Omit<Application, 'applicationId' | 'appliedAt'>): Promise<ApiResponse<Application>> {
    return this.request<Application>('/api/v1/recruitment-service/applications', {
      method: 'POST',
      body: JSON.stringify(application),
    });
  }

  async getApplicationsByCandidate(candidateId: number): Promise<ApiResponse<Application[]>> {
    return this.request<Application[]>(`/api/v1/recruitment-service/applications?candidateId=${candidateId}`);
  }

  async getApplication(id: number): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/api/v1/recruitment-service/applications/${id}`);
  }

  // Company Data APIs (for job posting details)
  async getDepartments(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/company-service/departments');
  }

  async getPositions(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/company-service/positions');
  }

  async getHeadquarters(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/company-service/headquarters');
  }
}

// Export singleton instance
export const api = new ApiClient();
export default api;
