/**
 * API Client for TechLeet Recruitment Service
 * Handles all communication with the backend microservices
 */

// Request options type
type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: unknown;
  timeout?: number;
};

// Standard API response format
export interface ApiResponse<T = unknown> {
  data: T;
  statusCode: number;
  timestamp: string;
  path: string;
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

// Custom error class for API errors
export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL?: string, timeout = 10000) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
    this.defaultTimeout = timeout;
  }

  private buildURL(endpoint: string, params?: Record<string, unknown>): string {
    const url = new URL(
      endpoint.startsWith("/") ? endpoint.slice(1) : endpoint,
      this.baseURL
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  private async request<T = unknown>(
    method: string,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      headers = {},
      params,
      body,
      timeout = this.defaultTimeout,
    } = options;

    // Build URL with query parameters
    const url = this.buildURL(endpoint, params);

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Prepare request config
    const config: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: "include", // Include cookies
    };

    // Add body for non-GET requests
    if (body && method !== "GET") {
      if (body instanceof FormData) {
        // Remove Content-Type for FormData (browser will set it with boundary)
        delete requestHeaders["Content-Type"];
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Handle different response types
      const contentType = response.headers.get("content-type");
      let responseData: unknown;

      if (contentType?.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        // Handle API error responses
        const errorMessage =
          (responseData as Record<string, unknown>)?.message ||
          (responseData as Record<string, unknown>)?.error ||
          `HTTP ${response.status}`;
        throw new ApiError(String(errorMessage), response.status, responseData);
      }

      // Return the data directly if it's in the expected API response format
      if (
        responseData &&
        typeof responseData === "object" &&
        responseData !== null &&
        "data" in responseData
      ) {
        return (responseData as { data: T }).data;
      }

      return responseData as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError("Request timeout", 408);
        }
        throw new ApiError(error.message, 0);
      }

      throw new ApiError("Unknown error occurred", 0);
    }
  }

  // GET request
  async get<T = unknown>(
    endpoint: string,
    params?: Record<string, unknown>,
    options?: Omit<RequestOptions, "params" | "body">
  ): Promise<T> {
    return this.request<T>("GET", endpoint, { ...options, params });
  }

  // POST request
  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">
  ): Promise<T> {
    return this.request<T>("POST", endpoint, { ...options, body });
  }

  // PUT request
  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, { ...options, body });
  }

  // PATCH request
  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, { ...options, body });
  }

  // DELETE request
  async delete<T = unknown>(
    endpoint: string,
    params?: Record<string, unknown>,
    options?: Omit<RequestOptions, "params" | "body">
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, { ...options, params });
  }

  // Upload file
  async upload<T = unknown>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, unknown>
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>("POST", endpoint, { body: formData });
  }

  // Job Posting APIs
  async getJobPostings(params?: {
    status?: string;
    departmentId?: number;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<JobPosting[]> {
    return this.get<JobPosting[]>('/api/v1/recruitment-service/job-postings', params);
  }

  async getJobPosting(id: number): Promise<JobPosting> {
    return this.get<JobPosting>(`/api/v1/recruitment-service/job-postings/${id}`);
  }

  // Candidate APIs
  async createCandidate(candidate: Omit<Candidate, 'candidateId' | 'createdAt' | 'updatedAt'>): Promise<Candidate> {
    return this.post<Candidate>('/api/v1/recruitment-service/candidates', candidate);
  }

  async getCandidate(id: number): Promise<Candidate> {
    return this.get<Candidate>(`/api/v1/recruitment-service/candidates/${id}`);
  }

  async updateCandidate(id: number, candidate: Partial<Candidate>): Promise<Candidate> {
    return this.patch<Candidate>(`/api/v1/recruitment-service/candidates/${id}`, candidate);
  }

  // Application APIs
  async createApplication(application: Omit<Application, 'applicationId' | 'appliedAt'>): Promise<Application> {
    return this.post<Application>('/api/v1/recruitment-service/applications', application);
  }

  async getApplicationsByCandidate(candidateId: number): Promise<Application[]> {
    return this.get<Application[]>('/api/v1/recruitment-service/applications', { candidateId });
  }

  async getApplication(id: number): Promise<Application> {
    return this.get<Application>(`/api/v1/recruitment-service/applications/${id}`);
  }

  // Company Data APIs (for job posting details)
  async getDepartments(): Promise<CompanyDepartment[]> {
    return this.get<CompanyDepartment[]>('/api/v1/company-service/departments');
  }

  async getPositions(): Promise<CompanyPosition[]> {
    return this.get<CompanyPosition[]>('/api/v1/company-service/positions');
  }

  async getHeadquarters(): Promise<CompanyHeadquarter[]> {
    return this.get<CompanyHeadquarter[]>('/api/v1/company-service/headquarters');
  }
}

// Company service types (simplified)
export interface CompanyDepartment {
  departmentId: number;
  departmentName: string;
  description?: string;
  departmentCode: string;
  headquarterId: number;
  isActive: boolean;
}

export interface CompanyPosition {
  positionId: number;
  positionName: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  level: number;
  positionCode: string;
  requirements?: string;
  isActive: boolean;
}

export interface CompanyHeadquarter {
  headquarterId: number;
  headquarterName: string;
  headquarterAddress: string;
  headquarterPhone: string;
  headquarterEmail: string;
  city: string;
  postalCode?: string;
  description?: string;
  isMainHeadquarter: boolean;
  isActive: boolean;
}

// Create and export the default API client instance
export const api = new ApiClient();

// Export the class for creating custom instances if needed
export { ApiClient };

// Export types
export type { RequestOptions };
