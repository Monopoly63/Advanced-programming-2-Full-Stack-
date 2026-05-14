// =============================================================================
//  App.tsx — Course Information Application
//  Renders an array of courses, each with its parts and exercise totals.
//  Concepts: TypeScript interfaces, component composition, array of objects.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { CourseData } from './types';
import Course from './components/Course';

// ---------------------------------------------------------------------------
//  Course data — array of courses with typed structure
// ---------------------------------------------------------------------------
const courses: CourseData[] = [
  {
    id: 1,
    name: 'Half Stack Application Development',
    parts: [
      { name: 'Fundamentals of React', exerciseCount: 10 },
      { name: 'Using props to pass data', exerciseCount: 7 },
      { name: 'State of a component', exerciseCount: 14 },
    ],
  },
  {
    id: 2,
    name: 'Node.js Backend Development',
    parts: [
      { name: 'Routing', exerciseCount: 3 },
      { name: 'Middlewares', exerciseCount: 7 },
      { name: 'REST API Design', exerciseCount: 9 },
      { name: 'Testing with Jest', exerciseCount: 5 },
    ],
  },
  {
    id: 3,
    name: 'TypeScript Fundamentals',
    parts: [
      { name: 'Type Annotations', exerciseCount: 6 },
      { name: 'Interfaces & Generics', exerciseCount: 8 },
      { name: 'Type Guards & Narrowing', exerciseCount: 5 },
    ],
  },
];

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
  maxWidth: 860,
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
  marginBottom: 48,
  letterSpacing: '-0.005em',
};

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 28,
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
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Course Information</h1>
        <p style={subtitleStyle}>
          Advanced Programming 2 · Task 5 · Course Info App
        </p>

        <section style={gridStyle}>
          {courses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </section>

        <footer style={footerStyle}>
          Crafted by Abdulmoin Hablas · React + TypeScript
        </footer>
      </div>
    </main>
  );
}

export default App;