// =============================================================================
//  Type definitions for Countries App
//  Signed: by Abdulmoin Hablas
// =============================================================================

export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  svg: string;
  png: string;
  alt?: string;
}

export interface CountryCurrency {
  name: string;
  symbol: string;
}

export interface Country {
  name: CountryName;
  capital?: string[];
  population: number;
  area: number;
  flags: CountryFlags;
  languages?: Record<string, string>;
  currencies?: Record<string, CountryCurrency>;
  region: string;
  subregion?: string;
  cca3: string;
}