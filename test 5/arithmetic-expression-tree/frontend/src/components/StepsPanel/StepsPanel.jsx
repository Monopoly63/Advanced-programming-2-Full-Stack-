import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListOrdered } from 'lucide-react';
import { useExpressionParser } from '../../hooks/useExpressionParser';

export default function StepsPanel() {
  const { t } = useTranslation();
  const { steps } = useExpressionParser();

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
      <header className="flex items-center gap-2 mb-4">
        <ListOrdered className="text-primary-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">{t('steps.title')}</h2>
      </header>

      {!steps || steps.length === 0 ? (
        <div className="text-sm text-gray-500">{t('steps.empty')}</div>
      ) : (
        <ol className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {steps.map((s) => (
            <li
              key={s.step}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-primary-50/60 hover:border-primary-100 transition px-3 py-2"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
                {s.step}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-800">{s.detail}</div>
                {s.value && (
                  <div className="text-[11px] text-gray-500 mt-0.5 expression-font">
                    {s.nodeId} • {s.value}
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