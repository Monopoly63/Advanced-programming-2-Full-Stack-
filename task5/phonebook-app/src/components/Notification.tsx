// =============================================================================
//  Notification — Displays success/error messages with auto-dismiss.
//  Signed: by Abdulmoin Hablas
// =============================================================================

import type { CSSProperties } from 'react';
import type { Notification as NotificationData } from '../types';

interface NotificationProps {
  notification: NotificationData | null;
}

const baseStyle: CSSProperties = {
  padding: '12px 20px',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: 20,
  letterSpacing: '0.01em',
};

const successStyle: CSSProperties = {
  ...baseStyle,
  background: 'rgba(34,197,94,0.12)',
  border: '1px solid rgba(34,197,94,0.3)',
  color: '#4ade80',
};

const errorStyle: CSSProperties = {
  ...baseStyle,
  background: 'rgba(239,68,68,0.12)',
  border: '1px solid rgba(239,68,68,0.3)',
  color: '#f87171',
};

const NotificationBanner = ({ notification }: NotificationProps): JSX.Element | null => {
  if (!notification) return null;

  const style = notification.type === 'success' ? successStyle : errorStyle;

  return <div style={style}>{notification.message}</div>;
};

export default NotificationBanner;