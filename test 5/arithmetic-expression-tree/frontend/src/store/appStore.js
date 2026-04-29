import { create } from 'zustand';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const useAppStore = create((set, get) => ({
  expression: '',
  tree: null,
  steps: [],
  metadata: null,
  error: null,
  loading: false,

  setExpression: (expression) => set({ expression, error: null }),

  reset: () =>
    set({ expression: '', tree: null, steps: [], metadata: null, error: null, loading: false }),

  parseExpression: async (expr) => {
    const target = typeof expr === 'string' ? expr : get().expression;
    const trimmed = (target || '').trim();
    if (!trimmed) {
      set({
        error: { code: 'EMPTY_EXPRESSION', message: 'Please enter an expression first.' },
        tree: null,
        steps: [],
        metadata: null,
      });
      return;
    }
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_BASE}/api/parse-expression`, { expression: trimmed });
      if (res.data && res.data.success) {
        set({
          tree: res.data.tree,
          steps: res.data.steps || [],
          metadata: res.data.metadata || null,
          error: null,
          loading: false,
          expression: trimmed,
        });
      } else {
        set({
          tree: null,
          steps: [],
          metadata: null,
          error: res.data?.error || { code: 'UNKNOWN', message: 'Unknown error.' },
          loading: false,
        });
      }
    } catch (err) {
      const apiError = err?.response?.data?.error;
      set({
        tree: null,
        steps: [],
        metadata: null,
        error: apiError || {
          code: 'NETWORK_ERROR',
          message: err?.message || 'Could not reach the server.',
        },
        loading: false,
      });
    }
  },
}));

// Expose store globally in dev for Gate C debugging
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.useAppStore = useAppStore;
}