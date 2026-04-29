import { useAppStore } from '../store/appStore';

export function useExpressionParser() {
  const expression = useAppStore((s) => s.expression);
  const tree = useAppStore((s) => s.tree);
  const steps = useAppStore((s) => s.steps);
  const metadata = useAppStore((s) => s.metadata);
  const error = useAppStore((s) => s.error);
  const loading = useAppStore((s) => s.loading);
  const setExpression = useAppStore((s) => s.setExpression);
  const parseExpression = useAppStore((s) => s.parseExpression);
  const reset = useAppStore((s) => s.reset);

  return {
    expression,
    tree,
    steps,
    metadata,
    error,
    loading,
    setExpression,
    parseExpression,
    reset,
  };
}