export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  message?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface RegisterDto {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  profile_image_url?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  otp: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface RefreshTokenDto {
  refresh_token: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  reset_token: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface MessageResponse {
  message: string;
} 