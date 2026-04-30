import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import InputPanel from './components/InputPanel/InputPanel';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import TreeVisualizer from './components/TreeVisualizer/TreeVisualizer';
import StepsPanel from './components/StepsPanel/StepsPanel';
import DeveloperCard from './components/DeveloperCard/DeveloperCard';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen relative">
      {/* Decorative radial glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(600px 400px at 15% 10%, rgba(198,255,61,0.15), transparent 60%),' +
            'radial-gradient(700px 500px at 90% 30%, rgba(96,165,250,0.08), transparent 60%),' +
            'radial-gradient(800px 500px at 50% 100%, rgba(198,255,61,0.10), transparent 60%)',
        }}
      />

      {/* Header */}
      <header className="px-4 md:px-8 pt-6 md:pt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-300 to-neon-500 flex items-center justify-center shadow-neon-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="2.5" fill="#0A0E1A" />
                <circle cx="5" cy="18" r="2.5" fill="#0A0E1A" />
                <circle cx="19" cy="18" r="2.5" fill="#0A0E1A" />
                <path d="M12 7L5.5 16M12 7l6.5 9" stroke="#0A0E1A" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="font-display text-lg md:text-xl font-bold text-white">
                {t('app.title')}{' '}
                <span className="text-neon-300">{t('app.subtitle')}</span>
              </div>
              <div className="text-[11px] md:text-xs text-white/50 mt-0.5">
                {t('app.tagline')}
              </div>
            </div>
          </motion.div>

          <LanguageToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 md:px-8 pt-10 md:pt-16 pb-6 md:pb-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/70 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon-300 animate-pulse" />
            <span>Tokenizer · Parser · D3 Tree · RTL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight"
          >
            {t('app.title')}{' '}
            <span className="neon-text">{t('app.subtitle')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-2xl mx-auto text-white/60 text-sm md:text-base leading-relaxed"
          >
            {t('app.description')}
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <main className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            <InputPanel />
            <ErrorMessage />
            <TreeVisualizer />
          </div>
          <aside className="space-y-5 md:space-y-6">
            <DeveloperCard />
            <StepsPanel />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto text-center text-xs text-white/40">
          {t('footer.year')} · {t('footer.madeWith')}
        </div>
      </footer>
    </div>
  );
}

export default App;