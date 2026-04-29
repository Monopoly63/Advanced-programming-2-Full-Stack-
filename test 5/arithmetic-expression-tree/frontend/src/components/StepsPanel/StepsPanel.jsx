import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListOrdered } from 'lucide-react';
import { useExpressionParser } from '../../hooks/useExpressionParser';

export default function StepsPanel() {
  const { t } = useTranslation();
  const { steps } = useExpressionParser();

  return (
    <section className="glass p-6 md:p-7">
      <header className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-glow-sm">
          <ListOrdered className="w-5 h-5 text-white" strokeWidth={2.3} />
        </div>
        <div>
          <div className="label-eyebrow">{t('steps.title')}</div>
          <h3 className="font-display font-semibold text-[18px] text-white leading-tight">
            {t('steps.title')}
          </h3>
        </div>
      </header>

      {!steps || steps.length === 0 ? (
        <div
          className="rounded-xl p-5 text-sm text-ink-secondary text-center"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)' }}
        >
          {t('steps.empty')}
        </div>
      ) : (
        <ol className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
          {steps.map((s) => (
            <li
              key={s.step}
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #3B7BFF 0%, #7B5BFF 100%)',
                  boxShadow: '0 0 12px rgba(59,123,255,0.4)',
                }}
              >
                {s.step}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white leading-snug">{s.detail}</div>
                {s.value && (
                  <div className="text-[11px] text-ink-muted mt-1 expression-font">
                    {s.nodeId} · {s.value}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}