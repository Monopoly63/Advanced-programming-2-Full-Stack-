import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-pill text-sm font-medium transition-all"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#8B9CBD',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(59,123,255,0.10)';
        e.currentTarget.style.borderColor = 'rgba(59,123,255,0.30)';
        e.currentTarget.style.color = '#FFFFFF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.color = '#8B9CBD';
      }}
      aria-label={t('language.toggle')}
    >
      <Languages className="w-4 h-4" />
      <span>{t('language.toggle')}</span>
    </button>
  );
}