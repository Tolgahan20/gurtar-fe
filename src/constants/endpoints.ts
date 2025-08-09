export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: '/auth/logout',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_OTP: '/auth/verify-otp',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

export const CATEGORY_ENDPOINTS = {
  GET_ALL: '/categories',
  GET_SUBCATEGORIES: (categoryId: string) => `/categories/${categoryId}/subcategories`,
} as const;

export const BUSINESS_ENDPOINTS = {
  GET_ALL: '/businesses',
  GET_BY_CATEGORY: (categoryId: string) => `/businesses?category_id=${categoryId}`,
  GET_BY_LOCATION: (lat: number, lng: number) => `/businesses?lat=${lat}&lng=${lng}`,
} as const;

export const PACKAGE_ENDPOINTS = {
  GET_ALL: '/packages',
  GET_BY_CATEGORY: (categoryId: string) => `/packages?category_id=${categoryId}`,
  GET_BY_LOCATION: (lat: number, lng: number) => `/packages?lat=${lat}&lng=${lng}`,
} as const;