import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CitySelectionSheet } from '../components/CitySelectionSheet';
import { CITIES, City } from '../constants';

interface LocationContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
  openCitySelection: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  // Set Nicosia as the default city
  const [selectedCity, setSelectedCity] = useState<City | null>(() => CITIES.find(city => city.id === 'lefkosa') || null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openCitySelection = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        openCitySelection,
      }}
    >
      {children}
      <CitySelectionSheet
        bottomSheetRef={bottomSheetRef as React.RefObject<BottomSheetModal>}
        cities={CITIES}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        handleClose={handleClose}
      />
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
} 