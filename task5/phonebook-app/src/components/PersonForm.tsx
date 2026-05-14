// =============================================================================
//  PersonForm — Form for adding a new person (name + number).
//  Signed: by Abdulmoin Hablas
// =============================================================================

import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';

interface PersonFormProps {
  onSubmit: (name: string, number: string) => void;
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: 20,
  borderRadius: 14,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
  border: '1px solid rgba(255,255,255,0.1)',
  marginBottom: 28,
};

const titleStyle: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.85)',
  marginBottom: 4,
};

const inputStyle: CSSProperties = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#ffffff',
  fontSize: 14,
  outline: 'none',
};

const buttonStyle: CSSProperties = {
  padding: '10px 20px',
  borderRadius: 8,
  border: 'none',
  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
  color: '#ffffff',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  letterSpacing: '0.02em',
  transition: 'opacity 0.2s',
};

const PersonForm = ({ onSubmit }: PersonFormProps): JSX.Element => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newName.trim() || !newNumber.trim()) return;
    onSubmit(newName.trim(), newNumber.trim());
    setNewName('');
    setNewNumber('');
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <span style={titleStyle}>Add New Contact</span>
      <input
        style={inputStyle}
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Number"
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <button style={buttonStyle} type="submit">
        Add
      </button>
    </form>
  );
};

export default PersonForm;