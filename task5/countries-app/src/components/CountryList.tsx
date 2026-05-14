// =============================================================================
//  CountryList — Renders search results with "show" buttons.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { Country } from '../types';

interface CountryListProps {
  countries: Country[];
  onSelect: (country: Country) => void;
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const rowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 14px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const nameContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const flagSmallStyle: CSSProperties = {
  width: 28,
  height: 20,
  borderRadius: 3,
  objectFit: 'cover',
};

const nameTextStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.9)',
};

const showButtonStyle: CSSProperties = {
  padding: '5px 14px',
  borderRadius: 6,
  border: '1px solid rgba(165,180,252,0.3)',
  background: 'rgba(165,180,252,0.1)',
  color: '#a5b4fc',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
};

const tooManyStyle: CSSProperties = {
  textAlign: 'center',
  padding: 32,
  color: 'rgba(255,255,255,0.5)',
  fontSize: 14,
};

const CountryList = ({ countries, onSelect }: CountryListProps): JSX.Element => {
  if (countries.length > 10) {
    return (
      <div style={tooManyStyle}>
        Too many matches ({countries.length}). Please narrow your search.
      </div>
    );
  }

  return (
    <div style={listStyle}>
      {countries.map((country) => (
        <div key={country.cca3} style={rowStyle}>
          <div style={nameContainerStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={flagSmallStyle}
            />
            <span style={nameTextStyle}>{country.name.common}</span>
          </div>
          <button style={showButtonStyle} onClick={() => onSelect(country)}>
            Show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;