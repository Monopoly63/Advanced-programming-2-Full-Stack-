// =============================================================================
//  App.tsx — Countries Explorer Application
//  Features: search countries via restcountries.com, view details.
//  Concepts: useEffect, conditional rendering, API integration, debounce.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Country } from './types';
import countryService from './services/countryService';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

// ---------------------------------------------------------------------------
//  Styles
// ---------------------------------------------------------------------------
const pageStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '80px 24px 64px',
  background: [
    'radial-gradient(1200px circle at 8% -10%, rgba(99,102,241,0.22) 0%, transparent 45%)',
    'radial-gradient(900px circle at 110% 10%, rgba(56,189,248,0.18) 0%, transparent 45%)',
    'radial-gradient(900px circle at 50% 120%, rgba(236,72,153,0.14) 0%, transparent 50%)',
    '#0a0a0a',
  ].join(','),
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
};

const containerStyle: CSSProperties = {
  maxWidth: 700,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
};

const titleStyle: CSSProperties = {
  fontSize: 44,
  fontWeight: 700,
  letterSpacing: '-0.03em',
  textAlign: 'center',
  marginBottom: 12,
  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitleStyle: CSSProperties = {
  fontSize: 15,
  color: 'rgba(255,255,255,0.55)',
  textAlign: 'center',
  marginBottom: 40,
  letterSpacing: '-0.005em',
};

const searchLabelStyle: CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 8,
};

const searchInputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#ffffff',
  fontSize: 15,
  outline: 'none',
  backdropFilter: 'blur(8px)',
  marginBottom: 28,
};

const loadingStyle: CSSProperties = {
  textAlign: 'center',
  padding: 32,
  color: 'rgba(255,255,255,0.5)',
  fontSize: 14,
};

const footerStyle: CSSProperties = {
  marginTop: 64,
  textAlign: 'center',
  fontSize: 12,
  color: 'rgba(255,255,255,0.35)',
  letterSpacing: '0.04em',
};

// ---------------------------------------------------------------------------
//  App Component
// ---------------------------------------------------------------------------
function App(): JSX.Element {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch all countries once on mount.
  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setAllCountries(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Debounced client-side filter.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!query.trim()) {
        setFiltered([]);
        setSelected(null);
        return;
      }

      const results = allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(query.toLowerCase())
      );

      // Auto-select if exactly one match.
      if (results.length === 1) {
        setSelected(results[0]);
        setFiltered([]);
      } else {
        setSelected(null);
        setFiltered(results);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, allCountries]);

  const handleSelect = useCallback((country: Country): void => {
    setSelected(country);
    setFiltered([]);
  }, []);

  const handleBack = useCallback((): void => {
    setSelected(null);
    // Re-trigger filter from current query.
    const results = allCountries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [allCountries, query]);

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Countries Explorer</h1>
        <p style={subtitleStyle}>
          Advanced Programming 2 · Task 5 · Countries App
        </p>

        <label style={searchLabelStyle}>Search countries</label>
        <input
          style={searchInputStyle}
          type="text"
          placeholder="Type a country name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <div style={loadingStyle}>Loading countries…</div>}

        {!loading && selected && (
          <CountryDetail country={selected} onBack={handleBack} />
        )}

        {!loading && !selected && filtered.length > 0 && (
          <CountryList countries={filtered} onSelect={handleSelect} />
        )}

        {!loading && !selected && filtered.length === 0 && query.trim() !== '' && (
          <div style={loadingStyle}>No countries found for &quot;{query}&quot;.</div>
        )}

        <footer style={footerStyle}>
          Crafted by Abdulmoin Hablas · React + TypeScript + REST Countries API
        </footer>
      </div>
    </main>
  );
}

export default App;