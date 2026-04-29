/**
 * Recursive-descent parser for arithmetic expressions with precedence:
 *
 *   expression := term (( '+' | '-' ) term)*
 *   term       := power (( '*' | '/' | '%' ) power)*
 *   power      := unary ( '^' power )?           // right-associative
 *   unary      := '-' unary | primary
 *   primary    := number | identifier | '(' expression ')'
 *
 * Uses a per-request node factory so IDs restart at node-1 every call.
 */

const OP_NAMES = {
  '+': 'Add',
  '-': 'Subtract',
  '*': 'Multiply',
  '/': 'Divide',
  '%': 'Modulo',
  '^': 'Power',
};

function parse(tokens, factory, originalExpression) {
  const state = {
    tokens,
    pos: 0,
    steps: [],
  };

  function peek() { return state.tokens[state.pos]; }

  function consume() { return state.tokens[state.pos++]; }

  function expect(type, value) {
    const tok = peek();
    if (!tok || tok.type !== type || (value !== undefined && tok.value !== value)) {
      const pos = tok ? tok.position : originalExpression.length;
      const err = new Error(
        `Expected ${value ? `"${value}"` : type} at position ${pos}.`
      );
      err.code = 'SYNTAX_ERROR';
      err.position = pos;
      throw err;
    }
    return consume();
  }

  function pushStep(action, detail, node) {
    state.steps.push({
      step: state.steps.length + 1,
      action,
      detail,
      nodeId: node ? node.id : null,
      value: node ? node.value : null,
    });
  }

  function parseExpression() {
    let left = parseTerm();
    while (peek() && peek().type === 'operator' && (peek().value === '+' || peek().value === '-')) {
      const opTok = consume();
      const right = parseTerm();
      const node = factory.createNode(opTok.value, 'operator', left, right);
      pushStep(
        'combine',
        `Apply ${OP_NAMES[opTok.value]} (${opTok.value}) to [${left.value}] and [${right.value}]`,
        node
      );
      left = node;
    }
    return left;
  }

  function parseTerm() {
    let left = parsePower();
    while (
      peek() &&
      peek().type === 'operator' &&
      (peek().value === '*' || peek().value === '/' || peek().value === '%')
    ) {
      const opTok = consume();
      const right = parsePower();
      const node = factory.createNode(opTok.value, 'operator', left, right);
      pushStep(
        'combine',
        `Apply ${OP_NAMES[opTok.value]} (${opTok.value}) to [${left.value}] and [${right.value}]`,
        node
      );
      left = node;
    }
    return left;
  }

  function parsePower() {
    const base = parseUnary();
    if (peek() && peek().type === 'operator' && peek().value === '^') {
      consume();
      const exponent = parsePower(); // right-associative
      const node = factory.createNode('^', 'operator', base, exponent);
      pushStep(
        'combine',
        `Apply Power (^) to [${base.value}] and [${exponent.value}]`,
        node
      );
      return node;
    }
    return base;
  }

  function parseUnary() {
    if (peek() && peek().type === 'operator' && peek().value === '-') {
      consume();
      const operand = parseUnary();
      // Represent unary minus as (0 - operand) for a clean binary tree.
      const zero = factory.createNode('0', 'operand');
      pushStep('create', 'Create operand [0] for unary minus', zero);
      const node = factory.createNode('-', 'operator', zero, operand);
      pushStep('combine', `Apply unary minus to [${operand.value}]`, node);
      return node;
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const tok = peek();
    if (!tok) {
      const err = new Error('Unexpected end of expression.');
      err.code = 'SYNTAX_ERROR';
      err.position = originalExpression.length;
      throw err;
    }

    if (tok.type === 'number') {
      consume();
      const node = factory.createNode(tok.value, 'operand');
      pushStep('create', `Create operand [${tok.value}]`, node);
      return node;
    }

    if (tok.type === 'identifier') {
      consume();
      const node = factory.createNode(tok.value, 'operand');
      pushStep('create', `Create variable [${tok.value}]`, node);
      return node;
    }

    if (tok.type === 'lparen') {
      consume();
      const inner = parseExpression();
      expect('rparen', ')');
      return inner;
    }

    const err = new Error(`Unexpected token "${tok.value}" at position ${tok.position}.`);
    err.code = 'SYNTAX_ERROR';
    err.position = tok.position;
    throw err;
  }

  if (state.tokens.length === 0) {
    const err = new Error('Expression has no tokens to parse.');
    err.code = 'EMPTY_EXPRESSION';
    throw err;
  }

  const tree = parseExpression();

  if (state.pos < state.tokens.length) {
    const leftover = state.tokens[state.pos];
    const err = new Error(
      `Unexpected token "${leftover.value}" at position ${leftover.position}.`
    );
    err.code = 'SYNTAX_ERROR';
    err.position = leftover.position;
    throw err;
  }

  const metadata = {
    nodeCount: countNodes(tree),
    depth: treeDepth(tree),
    tokenCount: state.tokens.length,
  };

  return { tree, steps: state.steps, metadata };
}

function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

function treeDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}

module.exports = { parse };