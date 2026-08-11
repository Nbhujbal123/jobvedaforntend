export type UserRole = 'candidate' | 'employer' | 'admin';

/** Self-registration is only ever candidate or employer — admin is backend-only. */
export type RegisterableRole = Extract<UserRole, 'candidate' | 'employer'>;

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True until the initial GET /auth/me session check has resolved. */
  isLoading: boolean;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: RegisterableRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponseData {
  token: string;
  user: AuthUser;
}
