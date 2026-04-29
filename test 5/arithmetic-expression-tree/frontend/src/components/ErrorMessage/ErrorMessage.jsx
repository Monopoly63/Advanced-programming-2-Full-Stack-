import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { useExpressionParser } from '../../hooks/useExpressionParser';

export default function ErrorMessage() {
  const { t } = useTranslation();
  const { error } = useExpressionParser();

  if (!error) return null;

  const codeKey = `error.codes.${error.code || 'UNKNOWN'}`;
  const translatedCode = t(codeKey, { defaultValue: '' });
  const mainMessage = translatedCode || error.message || t('error.codes.UNKNOWN');

  return (
    <div
      role="alert"
      className="relative rounded-2xl p-5 md:p-6 flex items-start gap-4 animate-fade-in-up"
      style={{
        background: 'rgba(239, 68, 68, 0.06)',
        border: '1px solid rgba(239, 68, 68, 0.30)',
        boxShadow: '0 0 30px rgba(239, 68, 68, 0.10), inset 0 1px 0 rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
           style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
        <AlertCircle className="w-5 h-5 text-red-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white">{t('error.title')}</div>
        <div className="text-sm text-red-200/90 mt-1">{mainMessage}</div>
        {error.message && translatedCode && (
          <div className="text-xs text-red-200/60 mt-1 expression-font">{error.message}</div>
        )}
        {typeof error.position === 'number' && (
          <div className="text-xs text-red-200/70 mt-1.5">
            {t('error.position', { p: error.position })}
          </div>
        )}
        <div className="text-xs text-ink-secondary mt-3">{t('error.tryAnother')}</div>
      </div>
    </div>
  );
}