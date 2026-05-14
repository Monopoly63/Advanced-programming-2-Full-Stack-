// =============================================================================
//  Total — Displays the total number of exercises across all parts.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { CoursePart } from '../types';

interface TotalProps {
  parts: CoursePart[];
}

const totalStyle: CSSProperties = {
  marginTop: 12,
  padding: '10px 14px',
  borderRadius: 10,
  background: 'linear-gradient(135deg, rgba(165,180,252,0.15), rgba(240,171,252,0.10))',
  border: '1px solid rgba(165,180,252,0.2)',
  fontSize: 14,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.9)',
  textAlign: 'center',
};

const Total = ({ parts }: TotalProps): JSX.Element => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div style={totalStyle}>
      Total of {total} exercises
    </div>
  );
};

export default Total;