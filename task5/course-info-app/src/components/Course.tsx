// =============================================================================
//  Course — Composes Header, Content, and Total for a single course.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { CourseData } from '../types';
import Header from './Header';
import Content from './Content';
import Total from './Total';

interface CourseProps {
  course: CourseData;
}

const cardStyle: CSSProperties = {
  padding: 24,
  borderRadius: 16,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(16px) saturate(140%)',
  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const Course = ({ course }: CourseProps): JSX.Element => (
  <article style={cardStyle}>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </article>
);

export default Course;