import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Binary, Braces, GitBranch, Workflow, Gauge, Globe, Sparkles,
  Cpu, Layers, MousePointerClick, ArrowRight, Github,
} from 'lucide-react';
import InputPanel from './components/InputPanel/InputPanel';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import TreeVisualizer from './components/TreeVisualizer/TreeVisualizer';
import StepsPanel from './components/StepsPanel/StepsPanel';
import DeveloperCard from './components/DeveloperCard/DeveloperCard';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';
import { useExpressionParser } from './hooks/useExpressionParser';

/* --------------------------------------------------------------------
   Navbar
-------------------------------------------------------------------- */
function Navbar() {
  const { t } = useTranslation();
  const links = [
    { href: '#workspace', label: t('nav.workspace') },
    { href: '#features',  label: t('nav.features') },
    { href: '#how',       label: t('nav.how') },
    { href: '#developer', label: t('nav.developer') },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{
        background: 'rgba(4,7,15,0.70)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-primary-gradient shadow-glow-sm flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-[15px] font-semibold text-white leading-tight tracking-tight">
              AET <span className="text-ink-secondary font-normal">Visualizer</span>
            </div>
            <div className="text-[11px] text-ink-secondary leading-tight">
              {t('nav.tagline')}
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-secondary hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a
            href="#workspace"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all hover:scale-[1.02]"
          >
            {t('nav.launch')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------------
   Hero
-------------------------------------------------------------------- */
function Hero() {
  const { t } = useTranslation();
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] pointer-events-none" />
      <div className="glow-orb animate-pulse-glow" />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-20 md:pt-28 pb-20 md:pb-28 min-h-[90vh] flex items-center">
        <div className="w-full text-center stagger">
          <div className="flex justify-center">
            <div className="chip">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('hero.badge')}</span>
            </div>
          </div>

          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.05] text-[44px] sm:text-[56px] md:text-[72px]">
            <span className="text-gradient">{t('hero.headline1')}</span>
            <br />
            <span className="text-gradient">{t('hero.headline2')}</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-[17px] md:text-[18px] leading-relaxed text-ink-secondary">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#workspace" className="btn-primary">
              <MousePointerClick className="w-4 h-4" />
              {t('hero.ctaPrimary')}
            </a>
            <a href="#how" className="btn-ghost">
              {t('hero.ctaSecondary')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Floating mini-visual */}
          <div className="mt-16 flex justify-center" aria-hidden="true">
            <FloatingTreePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingTreePreview() {
  return (
    <div className="relative animate-floaty" style={{ animationDuration: '5s' }}>
      <svg
        width="320"
        height="180"
        viewBox="0 0 320 180"
        className="drop-shadow-[0_20px_40px_rgba(59,123,255,0.35)]"
      >
        <defs>
          <linearGradient id="opGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B7BFF" />
            <stop offset="100%" stopColor="#7B5BFF" />
          </linearGradient>
          <linearGradient id="linkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,123,255,0.7)" />
            <stop offset="100%" stopColor="rgba(123,91,255,0.3)" />
          </linearGradient>
        </defs>
        {/* Links */}
        <line x1="160" y1="40" x2="90"  y2="110" stroke="url(#linkGrad)" strokeWidth="2" />
        <line x1="160" y1="40" x2="230" y2="110" stroke="url(#linkGrad)" strokeWidth="2" />
        <line x1="90"  y1="110" x2="55"  y2="160" stroke="url(#linkGrad)" strokeWidth="2" />
        <line x1="90"  y1="110" x2="125" y2="160" stroke="url(#linkGrad)" strokeWidth="2" />
        {/* Operator nodes */}
        {[
          { cx: 160, cy: 40,  v: '*' },
          { cx: 90,  cy: 110, v: '+' },
        ].map((n) => (
          <g key={`${n.cx}-${n.cy}`}>
            <circle cx={n.cx} cy={n.cy} r="22" fill="url(#opGrad)" />
            <text x={n.cx} y={n.cy + 6} textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono" fontSize="18" fontWeight="700">{n.v}</text>
          </g>
        ))}
        {/* Operand nodes */}
        {[
          { cx: 230, cy: 110, v: 'C' },
          { cx: 55,  cy: 160, v: 'A' },
          { cx: 125, cy: 160, v: 'B' },
        ].map((n) => (
          <g key={`${n.cx}-${n.cy}`}>
            <circle cx={n.cx} cy={n.cy} r="20" fill="rgba(12,18,32,0.95)" stroke="rgba(59,123,255,0.55)" strokeWidth="2" />
            <text x={n.cx} y={n.cy + 5} textAnchor="middle" fill="#A8C4FF" fontFamily="JetBrains Mono" fontSize="15" fontWeight="700">{n.v}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------
   Stats Bar
-------------------------------------------------------------------- */
function StatsBar() {
  const { t } = useTranslation();
  const { metadata, steps, tree } = useExpressionParser();

  const stats = [
    { label: t('stats.nodes'),    value: metadata?.nodeCount ?? 0 },
    { label: t('stats.depth'),    value: metadata?.depth ?? 0 },
    { label: t('stats.tokens'),   value: metadata?.tokenCount ?? 0 },
    { label: t('stats.steps'),    value: steps?.length ?? 0 },
  ];

  return (
    <section className="relative max-w-[1200px] mx-auto px-6 -mt-4">
      <div className="glass px-6 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 stagger">
          {stats.map((s, i) => (
            <div key={s.label} className="relative">
              {i > 0 && (
                <div className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 h-10 w-px bg-white/[0.08]" />
              )}
              <div className="label-eyebrow mb-2">{s.label}</div>
              <div className="font-display font-bold text-4xl md:text-5xl text-white leading-none tabular-nums">
                {s.value}
              </div>
              <div className="mt-2 text-xs text-ink-muted">
                {tree ? t('stats.live') : t('stats.ready')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------
   Workspace (main app)
-------------------------------------------------------------------- */
function Workspace() {
  const { t } = useTranslation();
  return (
    <section id="workspace" className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-28">
      <div className="text-center mb-12 stagger">
        <div className="label-eyebrow">{t('workspace.eyebrow')}</div>
        <h2 className="mt-3 font-display font-bold text-3xl md:text-[40px] text-gradient leading-tight">
          {t('workspace.title')}
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-ink-secondary">
          {t('workspace.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 stagger">
        <div className="lg:col-span-2 space-y-6">
          <InputPanel />
          <ErrorMessage />
          <TreeVisualizer />
        </div>
        <div className="space-y-6">
          <StepsPanel />
          <DeveloperCard />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------
   Features
-------------------------------------------------------------------- */
function Features() {
  const { t } = useTranslation();
  const items = [
    {
      icon: Binary,
      title: t('features.tokenizer.title'),
      desc:  t('features.tokenizer.desc'),
    },
    {
      icon: Workflow,
      title: t('features.parser.title'),
      desc:  t('features.parser.desc'),
    },
    {
      icon: Braces,
      title: t('features.visualizer.title'),
      desc:  t('features.visualizer.desc'),
    },
  ];
  return (
    <section id="features" className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-28">
      <div className="text-center mb-14 stagger">
        <div className="label-eyebrow">{t('features.eyebrow')}</div>
        <h2 className="mt-3 font-display font-bold text-3xl md:text-[40px] text-gradient leading-tight">
          {t('features.title')}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-ink-secondary">
          {t('features.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className={`relative p-7 ${i === 1 ? 'glass-accent' : 'glass'} transition-transform hover:-translate-y-1`}
          >
            <div className="w-12 h-12 rounded-xl bg-primary-gradient flex items-center justify-center shadow-glow-sm mb-5">
              <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <h3 className="font-display font-semibold text-[22px] text-white leading-snug">
              {title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------
   How It Works
-------------------------------------------------------------------- */
function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    { icon: Layers,   title: t('how.step1.title'), desc: t('how.step1.desc') },
    { icon: Cpu,      title: t('how.step2.title'), desc: t('how.step2.desc') },
    { icon: Gauge,    title: t('how.step3.title'), desc: t('how.step3.desc') },
    { icon: GitBranch,title: t('how.step4.title'), desc: t('how.step4.desc') },
  ];
  return (
    <section id="how" className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-28">
      <div className="text-center mb-14 stagger">
        <div className="label-eyebrow">{t('how.eyebrow')}</div>
        <h2 className="mt-3 font-display font-bold text-3xl md:text-[40px] text-gradient leading-tight">
          {t('how.title')}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-ink-secondary">
          {t('how.subtitle')}
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* connecting line */}
        <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {steps.map(({ icon: Icon, title, desc }, idx) => (
          <div key={title} className="relative glass p-6 text-center animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="relative mx-auto w-14 h-14 rounded-full bg-primary-gradient flex items-center justify-center shadow-glow-sm">
              <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-elevated border border-white/20 text-[11px] font-semibold text-white flex items-center justify-center">
                {idx + 1}
              </span>
            </div>
            <h3 className="mt-5 font-display font-semibold text-[18px] text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------
   CTA
-------------------------------------------------------------------- */
function CTA() {
  const { t } = useTranslation();
  return (
    <section className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-28">
      <div className="relative overflow-hidden glass-accent px-8 md:px-16 py-16 md:py-20 text-center">
        <div
          className="absolute inset-0 -z-10 opacity-80 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(59,123,255,0.25) 0%, rgba(123,91,255,0.12) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="label-eyebrow">{t('cta.eyebrow')}</div>
        <h2 className="mt-3 font-display font-bold text-3xl md:text-[44px] text-gradient leading-tight">
          {t('cta.title')}
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-ink-secondary">
          {t('cta.subtitle')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#workspace" className="btn-primary">
            <Sparkles className="w-4 h-4" />
            {t('cta.primary')}
          </a>
          <a
            href="https://github.com/MousaAlawad1"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Github className="w-4 h-4" />
            {t('cta.secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------
   Footer
-------------------------------------------------------------------- */
function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t('footer.product.title'),
      links: [
        { label: t('footer.product.workspace'), href: '#workspace' },
        { label: t('footer.product.features'),  href: '#features' },
        { label: t('footer.product.how'),       href: '#how' },
      ],
    },
    {
      title: t('footer.resources.title'),
      links: [
        { label: t('footer.resources.grammar'), href: '#how' },
        { label: t('footer.resources.examples'),href: '#workspace' },
        { label: t('footer.resources.github'),  href: 'https://github.com/MousaAlawad1' },
      ],
    },
    {
      title: t('footer.contact.title'),
      links: [
        { label: 'GitHub',    href: 'https://github.com/MousaAlawad1' },
        { label: 'Instagram', href: 'https://instagram.com/1mousa_alawad' },
        { label: 'Telegram',  href: 'https://t.me/Mousa_Alawad' },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] mt-10">
      <div className="max-w-[1200px] mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-gradient shadow-glow-sm flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="font-semibold text-white">AET Visualizer</div>
          </div>
          <p className="mt-4 text-sm text-ink-secondary leading-relaxed max-w-xs">
            {t('footer.about')}
          </p>
          <div className="mt-5 flex items-center gap-2 text-ink-secondary">
            <Globe className="w-4 h-4" />
            <span className="text-xs">{t('footer.locale')}</span>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div className="label-eyebrow mb-4">{col.title}</div>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-sm text-ink-secondary hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <div>© {year} Mousa Alawad · Arithmetic Expression Tree Visualizer</div>
          <div>{t('footer.built')}</div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------------
   App
-------------------------------------------------------------------- */
export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="relative min-h-full bg-base text-white overflow-hidden">
      {/* Global ambient background (dots + noise) */}
      <div aria-hidden className="fixed inset-0 bg-dot-grid opacity-[0.04] pointer-events-none" />
      <div aria-hidden className="fixed inset-0 bg-noise pointer-events-none" />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StatsBar />
        <Workspace />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}