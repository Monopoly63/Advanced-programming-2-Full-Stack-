// =============================================================================
//  App.tsx — Demo page showcasing 3 premium GlassCard variants.
//  All cards ship with images, badges, and rich typography.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import GlassCard from './components/GlassCard';

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  padding: '96px 24px 64px 24px',
  background: [
    'radial-gradient(1200px circle at 8% -10%, rgba(99, 102, 241, 0.22) 0%, transparent 45%)',
    'radial-gradient(900px circle at 110% 10%, rgba(56, 189, 248, 0.18) 0%, transparent 45%)',
    'radial-gradient(900px circle at 50% 120%, rgba(236, 72, 153, 0.14) 0%, transparent 50%)',
    '#0a0a0a',
  ].join(','),
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
};

// Subtle noise + grid aesthetic layer.
const backdropNoiseStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
    'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
  maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
  WebkitMaskImage:
    'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
  opacity: 0.5,
};

const containerStyle: CSSProperties = {
  maxWidth: 1240,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
};

const eyebrowStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 14px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.8)',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  backdropFilter: 'blur(10px)',
};

const eyebrowDotStyle: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: 999,
  background: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 100%)',
  boxShadow: '0 0 10px rgba(165,180,252,0.7)',
};

const headerStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: 64,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 18,
};

const titleStyle: CSSProperties = {
  fontSize: 48,
  fontWeight: 700,
  letterSpacing: '-0.03em',
  margin: 0,
  lineHeight: 1.05,
  background:
    'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitleStyle: CSSProperties = {
  fontSize: 16,
  color: 'rgba(255,255,255,0.62)',
  margin: 0,
  maxWidth: 560,
  lineHeight: 1.6,
  letterSpacing: '-0.005em',
};

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 32,
  justifyItems: 'center',
  alignItems: 'stretch',
};

const footerStyle: CSSProperties = {
  marginTop: 80,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
};

const signatureStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 20px',
  borderRadius: 999,
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(14px) saturate(160%)',
  WebkitBackdropFilter: 'blur(14px) saturate(160%)',
  boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
};

const signatureLabelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
};

const signatureNameStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '-0.005em',
  background:
    'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const hintStyle: CSSProperties = {
  fontSize: 12,
  color: 'rgba(255,255,255,0.35)',
  letterSpacing: '0.04em',
};

function App(): JSX.Element {
  return (
    <main style={pageStyle}>
      <div style={backdropNoiseStyle} aria-hidden />

      <div style={containerStyle}>
        <header style={headerStyle}>
          <span style={eyebrowStyle}>
            <span style={eyebrowDotStyle} aria-hidden />
            React · TypeScript · Glassmorphism
          </span>
          <h1 style={titleStyle}>Premium Glass Cards</h1>
          <p style={subtitleStyle}>
            Three senior-level card variants crafted with multi-layer glass,
            cinematic hover motion, and pointer-reactive lighting — no external
            UI libraries.
          </p>
        </header>

        <section style={gridStyle}>
          {/* Variant 1 — Hero product card with image, badge & click action */}
          <GlassCard
            title="Aurora Dashboard"
            subtitle="Product"
            description="A fully-typed analytics dashboard built with React & TypeScript. Ship signals, not noise — with real-time pipelines and observable-by-default tracing."
            tags={['React', 'TypeScript', 'Analytics']}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            badge="NEW"
            onClick={() => alert('Aurora Dashboard clicked')}
          />

          {/* Variant 2 — Infrastructure card with image + PRO badge */}
          <GlassCard
            title="Engine X Runtime"
            subtitle="Infrastructure"
            description="Low-latency edge runtime with strict typing, zero-config deploys, and built-in observability. Scale globally in a single command."
            tags={['Edge', 'Runtime', 'Serverless']}
            image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            badge="PRO"
          />

          {/* Variant 3 — Design-system card with image + FEATURED badge */}
          <GlassCard
            title="Nebula Design Kit"
            subtitle="Design System"
            description="A cohesive set of primitives, motion tokens, and color modes for building premium interfaces at scale — tuned for dark, light, and every story in between."
            tags={['Design', 'Tokens', 'Motion']}
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
            badge="FEATURED"
            onClick={() => alert('Nebula Design Kit clicked')}
          />
        </section>

        <footer style={footerStyle}>
          <div style={signatureStyle}>
            <span style={signatureLabelStyle}>Crafted by</span>
            <span style={signatureNameStyle}>Abdulmoin Hablas</span>
          </div>
          <span style={hintStyle}>
            Advanced Programming 2 · Task 4 · React + TypeScript
          </span>
        </footer>
      </div>
    </main>
  );
}

export default App;