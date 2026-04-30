import { create } from 'zustand';

const useAppStore = create((set) => ({
  expression: '',
  tree: null,
  steps: [],
  metadata: null,
  tokens: [],
  error: null,
  loading: false,
  lastSubmitted: '',

  setExpression: (expression) => set({ expression }),

  setResult: ({ tree, steps, metadata, tokens, expression }) =>
    set({
      tree,
      steps: steps || [],
      metadata: metadata || null,
      tokens: tokens || [],
      error: null,
      loading: false,
      lastSubmitted: expression || '',
    }),

  setError: (error) => set({ error, tree: null, steps: [], loading: false }),
  setLoading: (loading) => set({ loading }),

  clear: () =>
    set({
      expression: '',
      tree: null,
      steps: [],
      metadata: null,
      tokens: [],
      error: null,
      loading: false,
      lastSubmitted: '',
    }),
}));

// Expose for debugging (Gate C)
if (typeof window !== 'undefined') {
  window.useAppStore = useAppStore;
}

export default useAppStore;