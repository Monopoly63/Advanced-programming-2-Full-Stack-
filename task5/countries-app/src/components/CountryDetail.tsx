// =============================================================================
//  CountryDetail — Full detail view for a single country.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { Country } from '../types';

interface CountryDetailProps {
  country: Country;
  onBack: () => void;
}

const cardStyle: CSSProperties = {
  padding: 28,
  borderRadius: 16,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(16px)',
};

const flagStyle: CSSProperties = {
  width: '100%',
  maxWidth: 320,
  borderRadius: 10,
  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
  marginBottom: 20,
};

const nameStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  marginBottom: 6,
  background: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const infoRowStyle: CSSProperties = {
  fontSize: 14,
  color: 'rgba(255,255,255,0.75)',
  marginBottom: 6,
  lineHeight: 1.6,
};

const labelStyle: CSSProperties = {
  fontWeight: 600,
  color: 'rgba(255,255,255,0.9)',
};

const tagContainerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
  marginTop: 4,
};

const tagStyle: CSSProperties = {
  padding: '3px 10px',
  borderRadius: 999,
  background: 'rgba(165,180,252,0.12)',
  color: '#a5b4fc',
  fontSize: 12,
  fontWeight: 600,
};

const backButtonStyle: CSSProperties = {
  marginTop: 20,
  padding: '8px 18px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.06)',
  color: '#ffffff',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
};

const CountryDetail = ({ country, onBack }: CountryDetailProps): JSX.Element => {
  const languages = country.languages ? Object.values(country.languages) : [];
  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`)
    : [];

  return (
    <div style={cardStyle}>
      <img
        src={country.flags.svg}
        alt={country.flags.alt ?? `Flag of ${country.name.common}`}
        style={flagStyle}
      />
      <h2 style={nameStyle}>{country.name.common}</h2>
      <p style={infoRowStyle}>
        <span style={labelStyle}>Official: </span>
        {country.name.official}
      </p>
      <p style={infoRowStyle}>
        <span style={labelStyle}>Capital: </span>
        {country.capital?.join(', ') ?? 'N/A'}
      </p>
      <p style={infoRowStyle}>
        <span style={labelStyle}>Region: </span>
        {country.region}
        {country.subregion ? ` — ${country.subregion}` : ''}
      </p>
      <p style={infoRowStyle}>
        <span style={labelStyle}>Population: </span>
        {country.population.toLocaleString()}
      </p>
      <p style={infoRowStyle}>
        <span style={labelStyle}>Area: </span>
        {country.area.toLocaleString()} km²
      </p>

      {languages.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <span style={{ ...labelStyle, fontSize: 14 }}>Languages:</span>
          <div style={tagContainerStyle}>
            {languages.map((lang) => (
              <span key={lang} style={tagStyle}>{lang}</span>
            ))}
          </div>
        </div>
      )}

      {currencies.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <span style={{ ...labelStyle, fontSize: 14 }}>Currencies:</span>
          <div style={tagContainerStyle}>
            {currencies.map((cur) => (
              <span key={cur} style={tagStyle}>{cur}</span>
            ))}
          </div>
        </div>
      )}

      <button style={backButtonStyle} onClick={onBack}>
        ← Back to list
      </button>
    </div>
  );
};

export default CountryDetail;