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
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl !bg-transparent !hover:bg-transparent border border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-700 transition text-sm font-medium"
      aria-label={t('language.toggle')}
    >
      <Languages size={16} />
      <span>{t('language.toggle')}</span>
    </button>
  );
}