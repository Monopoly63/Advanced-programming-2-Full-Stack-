import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Play, X } from 'lucide-react';
import useAppStore from '../../store/appStore';
import useExpressionParser from '../../hooks/useExpressionParser';

const InputPanel = () => {
  const { t } = useTranslation();
  const expression = useAppStore((s) => s.expression);
  const setExpression = useAppStore((s) => s.setExpression);
  const loading = useAppStore((s) => s.loading);
  const clear = useAppStore((s) => s.clear);
  const { parse } = useExpressionParser();

  const examples = [
    { key: 'simple', val: 'A + B' },
    { key: 'precedence', val: 'A + B * C' },
    { key: 'parens', val: '(A + B) * C' },
    { key: 'complex', val: '((A + B) * C - D) / 2' },
    { key: 'power', val: '2 ^ 3 + 4' },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    parse(expression);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-2xl p-5 md:p-6"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label
          htmlFor="expr-input"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 font-medium"
        >
          <Sparkles size={14} className="text-neon-300" />
          {t('input.label')}
        </label>

        <div className="relative">
          <input
            id="expr-input"
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={t('input.placeholder')}
            maxLength={500}
            dir="ltr"
            className="w-full bg-bg-deep/60 border border-white/10 rounded-xl px-5 py-4 expression-font text-lg text-white placeholder:text-white/30 focus:border-neon-300/60 transition-all"
          />
          {expression && (
            <button
              type="button"
              onClick={clear}
              className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md hover:bg-white/10 transition flex items-center justify-center text-white/50 hover:text-white"
              aria-label={t('input.clear')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <p className="text-xs text-white/40">{t('input.hint')}</p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading || !expression.trim()}
            className="group relative overflow-hidden inline-flex items-center gap-2 bg-neon-300 text-bg-deep font-semibold px-6 py-3 rounded-xl shadow-neon hover:shadow-neon-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Play size={16} className="fill-current" />
            <span>{loading ? t('input.parsing') : t('input.generate')}</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" style={{ mixBlendMode: 'overlay' }} />
          </button>
        </div>

        <div>
          <div className="text-xs text-white/50 mb-2">{t('input.examples')}:</div>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                type="button"
                key={ex.key}
                onClick={() => setExpression(ex.val)}
                className="expression-font text-sm px-3 py-1.5 rounded-lg !bg-transparent !hover:bg-transparent border border-white/10 hover:border-neon-300/50 hover:text-neon-300 text-white/70 transition"
                dir="ltr"
              >
                {ex.val}
              </button>
            ))}
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default InputPanel;