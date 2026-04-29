import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Eraser, Sparkles } from 'lucide-react';
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
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">{t('input.label')}</span>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={t('input.placeholder')}
            dir="ltr"
            className="mt-2 w-full expression-font text-lg px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 focus:outline-none transition placeholder:text-gray-400"
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold shadow-sm hover:bg-primary-700 active:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            <Play size={18} />
            {loading ? t('input.loading') : t('input.generate')}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl !bg-transparent !hover:bg-transparent border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition"
          >
            <Eraser size={18} />
            {t('input.clear')}
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
            <Sparkles size={14} className="text-primary-500" />
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
                className="expression-font text-sm px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-100 transition"
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