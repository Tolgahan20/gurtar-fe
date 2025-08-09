export interface City {
  id: string;
  name: string;
  name_tr: string;
  latitude: number;
  longitude: number;
}

export const CITIES: City[] = [
  {
    id: 'lefkosa',
    name: 'Nicosia',
    name_tr: 'Lefkoşa',
    latitude: 35.1856,
    longitude: 33.3823,
  },
  {
    id: 'girne',
    name: 'Kyrenia',
    name_tr: 'Girne',
    latitude: 35.3364,
    longitude: 33.3199,
  },
  {
    id: 'magusa',
    name: 'Famagusta',
    name_tr: 'Gazimağusa',
    latitude: 35.1254,
    longitude: 33.9400,
  },
  {
    id: 'guzelyurt',
    name: 'Morphou',
    name_tr: 'Güzelyurt',
    latitude: 35.2019,
    longitude: 33.0197,
  },
  {
    id: 'lefke',
    name: 'Lefke',
    name_tr: 'Lefke',
    latitude: 35.1175,
    longitude: 32.8475,
  },
  {
    id: 'dipkarpaz',
    name: 'Rizokarpaso',
    name_tr: 'Dipkarpaz',
    latitude: 35.5900,
    longitude: 34.4254,
  },
  {
    id: 'iskele',
    name: 'Trikomo',
    name_tr: 'İskele',
    latitude: 35.2850,
    longitude: 33.9310,
  },
]; 