import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(next);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={toggle}
      className="glass hover:bg-white/10 rounded-xl px-3.5 py-2 text-sm text-white/90 flex items-center gap-2 transition"
      aria-label="Toggle language"
    >
      <Languages size={16} className="text-neon-300" />
      <span className="font-medium">{t('language.toggle')}</span>
    </motion.button>
  );
};

export default LanguageToggle;