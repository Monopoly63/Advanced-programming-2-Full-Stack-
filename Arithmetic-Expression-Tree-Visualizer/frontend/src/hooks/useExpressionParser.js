import { useCallback } from 'react';
import axios from 'axios';
import useAppStore from '../store/appStore';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function useExpressionParser() {
  const setResult = useAppStore((s) => s.setResult);
  const setError = useAppStore((s) => s.setError);
  const setLoading = useAppStore((s) => s.setLoading);

  const parse = useCallback(async (expression) => {
    const expr = (expression || '').trim();
    if (!expr) {
      setError({ code: 'EMPTY_EXPRESSION', message: 'Expression is empty.' });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/parse-expression`,
        { expression: expr },
        { timeout: 10000 }
      );
      if (res.data?.success) {
        setResult({
          tree: res.data.tree,
          steps: res.data.steps,
          metadata: res.data.metadata,
          tokens: res.data.metadata?.tokens || [],
          expression: expr,
        });
      } else {
        setError(res.data?.error || { code: 'UNKNOWN', message: 'Unknown error.' });
      }
    } catch (err) {
      const srvErr = err?.response?.data?.error;
      if (srvErr) {
        setError(srvErr);
      } else {
        setError({ code: 'NETWORK', message: err?.message || 'Network error.' });
      }
    }
  }, [setError, setLoading, setResult]);

  return { parse };
}