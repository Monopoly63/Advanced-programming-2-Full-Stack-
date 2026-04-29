import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Eraser, Sparkles, Terminal, Loader2 } from 'lucide-react';
import { useExpressionParser } from '../../hooks/useExpressionParser';

const EXAMPLES = [
  '(A + B) * C',
  'a + b * c',
  '(x + y) / (z - 1)',
  '2 ^ 3 + 4 * 5',
  '-a + b * (c - d)',
  '(p + q) * (r - s) / t',
];

export default function InputPanel() {
  const { t } = useTranslation();
  const { expression, setExpression, parseExpression, reset, loading } = useExpressionParser();

  const handleSubmit = (e) => {
    e.preventDefault();
    parseExpression(expression);
  };

  return (
    <section className="glass-accent p-6 md:p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-glow-sm">
          <Terminal className="w-5 h-5 text-white" strokeWidth={2.3} />
        </div>
        <div>
          <div className="label-eyebrow">{t('input.label')}</div>
          <h3 className="font-display font-semibold text-[18px] text-white leading-tight">
            {t('workspace.title')}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={t('input.placeholder')}
            dir="ltr"
            className="expression-font text-[17px] md:text-[18px] w-full px-5 py-4 glass-input"
            autoComplete="off"
            spellCheck={false}
          />
          {loading && (
            <Loader2 className="w-5 h-5 text-accent absolute top-1/2 -translate-y-1/2 right-4 animate-spin" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={loading} className="btn-primary">
            <Play className="w-4 h-4" strokeWidth={2.5} />
            {loading ? t('input.loading') : t('input.generate')}
          </button>
          <button type="button" onClick={reset} className="btn-ghost">
            <Eraser className="w-4 h-4" />
            {t('input.clear')}
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 label-eyebrow mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            {t('input.examples')}
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setExpression(ex);
                  parseExpression(ex);
                }}
                dir="ltr"
                className="expression-font chip"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
}