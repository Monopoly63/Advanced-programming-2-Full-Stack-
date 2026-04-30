/**
 * Node factory for parse tree nodes.
 * Each request should create its own factory so that IDs are deterministic
 * and counters never leak across requests (fixes the v2.0 nodeCounter bug).
 */
function createNodeFactory() {
  let counter = 0;

  function createNode(value, type, left = null, right = null) {
    const node = {
      id: `node-${++counter}`,
      value,
      type, // "operator" | "operand"
    };
    if (left) node.left = left;
    if (right) node.right = right;
    return node;
  }

  function reset() {
    counter = 0;
  }

  function count() {
    return counter;
  }

  return { createNode, reset, count };
}

module.exports = { createNodeFactory };