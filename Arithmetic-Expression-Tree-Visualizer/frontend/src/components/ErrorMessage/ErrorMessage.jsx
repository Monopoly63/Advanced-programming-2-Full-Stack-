import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/appStore';

const ErrorMessage = () => {
  const { t } = useTranslation();
  const error = useAppStore((s) => s.error);

  if (!error) return null;

  const key = `errors.${error.code}`;
  const translated = t(key, { ...(error.context || {}), defaultValue: '' });
  const message = translated || error.message || t('errors.UNKNOWN');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-red-500/40 bg-red-500/10 backdrop-blur-xl p-4 flex gap-3 items-start"
      >
        <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
          <AlertTriangle size={18} className="text-red-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-red-200 mb-0.5">
            {t('errors.title')}
          </div>
          <div className="text-sm text-red-100/85 break-words">{message}</div>
          {error.code && (
            <div className="text-xs text-red-200/50 mt-1 font-mono">{error.code}</div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;