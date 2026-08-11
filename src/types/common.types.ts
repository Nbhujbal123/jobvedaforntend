export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface SelectOption {
  label: string;
  value: string;
}
