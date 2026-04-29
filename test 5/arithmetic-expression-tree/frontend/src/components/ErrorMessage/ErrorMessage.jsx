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
      className="bg-red-50 border border-red-200 rounded-2xl p-4 md:p-5 flex items-start gap-3"
    >
      <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={22} />
      <div className="flex-1">
        <div className="font-semibold text-red-700">{t('error.title')}</div>
        <div className="text-sm text-red-700 mt-1">{mainMessage}</div>
        {error.message && translatedCode && (
          <div className="text-xs text-red-600 mt-1 opacity-80">{error.message}</div>
        )}
        {typeof error.position === 'number' && (
          <div className="text-xs text-red-600 mt-1">
            {t('error.position', { p: error.position })}
          </div>
        )}
        <div className="text-xs text-red-500 mt-2">{t('error.tryAnother')}</div>
      </div>
    </div>
  );
}