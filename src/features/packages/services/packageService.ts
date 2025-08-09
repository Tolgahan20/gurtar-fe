import api from '../../../lib/axios';
import { PackagesQueryParams, PackagesResponse } from '../types';

export const packageService = {
  getPackages: async (params?: PackagesQueryParams): Promise<PackagesResponse> => {
    const { data } = await api.get<PackagesResponse>('/packages', { params });
    return data;
  },

  getPackageById: async (id: string) => {
    const { data } = await api.get(`/packages/${id}`);
    return data;
  },
}; 