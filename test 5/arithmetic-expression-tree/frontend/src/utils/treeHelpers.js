/**
 * Utility helpers for working with expression trees on the frontend.
 */

export function countNodes(tree) {
  if (!tree) return 0;
  return 1 + countNodes(tree.left) + countNodes(tree.right);
}

export function treeDepth(tree) {
  if (!tree) return 0;
  return 1 + Math.max(treeDepth(tree.left), treeDepth(tree.right));
}

/**
 * Heuristic canvas size based on tree metadata.
 */
export function computeCanvasSize(tree) {
  const leaves = Math.max(1, countLeaves(tree));
  const depth = Math.max(1, treeDepth(tree));
  const width = Math.max(640, leaves * 140);
  const height = Math.max(360, depth * 110);
  return { width, height };
}

export function countLeaves(tree) {
  if (!tree) return 0;
  if (!tree.left && !tree.right) return 1;
  return countLeaves(tree.left) + countLeaves(tree.right);
}