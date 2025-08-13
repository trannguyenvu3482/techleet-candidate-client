/**
 * Type definitions for TechLeet Candidate Client
 */

// Re-export API types
export type {
  ApiResponse,
  JobPosting,
  Candidate,
  Application,
} from '@/lib/api';

// Additional UI-specific types
export interface JobPostingWithDetails extends JobPosting {
  department?: Department;
  position?: Position;
  headquarter?: Headquarter;
}

export interface Department {
  departmentId: number;
  departmentName: string;
  description?: string;
  budget?: number;
  departmentCode: string;
  headquarterId: number;
  departmentTypeId: number;
  leaderId?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  positionId: number;
  positionName: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  level: number;
  positionCode: string;
  requirements?: string;
  positionTypeId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Headquarter {
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
  createdAt: string;
  updatedAt: string;
}

// Form types
export interface CandidateFormData {
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
}

export interface ApplicationFormData {
  coverLetter?: string;
  resumeFile?: File;
}

// Search and filter types
export interface JobSearchFilters {
  search?: string;
  departmentId?: number;
  headquarterId?: number;
  employmentType?: string;
  experienceLevel?: string;
  minSalary?: number;
  maxSalary?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FormState<T> extends LoadingState {
  data: T;
  isDirty: boolean;
  isValid: boolean;
  errors: Record<string, string>;
}

// Application status display
export const APPLICATION_STATUS_LABELS = {
  submitted: 'Submitted',
  screening: 'Under Review',
  interviewing: 'Interview Stage',
  offer: 'Offer Extended',
  hired: 'Hired',
  rejected: 'Not Selected',
  withdrawn: 'Withdrawn',
} as const;

export const APPLICATION_STATUS_COLORS = {
  submitted: 'bg-blue-100 text-blue-800',
  screening: 'bg-yellow-100 text-yellow-800',
  interviewing: 'bg-purple-100 text-purple-800',
  offer: 'bg-green-100 text-green-800',
  hired: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800',
} as const;

// Employment type options
export const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
] as const;

// Experience level options
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'lead', label: 'Lead Level' },
  { value: 'executive', label: 'Executive' },
] as const;
