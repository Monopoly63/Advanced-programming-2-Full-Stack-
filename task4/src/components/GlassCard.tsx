// =============================================================================
//  GlassCard.tsx
//  A senior-grade, fully-typed React + TypeScript glassmorphism card.
//
//  Design principles:
//    - Multi-layer glassmorphism (border gloss, inner highlight, ambient glow)
//    - Cinematic hover motion (lift + scale + subtle 3D tilt + image zoom)
//    - Pointer-reactive radial light (mouse-tracked highlight)
//    - Premium typography: tight letter-spacing, refined hierarchy
//    - Polished micro-details: chip iconography, layered shadows, vignette
//
//  Dark Glassmorphism palette:
//    background         : #0a0a0a
//    surface            : #1a1a1a
//    glass fill         : rgba(255,255,255,0.05)
//    glass fill hover   : rgba(255,255,255,0.08)
//    border             : rgba(255,255,255,0.10)
//    border hover       : rgba(255,255,255,0.22)
//    accent             : rgba(255,255,255,0.15)
//    blur               : backdrop-filter: blur(22px) saturate(160%)
//
//  No external UI libraries — only inline styles + CSS-in-JS.
// =============================================================================

import {
  useState,
  useMemo,
  useRef,
  useCallback,
  type CSSProperties,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * Props accepted by {@link GlassCard}.
 *
 * Generic `T` narrows the accepted tag union, e.g.
 *
 *   type Category = 'design' | 'engineering' | 'ai';
 *   <GlassCard<Category> tags={['design','ai']} ... />
 */
export interface GlassCardProps<T extends string = string> {
  /** Main heading. */
  title: string;
  /** Small uppercase label rendered above the title. */
  subtitle?: string;
  /** Body copy. */
  description: string;
  /** Tag chips. */
  tags: readonly T[];
  /** Optional cover image URL. */
  image?: string;
  /** Optional pill-style badge in the top-right corner. */
  badge?: ReactNode;
  /** Click handler — when provided, the card becomes interactive. */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

// -----------------------------------------------------------------------------
// Design tokens
// -----------------------------------------------------------------------------

const tokens = {
  glassFill: 'rgba(255, 255, 255, 0.05)',
  glassFillHover: 'rgba(255, 255, 255, 0.08)',
  border: 'rgba(255, 255, 255, 0.10)',
  borderHover: 'rgba(255, 255, 255, 0.22)',
  accent: 'rgba(255, 255, 255, 0.15)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.72)',
  textMuted: 'rgba(255, 255, 255, 0.52)',
  surface: '#1a1a1a',
} as const;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function GlassCard<T extends string = string>(
  props: GlassCardProps<T>
): JSX.Element {
  const { title, subtitle, description, tags, image, badge, onClick } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  // Mouse-tracked pointer (relative 0..1) for the reactive light overlay.
  const [pointer, setPointer] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.3,
  });

  const interactive = typeof onClick === 'function';

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setPointer({ x, y });
  }, []);

  // Root — memoized for perf.
  const rootStyle = useMemo<CSSProperties>(
    () => ({
      position: 'relative',
      width: '100%',
      maxWidth: 380,
      padding: 0,
      borderRadius: 22,
      overflow: 'hidden',
      background: hovered ? tokens.glassFillHover : tokens.glassFill,
      border: `1px solid ${hovered ? tokens.borderHover : tokens.border}`,
      backdropFilter: 'blur(22px) saturate(160%)',
      WebkitBackdropFilter: 'blur(22px) saturate(160%)',
      boxShadow: hovered
        ? [
            '0 30px 80px rgba(0, 0, 0, 0.55)',
            '0 12px 32px rgba(0, 0, 0, 0.35)',
            '0 0 0 1px rgba(255, 255, 255, 0.06)',
            '0 0 60px rgba(120, 140, 255, 0.08)',
          ].join(', ')
        : [
            '0 18px 50px rgba(0, 0, 0, 0.45)',
            '0 6px 18px rgba(0, 0, 0, 0.25)',
            '0 0 0 1px rgba(255, 255, 255, 0.04)',
          ].join(', '),
      transform: hovered
        ? 'translateY(-6px) scale(1.02)'
        : 'translateY(0) scale(1)',
      transition:
        'transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1),' +
        'box-shadow 420ms ease,' +
        'background-color 420ms ease,' +
        'border-color 420ms ease',
      cursor: interactive ? 'pointer' : 'default',
      color: tokens.textPrimary,
      userSelect: 'none',
      willChange: 'transform, box-shadow',
    }),
    [hovered, interactive]
  );

  const imageWrapStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 10',
    overflow: 'hidden',
    background:
      'linear-gradient(135deg, #1a1a1a 0%, #0f0f14 100%)',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transform: hovered ? 'scale(1.08)' : 'scale(1.001)',
    transition: 'transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    filter: hovered
      ? 'saturate(1.1) brightness(1.02)'
      : 'saturate(0.95) brightness(0.92)',
  };

  // Vignette + gradient overlay on the image for depth & legibility.
  const imageOverlayStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%),' +
      'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.08), transparent 50%)',
    pointerEvents: 'none',
  };

  const bodyStyle: CSSProperties = {
    padding: '22px 24px 22px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
    zIndex: 1,
  };

  const subtitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.14em',
    color: tokens.textMuted,
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  };

  const subtitleDotStyle: CSSProperties = {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: 999,
    background: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 100%)',
    boxShadow: '0 0 10px rgba(165, 180, 252, 0.6)',
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: 21,
    fontWeight: 650,
    letterSpacing: '-0.02em',
    color: tokens.textPrimary,
    lineHeight: 1.25,
  };

  const descriptionStyle: CSSProperties = {
    margin: '6px 0 0 0',
    fontSize: 14,
    lineHeight: 1.65,
    color: tokens.textSecondary,
    letterSpacing: '-0.005em',
  };

  const tagRowStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
  };

  const tagStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '6px 11px',
    borderRadius: 999,
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
    border: `1px solid ${tokens.border}`,
    color: tokens.textPrimary,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  const badgeStyle: CSSProperties = {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 3,
    padding: '5px 11px',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    borderRadius: 999,
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))',
    border: `1px solid rgba(255,255,255,0.28)`,
    backdropFilter: 'blur(14px) saturate(160%)',
    WebkitBackdropFilter: 'blur(14px) saturate(160%)',
    color: tokens.textPrimary,
    boxShadow:
      '0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
  };

  // Top inner highlight — the characteristic "glass gloss" stroke.
  const innerHighlightStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 22,
    pointerEvents: 'none',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 22%)',
    mixBlendMode: 'screen',
  };

  // Pointer-reactive radial light — follows cursor on hover.
  const pointerGlowStyle: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    borderRadius: 22,
    background: `radial-gradient(420px circle at ${pointer.x * 100}% ${
      pointer.y * 100
    }%, rgba(255,255,255,0.14), transparent 55%)`,
    opacity: hovered ? 1 : 0,
    transition: 'opacity 320ms ease',
    mixBlendMode: 'screen',
  };

  // Ambient outer glow ring on hover.
  const ambientGlowStyle: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    inset: -1,
    borderRadius: 23,
    background:
      'linear-gradient(135deg, rgba(165,180,252,0.35), rgba(240,171,252,0.25) 40%, rgba(56,189,248,0.25))',
    filter: 'blur(14px)',
    opacity: hovered ? 0.55 : 0,
    transition: 'opacity 420ms ease',
    zIndex: -1,
  };

  return (
    <div
      ref={rootRef}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={rootStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          (onClick as MouseEventHandler<HTMLDivElement>)(
            e as unknown as React.MouseEvent<HTMLDivElement>
          );
        }
      }}
    >
      <span style={ambientGlowStyle} aria-hidden />

      {badge !== undefined && <span style={badgeStyle}>{badge}</span>}

      {image && (
        <div style={imageWrapStyle}>
          <img src={image} alt={title} style={imageStyle} loading="lazy" />
          <div style={imageOverlayStyle} aria-hidden />
        </div>
      )}

      <div style={bodyStyle}>
        {subtitle && (
          <p style={subtitleStyle}>
            <span style={subtitleDotStyle} aria-hidden />
            {subtitle}
          </p>
        )}
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>

        {tags.length > 0 && (
          <div style={tagRowStyle}>
            {tags.map((tag) => (
              <span key={tag} style={tagStyle}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <span style={innerHighlightStyle} aria-hidden />
      <span style={pointerGlowStyle} aria-hidden />
    </div>
  );
}

export default GlassCard;