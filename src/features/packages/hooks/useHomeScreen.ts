import { useCallback, useEffect, useState } from 'react';
import { Category } from '../../categories/types';
import { useLocation } from '../../location/context/LocationContext';
import { packageService } from '../services/packageService';
import { Package, PackageSection } from '../types';

interface SectionData {
  title: string;
  packages: Package[];
  loading: boolean;
}

export function useHomeScreen() {
  const { selectedCity } = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);

  const [sections, setSections] = useState<Record<PackageSection, SectionData>>({
    [PackageSection.TOP_RATED]: { title: 'Top rated near you', packages: [], loading: true },
    [PackageSection.ENDING_SOON]: { title: 'Ending soon', packages: [], loading: true },
    [PackageSection.NEW_ARRIVALS]: { title: 'New arrivals', packages: [], loading: true },
    [PackageSection.NEAR_YOU]: { title: 'Near you', packages: [], loading: true },
    [PackageSection.BEST_VALUE]: { title: 'Best value', packages: [], loading: true },
  });

  const fetchSection = useCallback(async (section: PackageSection) => {
    console.log('Fetching section:', section, 'with city:', selectedCity?.name);
    
    if (!selectedCity) {
      setSections(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          loading: false,
          packages: [],
        },
      }));
      return;
    }

    try {
      setSections(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          loading: true,
        },
      }));

      const params = {
        limit: 10,
        city: selectedCity.name,
        categoryId: selectedCategory?.id,
        section,
      };
      
      const response = await packageService.getPackages(params);
      console.log('Section response:', section, response.data?.length || 0, 'packages');

      setSections(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          loading: false,
          packages: response.data || [],
        },
      }));
    } catch (err) {
      console.error('Error fetching section:', section, err);
      setSections(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          loading: false,
          packages: [],
        },
      }));
    }
  }, [selectedCity, selectedCategory]);

  const fetchAllSections = useCallback(() => {
    if (!selectedCity) return;
    
    console.log('Fetching all sections');
    Object.keys(sections).forEach(section => 
      fetchSection(section as PackageSection)
    );
  }, [fetchSection, selectedCity]);

  // Effect to handle initial load and city/category changes
  useEffect(() => {
    fetchAllSections();
  }, [selectedCity, selectedCategory]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all(
      Object.keys(sections).map(section => 
        fetchSection(section as PackageSection)
      )
    );
    setRefreshing(false);
  }, [fetchSection]);

  const handleCategorySelect = useCallback((category: Category | null) => {
    setSelectedCategory(category);
  }, []);

  // Effect to check for empty results
  useEffect(() => {
    const isAnyLoading = Object.values(sections).some(section => section.loading);
    if (!isAnyLoading) {
      const hasAnyPackages = Object.values(sections).some(section => section.packages.length > 0);
      setNoResults(!hasAnyPackages);
    }
  }, [sections]);

  return {
    sections,
    refreshing,
    selectedCategory,
    error,
    noResults,
    handleRefresh,
    handleCategorySelect,
  };
} 