import { auth } from './en/auth/auth';
import { categories, favorites, location, navigation, packages, profile } from './en/common';
import { onboarding } from './en/onboarding/onboarding';

export const en = {
  auth,
  onboarding,
  common: {
    location,
    packages,
    favorites,
    navigation,
    categories,
    profile,
  },
} as const; 