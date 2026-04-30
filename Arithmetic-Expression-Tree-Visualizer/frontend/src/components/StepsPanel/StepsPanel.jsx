import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ListTree } from 'lucide-react';
import useAppStore from '../../store/appStore';

const StepsPanel = () => {
  const { t } = useTranslation();
  const steps = useAppStore((s) => s.steps);
  const tokens = useAppStore((s) => s.tokens);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-5 md:p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-neon-300/15 border border-neon-300/30 flex items-center justify-center">
          <ListTree size={16} className="text-neon-300" />
        </div>
        <h3 className="font-display text-lg font-semibold text-white">
          {t('steps.title')}
        </h3>
      </div>

      {tokens && tokens.length > 0 && (
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
            {t('steps.tokens')}
          </div>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {tokens.map((tok, i) => (
              <span
                key={i}
                className={`expression-font text-xs px-2.5 py-1 rounded-md border ${
                  tok.type === 'operator' || tok.type === 'paren'
                    ? 'bg-neon-300/10 border-neon-300/30 text-neon-300'
                    : 'bg-white/5 border-white/10 text-white/80'
                }`}
              >
                {tok.value}
              </span>
            ))}
          </div>
        </div>
      )}

      {(!steps || steps.length === 0) ? (
        <div className="text-sm text-white/40 py-4 text-center">
          {t('steps.empty')}
        </div>
      ) : (
        <ol className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              className="flex gap-3 items-start p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-neon-300/20 transition"
            >
              <span className="shrink-0 w-6 h-6 rounded-md bg-neon-300/15 text-neon-300 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/85">{step.description}</div>
                {step.detail && (
                  <div className="expression-font text-xs text-white/50 mt-0.5" dir="ltr">
                    {step.detail}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </motion.div>
  );
};

export default StepsPanel;