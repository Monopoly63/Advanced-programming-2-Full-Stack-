import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Instagram, Send } from 'lucide-react';

const DeveloperCard = () => {
  const { t } = useTranslation();

  const socials = [
    {
      icon: Github,
      label: t('developer.github'),
      href: 'https://github.com/MousaAlawad1',
      handle: 'MousaAlawad1',
    },
    {
      icon: Instagram,
      label: t('developer.instagram'),
      href: 'https://instagram.com/1mousa_alawad',
      handle: '@1mousa_alawad',
    },
    {
      icon: Send,
      label: t('developer.telegram'),
      href: 'https://t.me/Mousa_Alawad',
      handle: '@Mousa_Alawad',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass rounded-2xl p-5 md:p-6 relative overflow-hidden"
    >
      {/* Neon glow background */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-neon-300/20 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="text-xs uppercase tracking-wider text-neon-300 font-semibold mb-2">
          {t('developer.title')}
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-300 to-neon-500 flex items-center justify-center text-bg-deep font-display font-bold text-xl shadow-neon">
            MA
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-white">
              {t('developer.name')}
            </div>
            <div className="text-sm text-white/60">{t('developer.role')}</div>
          </div>
        </div>

        <div className="space-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-neon-300/40 hover:bg-white/[0.06] transition"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-neon-300 group-hover:border-neon-300/40 transition">
                <s.icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white/50">{s.label}</div>
                <div className="text-sm text-white/90 truncate" dir="ltr">{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperCard;