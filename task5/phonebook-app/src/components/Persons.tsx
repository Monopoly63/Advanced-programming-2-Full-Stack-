// =============================================================================
//  Persons — Renders the filtered list of persons with delete capability.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { Person } from '../types';

interface PersonsProps {
  persons: Person[];
  onDelete: (id: string, name: string) => void;
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
  padding: '12px 16px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.06)',
  transition: 'background 0.2s',
};

const nameStyle: CSSProperties = {
  fontWeight: 600,
  fontSize: 14,
  color: 'rgba(255,255,255,0.9)',
};

const numberStyle: CSSProperties = {
  fontSize: 13,
  color: 'rgba(255,255,255,0.55)',
  marginLeft: 8,
};

const deleteButtonStyle: CSSProperties = {
  padding: '5px 12px',
  borderRadius: 6,
  border: '1px solid rgba(239,68,68,0.4)',
  background: 'rgba(239,68,68,0.12)',
  color: '#f87171',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const emptyStyle: CSSProperties = {
  textAlign: 'center',
  padding: 32,
  color: 'rgba(255,255,255,0.35)',
  fontSize: 14,
};

const Persons = ({ persons, onDelete }: PersonsProps): JSX.Element => {
  if (persons.length === 0) {
    return <div style={emptyStyle}>No contacts found.</div>;
  }

  return (
    <div style={listStyle}>
      {persons.map((person) => (
        <div key={person.id} style={rowStyle}>
          <div>
            <span style={nameStyle}>{person.name}</span>
            <span style={numberStyle}>{person.number}</span>
          </div>
          <button
            style={deleteButtonStyle}
            onClick={() => onDelete(person.id, person.name)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;