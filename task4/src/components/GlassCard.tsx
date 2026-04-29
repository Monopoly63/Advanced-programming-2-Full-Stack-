// =============================================================================
//  GlassCard.tsx
//  A senior-level, fully-typed React + TypeScript glassmorphism card component.
//
//  Design tokens (dark glassmorphism):
//    - background deep black      : #0a0a0a
//    - surface dark gray          : #1a1a1a
//    - glass fill                 : rgba(255,255,255,0.05)
//    - border                     : rgba(255,255,255,0.1)
//    - accent / hover glow        : rgba(255,255,255,0.15)
//    - backdrop blur              : backdrop-filter: blur(20px)
//
//  No external UI libraries — only inline styles + pure CSS-in-JS.
// =============================================================================

import {
  useState,
  useMemo,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * Props accepted by {@link GlassCard}.
 *
 * The generic parameter `T` is the type of the tag identifiers. It defaults
 * to `string` but allows consumers to supply a stricter union, for example:
 *
 *   type Category = 'design' | 'engineering' | 'ai';
 *   <GlassCard<Category> tags={['design','ai']} ... />
 */
export interface GlassCardProps<T extends string = string> {
  /** Main heading of the card. */
  title: string;
  /** Optional secondary heading displayed under the title. */
  subtitle?: string;
  /** Body copy / description text. */
  description: string;
  /** Array of short tag strings rendered as chips. */
  tags: readonly T[];
  /** Optional image URL rendered as the card's media header. */
  image?: string;
  /** Optional small badge (e.g. "NEW", "PRO") shown in the top-right corner. */
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
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  accent: 'rgba(255, 255, 255, 0.15)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.55)',
  surface: '#1a1a1a',
} as const;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function GlassCard<T extends string = string>(
  props: GlassCardProps<T>
): JSX.Element {
  const { title, subtitle, description, tags, image, badge, onClick } = props;
  const [hovered, setHovered] = useState(false);
  const interactive = typeof onClick === 'function';

  // Root card style — memoized to avoid unnecessary re-computation.
  const rootStyle = useMemo<CSSProperties>(
    () => ({
      position: 'relative',
      width: '100%',
      maxWidth: 360,
      padding: 0,
      borderRadius: 20,
      overflow: 'hidden',
      background: hovered ? tokens.glassFillHover : tokens.glassFill,
      border: `1px solid ${hovered ? tokens.borderHover : tokens.border}`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: hovered
        ? '0 20px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.08), 0 0 40px rgba(255, 255, 255, 0.08)'
        : '0 10px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.04)',
      transform: hovered ? 'translateY(-4px) scale(1.015)' : 'translateY(0) scale(1)',
      transition:
        'transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1),' +
        'box-shadow 260ms ease,' +
        'background-color 260ms ease,' +
        'border-color 260ms ease',
      cursor: interactive ? 'pointer' : 'default',
      color: tokens.textPrimary,
      userSelect: 'none',
    }),
    [hovered, interactive]
  );

  const imageWrapStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    background: tokens.surface,
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transform: hovered ? 'scale(1.06)' : 'scale(1)',
    transition: 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  };

  const bodyStyle: CSSProperties = {
    padding: '22px 22px 20px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: 19,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: tokens.textPrimary,
    lineHeight: 1.3,
  };

  const subtitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.02em',
    color: tokens.textMuted,
    textTransform: 'uppercase',
  };

  const descriptionStyle: CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: 14,
    lineHeight: 1.6,
    color: tokens.textSecondary,
  };

  const tagRowStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  };

  const tagStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    padding: '5px 10px',
    borderRadius: 999,
    background: tokens.accent,
    border: `1px solid ${tokens.border}`,
    color: tokens.textPrimary,
  };

  const badgeStyle: CSSProperties = {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 2,
    padding: '4px 10px',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: 999,
    background: tokens.accent,
    border: `1px solid ${tokens.border}`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: tokens.textPrimary,
  };

  // Hover glow overlay — purely decorative.
  const glowStyle: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    borderRadius: 20,
    background:
      'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.08), transparent 40%)',
    opacity: hovered ? 1 : 0,
    transition: 'opacity 260ms ease',
  };

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={rootStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          // onClick is guarded by `interactive`.
          (onClick as MouseEventHandler<HTMLDivElement>)(
            e as unknown as React.MouseEvent<HTMLDivElement>
          );
        }
      }}
    >
      {badge !== undefined && <span style={badgeStyle}>{badge}</span>}

      {image && (
        <div style={imageWrapStyle}>
          <img src={image} alt={title} style={imageStyle} loading="lazy" />
        </div>
      )}

      <div style={bodyStyle}>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
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

      <div style={glowStyle} aria-hidden />
    </div>
  );
}

export default GlassCard;