import { categories } from './categories';
import { favorites } from './favorites';
import { location } from './location';
import { navigation } from './navigation';
import { packages } from './packages';
import { profile } from './profile';

export { categories, favorites, location, navigation, packages, profile };

export const common = {
  location,
  packages,
  navigation,
  categories,
  favorites,
  profile,
} as const;

