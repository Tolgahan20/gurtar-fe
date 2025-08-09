import { auth } from './tr/auth/auth';
import { location } from './tr/common';
import { onboarding } from './tr/onboarding/onboarding';

export const tr = {
  auth,
  onboarding,
  location,
} as const; 