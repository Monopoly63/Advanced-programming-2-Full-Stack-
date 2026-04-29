/**
 * Node factory — creates a fresh counter per request.
 * Fixes the v2.0 bug where nodeCounter at module scope accumulated across requests.
 */
function createNodeFactory() {
  let counter = 0;

  function createNode(value, type, left = null, right = null) {
    const node = {
      id: `node-${++counter}`,
      value,
      type, // "operator" | "operand"
    };
    if (left)  node.left  = left;
    if (right) node.right = right;
    return node;
  }

  function reset() { counter = 0; }

  return { createNode, reset };
}

module.exports = { createNodeFactory };