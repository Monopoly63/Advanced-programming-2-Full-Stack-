// =============================================================================
//  Part — Renders a single course part row.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const rowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)',
  fontSize: 14,
  color: 'rgba(255,255,255,0.85)',
};

const countStyle: CSSProperties = {
  fontWeight: 600,
  color: '#a5b4fc',
  fontSize: 13,
  background: 'rgba(165,180,252,0.12)',
  padding: '2px 10px',
  borderRadius: 999,
};

const Part = ({ part }: PartProps): JSX.Element => (
  <div style={rowStyle}>
    <span>{part.name}</span>
    <span style={countStyle}>{part.exerciseCount} exercises</span>
  </div>
);

export default Part;