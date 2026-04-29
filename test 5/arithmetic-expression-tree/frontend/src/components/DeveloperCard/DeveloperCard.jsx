import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Instagram, Send, ArrowUpRight } from 'lucide-react';

export default function DeveloperCard() {
  const { t } = useTranslation();

  const links = [
    {
      label: t('developer.github'),
      value: 'MousaAlawad1',
      href:  'https://github.com/MousaAlawad1',
      icon:  Github,
    },
    {
      label: t('developer.instagram'),
      value: '@1mousa_alawad',
      href:  'https://instagram.com/1mousa_alawad',
      icon:  Instagram,
    },
    {
      label: t('developer.telegram'),
      value: '@Mousa_Alawad',
      href:  'https://t.me/Mousa_Alawad',
      icon:  Send,
    },
  ];

  return (
    <section id="developer" className="relative glass-accent p-6 md:p-7 overflow-hidden">
      {/* Accent wash */}
      <div
        aria-hidden
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(123,91,255,0.35) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #3B7BFF 0%, #7B5BFF 100%)',
            boxShadow: '0 0 24px rgba(59,123,255,0.45)',
          }}
        >
          MA
        </div>
        <div>
          <div className="label-eyebrow">{t('developer.title')}</div>
          <div className="font-display font-semibold text-[18px] text-white leading-tight">
            {t('developer.name')}
          </div>
          <div className="text-xs text-ink-secondary mt-0.5">{t('developer.role')}</div>
        </div>
      </div>

      <ul className="relative mt-6 space-y-2">
        {links.map(({ label, value, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              dir="ltr"
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(59,123,255,0.15)', border: '1px solid rgba(59,123,255,0.25)' }}
              >
                <Icon className="w-4 h-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-white">{label}</span>
              <span className="ms-auto text-xs text-ink-secondary expression-font">{value}</span>
              <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-white transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}