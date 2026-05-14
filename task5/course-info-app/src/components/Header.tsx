// =============================================================================
//  Header — Renders the course name as a styled heading.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';

interface HeaderProps {
  name: string;
}

const headerStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  marginBottom: 8,
  background: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const Header = ({ name }: HeaderProps): JSX.Element => (
  <h2 style={headerStyle}>{name}</h2>
);

export default Header;