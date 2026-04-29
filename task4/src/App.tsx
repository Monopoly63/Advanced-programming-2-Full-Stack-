// =============================================================================
//  App.tsx — Demo page that showcases 3 GlassCard variants.
// =============================================================================

import type { CSSProperties } from 'react';
import GlassCard from './components/GlassCard';

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '80px 24px',
  background:
    'radial-gradient(1200px circle at 10% -10%, #1f1f2e 0%, transparent 50%),' +
    'radial-gradient(900px circle at 110% 10%, #0e1a2b 0%, transparent 45%),' +
    '#0a0a0a',
  color: '#ffffff',
};

const containerStyle: CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
};

const headerStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: 56,
};

const titleStyle: CSSProperties = {
  fontSize: 40,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: 0,
  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitleStyle: CSSProperties = {
  fontSize: 16,
  color: 'rgba(255,255,255,0.6)',
  marginTop: 12,
};

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 28,
  justifyItems: 'center',
  alignItems: 'stretch',
};

function App(): JSX.Element {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Glassmorphism Cards</h1>
          <p style={subtitleStyle}>
            Three senior-engineer variants · React + TypeScript · zero UI libs
          </p>
        </header>

        <section style={gridStyle}>
          {/* Variant 1: with image + badge + click handler */}
          <GlassCard
            title="Aurora Dashboard"
            subtitle="Product"
            description="A fully-typed analytics dashboard built with React, TypeScript, and a pinch of glass. Ship signals, not noise."
            tags={['React', 'TypeScript', 'Analytics']}
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60"
            badge="NEW"
            onClick={() => alert('Aurora Dashboard clicked')}
          />

          {/* Variant 2: no image, with badge, stronger copy */}
          <GlassCard
            title="Engine X Runtime"
            subtitle="Infrastructure"
            description="Low-latency edge runtime with strict typing, zero-config deploys, and observable-by-default tracing."
            tags={['Edge', 'Runtime', 'Observability']}
            badge="PRO"
          />

          {/* Variant 3: minimal — no image, no badge, just content */}
          <GlassCard
            title="Nebula Design Kit"
            subtitle="Design System"
            description="A cohesive set of primitives, motion tokens, and color modes for building premium interfaces at scale."
            tags={['Design', 'Tokens', 'Motion']}
          />
        </section>
      </div>
    </main>
  );
}

export default App;