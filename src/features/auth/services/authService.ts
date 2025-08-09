import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AUTH_ENDPOINTS } from '../../../constants/endpoints';
import { AUTH_MESSAGES } from '../../../constants/messages';
import { axiosInstance } from '../../../lib/axios';
import type {
  ApiResponse,
  AuthResponse,
  ForgotPasswordDto,
  LoginDto,
  MessageResponse,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  TokenResponse,
  VerifyEmailDto,
  VerifyOtpDto,
  VerifyOtpResponse
} from '../../../types/api';


export const useAuthService = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<
    ApiResponse<TokenResponse>,
    Error,
    LoginDto
  >({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post<AuthResponse>(
          AUTH_ENDPOINTS.LOGIN,
          data
        );
        
        if (!response.data.access_token || !response.data.refresh_token) {
          throw new Error('Invalid response from server');
        }

        return {
          data: {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            expires_in: response.data.expires_in,
          },
          message: response.data.message || 'Login successful',
          statusCode: response.status,
        };
      } catch (error: any) {
        console.log('Login error response:', error.response?.data);
        
        const errorMessage = error.response?.data?.message;
        if (errorMessage === 'Email not verified') {
          throw new Error(AUTH_MESSAGES.ERRORS.EMAIL_NOT_VERIFIED);
        }
        if (errorMessage === 'Invalid credentials') {
          throw new Error(AUTH_MESSAGES.ERRORS.LOGIN_FAILED);
        }
        if (error.response?.status === 401) {
          throw new Error(AUTH_MESSAGES.ERRORS.UNAUTHORIZED);
        }
        if (!error.response || error.message === 'Network Error') {
          throw new Error(AUTH_MESSAGES.ERRORS.NETWORK_ERROR);
        }
        
        throw new Error(AUTH_MESSAGES.ERRORS.SERVER_ERROR);
      }
    },
    onSuccess: async (data) => {
      await AsyncStorage.multiSet([
        ['access_token', data.data.access_token],
        ['refresh_token', data.data.refresh_token],
      ]);
    },
  });

  const registerMutation = useMutation<
    ApiResponse<{ message: string }>,
    Error,
    RegisterDto
  >({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post<{ message: string }>(
          AUTH_ENDPOINTS.REGISTER,
          data
        );

        return {
          data: { message: response.data.message },
          message: response.data.message || 'Registration successful',
          statusCode: response.status,
        };
      } catch (error: any) {
        if (Array.isArray(error.response?.data?.message)) {
          throw new Error(error.response.data.message.join(', '));
        }
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error(AUTH_MESSAGES.ERRORS.REGISTER_FAILED);
      }
    }
  });

  const logoutMutation = useMutation<void, Error>({
    mutationFn: async () => {
      try {
        await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw error;
      }
    },
  });

  const refreshTokenMutation = useMutation<
    ApiResponse<TokenResponse>,
    Error,
    RefreshTokenDto
  >({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post<AuthResponse>(
          AUTH_ENDPOINTS.REFRESH_TOKEN,
          data
        );

        if (!response.data.access_token || !response.data.refresh_token) {
          throw new Error('Invalid response from server');
        }

        return {
          data: {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            expires_in: response.data.expires_in,
          },
          message: response.data.message || 'Token refreshed successfully',
          statusCode: response.status,
        };
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error(AUTH_MESSAGES.ERRORS.REFRESH_TOKEN_FAILED);
      }
    },
    onSuccess: async (data) => {
      await AsyncStorage.multiSet([
        ['access_token', data.data.access_token],
        ['refresh_token', data.data.refresh_token],
      ]);
    },
  });

  const verifyOtpMutation = useMutation<ApiResponse<VerifyOtpResponse>, Error, VerifyOtpDto>({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post<VerifyOtpResponse>(
          AUTH_ENDPOINTS.VERIFY_OTP,
          data
        );
        return {
          data: { reset_token: response.data.reset_token },
          message: 'OTP verified successfully',
          statusCode: response.status,
        };
      } catch (error: any) {
        if (error.response?.status === 400) {
          throw new Error('Email and OTP are required');
        }
        if (error.response?.status === 401) {
          const message = error.response?.data?.message;
          if (message?.includes('expired')) {
            throw new Error('OTP has expired. Please request a new one.');
          }
          throw new Error('Invalid OTP. Please try again.');
        }
        throw new Error(AUTH_MESSAGES.ERRORS.OTP_VERIFY_FAILED);
      }
    },
  });

  const resetPasswordMutation = useMutation<ApiResponse<MessageResponse>, Error, ResetPasswordDto>({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post<MessageResponse>(
          AUTH_ENDPOINTS.RESET_PASSWORD,
          data
        );
        return {
          data: { message: response.data.message },
          message: response.data.message,
          statusCode: response.status,
        };
      } catch (error: any) {
        if (error.response?.status === 400) {
          throw new Error('Token and new password are required');
        }
        if (error.response?.status === 401) {
          const message = error.response?.data?.message;
          if (message?.includes('expired')) {
            throw new Error('Reset token has expired. Please start over.');
          }
          if (message?.includes('used')) {
            throw new Error('This reset token has already been used. Please request a new one.');
          }
          throw new Error('Invalid reset token. Please try again.');
        }
        throw new Error(AUTH_MESSAGES.ERRORS.PASSWORD_RESET_FAILED);
      }
    },
  });

  const verifyEmailMutation = useMutation<void, Error, VerifyEmailDto>({
    mutationFn: async (data) => {
      try {
        await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_EMAIL, data);
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error(AUTH_MESSAGES.ERRORS.VERIFY_EMAIL_FAILED);
      }
    },
  });

  const forgotPasswordMutation = useMutation<ApiResponse<MessageResponse>, Error, ForgotPasswordDto>({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post<MessageResponse>(
          AUTH_ENDPOINTS.FORGOT_PASSWORD,
          data
        );
        return {
          data: { message: response.data.message },
          message: response.data.message,
          statusCode: response.status,
        };
      } catch (error: any) {
        if (error.response?.status === 400) {
          throw new Error('Email is required');
        }
        throw new Error(AUTH_MESSAGES.ERRORS.PASSWORD_RESET_FAILED);
      }
    },
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refreshToken: refreshTokenMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    verifyEmail: verifyEmailMutation.mutateAsync,
    isLoading: 
      loginMutation.isPending || 
      registerMutation.isPending || 
      logoutMutation.isPending || 
      refreshTokenMutation.isPending ||
      forgotPasswordMutation.isPending ||
      verifyOtpMutation.isPending ||
      resetPasswordMutation.isPending ||
      verifyEmailMutation.isPending,
  };
}; 