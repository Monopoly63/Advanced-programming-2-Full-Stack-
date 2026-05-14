// =============================================================================
//  countryService — Fetches country data from restcountries.com API.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import axios from 'axios';
import type { Country } from '../types';

const BASE_URL = 'https://restcountries.com/v3.1';

const FIELDS = 'name,capital,population,area,flags,languages,currencies,region,subregion,cca3';

const getAll = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${BASE_URL}/all?fields=${FIELDS}`);
  return response.data;
};

const searchByName = async (name: string): Promise<Country[]> => {
  const response = await axios.get<Country[]>(
    `${BASE_URL}/name/${encodeURIComponent(name)}?fields=${FIELDS}`
  );
  return response.data;
};

export default { getAll, searchByName };