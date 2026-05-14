// =============================================================================
//  Filter — Search input for filtering persons by name.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

const wrapperStyle: CSSProperties = {
  marginBottom: 28,
};

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 8,
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#ffffff',
  fontSize: 15,
  outline: 'none',
  backdropFilter: 'blur(8px)',
};

const Filter = ({ value, onChange }: FilterProps): JSX.Element => (
  <div style={wrapperStyle}>
    <label style={labelStyle}>Search contacts</label>
    <input
      style={inputStyle}
      type="text"
      placeholder="Type a name…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Filter;