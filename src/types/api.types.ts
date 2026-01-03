// Generic API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path?: string;
}

// User DTOs
export interface UserDTO {
  id: number;
  name: string;
  email: string;
  studentId?: string;
  avatar?: string;
  role: "ADMIN" | "USER";
  isActive?: boolean;
}

// Auth DTOs
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    name: string;
    email: string;
    studentId?: string;
    avatar?: string;
    role: string;
  };
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  studentId?: string;
}

export interface GoogleSignInRequest {
  idToken: string;
}

export interface UpdateProfileRequest {
  name?: string;
  studentId?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Banner DTOs
export interface BannerDTO {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  title?: string;
  link?: string;
}

export interface BannerRequest {
  imageUrl: string;
  displayOrder?: number;
  isActive?: boolean;
  title?: string;
  link?: string;
}

// News DTOs
export interface NewsDTO {
  id: number;
  title: string;
  category: string;
  publishedDate: string;
  imageUrl?: string;
  url?: string;
  isTrending: boolean;
  content?: string;
}

export interface NewsRequest {
  title: string;
  category: string;
  publishedDate?: string;
  imageUrl?: string;
  url?: string;
  isTrending?: boolean;
  content?: string;
}

// Program DTOs
export type ProgramType = "BACHELOR" | "MASTER" | "DOCTORATE" | "OTHER";

export interface ProgramDTO {
  id: number;
  name: string;
  code: string;
  description?: string;
  type: ProgramType;
  isActive: boolean;
}

export interface ProgramRequest {
  name: string;
  code: string;
  description?: string;
  type: ProgramType;
  isActive?: boolean;
}

// Schedule DTOs
export type ShiftType = "MORNING" | "AFTERNOON" | "EVENING";

export interface ScheduleDTO {
  id: number;
  date: string;
  shift: ShiftType;
  studentName: string;
  studentEmail: string;
  notes?: string;
  isConfirmed: boolean;
  confirmedBy?: string;
  confirmedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleRequest {
  date: string;
  shift: ShiftType;
  studentEmail: string;
  notes?: string;
}

// Duty Report DTOs
export type ReportStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DutyReportDTO {
  id: number;
  scheduleId: number;
  studentName: string;
  studentEmail: string;
  date: string;
  shift: ShiftType;
  report: string;
  title?: string;
  status: ReportStatus;
  images?: string[];
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface DutyReportRequest {
  scheduleId: number;
  title: string;
  report: string;
  images?: string[];
}

// Filter params
export interface DutyReportFilterParams {
  studentEmail?: string;
  fromDate?: string;
  toDate?: string;
}

export interface DateRangeParams {
  startDate: string;
  endDate: string;
}
