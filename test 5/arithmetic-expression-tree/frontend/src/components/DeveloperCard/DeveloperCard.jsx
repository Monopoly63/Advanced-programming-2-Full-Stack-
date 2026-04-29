import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Instagram, Send } from 'lucide-react';

export default function DeveloperCard() {
  const { t } = useTranslation();

  const links = [
    {
      label: t('developer.github'),
      value: 'MousaAlawad1',
      href: 'https://github.com/MousaAlawad1',
      icon: Github,
    },
    {
      label: t('developer.instagram'),
      value: '@1mousa_alawad',
      href: 'https://instagram.com/1mousa_alawad',
      icon: Instagram,
    },
    {
      label: t('developer.telegram'),
      value: '@Mousa_Alawad',
      href: 'https://t.me/Mousa_Alawad',
      icon: Send,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl shadow-sm p-5 md:p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-xl font-bold">
          MA
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/80">
            {t('developer.title')}
          </div>
          <div className="text-lg font-semibold">{t('developer.name')}</div>
          <div className="text-xs text-white/80">{t('developer.role')}</div>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {links.map(({ label, value, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              dir="ltr"
              className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/20 transition px-3 py-2"
            >
              <Icon size={18} className="shrink-0" />
              <span className="text-sm font-medium">{label}</span>
              <span className="ms-auto text-xs text-white/80 font-mono">{value}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}