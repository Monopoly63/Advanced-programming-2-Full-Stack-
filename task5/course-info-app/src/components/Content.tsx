// =============================================================================
//  Content — Renders each course part with its exercise count.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: CoursePart[];
}

const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '0 4px',
};

const Content = ({ parts }: ContentProps): JSX.Element => (
  <div style={contentStyle}>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

export default Content;