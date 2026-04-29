import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InputPanel from './components/InputPanel/InputPanel';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import TreeVisualizer from './components/TreeVisualizer/TreeVisualizer';
import StepsPanel from './components/StepsPanel/StepsPanel';
import DeveloperCard from './components/DeveloperCard/DeveloperCard';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-full">
      <header className="bg-white/80 backdrop-blur border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-sm" />
            <div>
              <h1 className="text-base md:text-lg font-semibold text-gray-900 leading-tight">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">{t('app.subtitle')}</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <InputPanel />
          <ErrorMessage />
          <TreeVisualizer />
        </div>
        <div className="space-y-5">
          <StepsPanel />
          <DeveloperCard />
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-6 pb-8 pt-2 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Mousa Alawad — Arithmetic Expression Tree Visualizer
      </footer>
    </div>
  );
}