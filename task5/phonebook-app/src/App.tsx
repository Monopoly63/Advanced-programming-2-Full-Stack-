// =============================================================================
//  App.tsx — Phonebook Application
//  Features: search, add, update, delete contacts via json-server + axios.
//  Concepts: useEffect for data fetching, service module, CRUD, notifications.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { Person, Notification as NotificationData } from './types';
import personService from './services/personService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import NotificationBanner from './components/Notification';

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
  maxWidth: 600,
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

const sectionTitleStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.8)',
  marginBottom: 14,
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
  const [persons, setPersons] = useState<Person[]>([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState<NotificationData | null>(null);

  // Fetch all persons on mount.
  useEffect(() => {
    personService
      .getAll()
      .then((data) => setPersons(data))
      .catch(() => showNotification('Failed to load contacts from server.', 'error'));
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'error'): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // Add or update a person.
  const handleAddPerson = useCallback(
    (name: string, number: string): void => {
      const existing = persons.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );

      if (existing) {
        const confirmed = window.confirm(
          `${name} is already in the phonebook. Replace the old number with a new one?`
        );
        if (!confirmed) return;

        personService
          .update(existing.id, { name: existing.name, number })
          .then((updated) => {
            setPersons((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
            showNotification(`Updated ${updated.name}'s number.`, 'success');
          })
          .catch(() => {
            showNotification(
              `Information of ${name} has already been removed from the server.`,
              'error'
            );
            setPersons((prev) => prev.filter((p) => p.id !== existing.id));
          });
        return;
      }

      personService
        .create({ name, number })
        .then((created) => {
          setPersons((prev) => [...prev, created]);
          showNotification(`Added ${created.name}.`, 'success');
        })
        .catch(() => showNotification('Failed to add contact.', 'error'));
    },
    [persons, showNotification]
  );

  // Delete a person.
  const handleDeletePerson = useCallback(
    (id: string, name: string): void => {
      const confirmed = window.confirm(`Delete ${name}?`);
      if (!confirmed) return;

      personService
        .remove(id)
        .then(() => {
          setPersons((prev) => prev.filter((p) => p.id !== id));
          showNotification(`Deleted ${name}.`, 'success');
        })
        .catch(() => showNotification(`Failed to delete ${name}.`, 'error'));
    },
    [showNotification]
  );

  // Filtered list based on search query.
  const filteredPersons = useMemo(
    () =>
      persons.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [persons, filter]
  );

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Phonebook</h1>
        <p style={subtitleStyle}>
          Advanced Programming 2 · Task 5 · Phonebook App
        </p>

        <NotificationBanner notification={notification} />

        <Filter value={filter} onChange={setFilter} />

        <PersonForm onSubmit={handleAddPerson} />

        <h2 style={sectionTitleStyle}>
          Contacts ({filteredPersons.length})
        </h2>
        <Persons persons={filteredPersons} onDelete={handleDeletePerson} />

        <footer style={footerStyle}>
          Crafted by Abdulmoin Hablas · React + TypeScript + json-server
        </footer>
      </div>
    </main>
  );
}

export default App;