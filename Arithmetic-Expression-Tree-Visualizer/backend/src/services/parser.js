/**
 * Recursive-descent parser for arithmetic expressions.
 *
 * Grammar (precedence lowest to highest):
 *   expression := term   (('+' | '-') term)*
 *   term       := factor (('*' | '/' | '%') factor)*
 *   factor     := unary  ('^' factor)?              // right-associative
 *   unary      := ('-' | '+') unary | primary
 *   primary    := number | identifier | '(' expression ')'
 */

const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
  'u-': 4, // unary minus
};

function parse(tokens, factory, originalExpression = '') {
  const steps = [];
  const createNode = factory.createNode;

  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function next() {
    return tokens[pos++];
  }
  function isAtEnd() {
    return pos >= tokens.length;
  }

  function unexpected(tok, expected) {
    const err = new Error(
      tok
        ? `Unexpected token: ${tok.value}`
        : expected
        ? `Expected ${expected}, got end of expression.`
        : 'Unexpected end of expression.'
    );
    err.code = tok ? 'UNEXPECTED_TOKEN' : 'MISSING_OPERAND';
    err.context = tok ? { token: tok.value } : {};
    throw err;
  }

  function parseExpression() {
    let left = parseTerm();
    while (!isAtEnd()) {
      const tok = peek();
      if (tok.type === 'operator' && (tok.value === '+' || tok.value === '-')) {
        next();
        const right = parseTerm();
        left = createNode(tok.value, 'operator', left, right);
        steps.push({
          description: `Combine with '${tok.value}'`,
          detail: `${describe(left.left)} ${tok.value} ${describe(left.right)}`,
        });
      } else {
        break;
      }
    }
    return left;
  }

  function parseTerm() {
    let left = parseFactor();
    while (!isAtEnd()) {
      const tok = peek();
      if (tok.type === 'operator' && (tok.value === '*' || tok.value === '/' || tok.value === '%')) {
        next();
        const right = parseFactor();
        left = createNode(tok.value, 'operator', left, right);
        steps.push({
          description: `Combine with '${tok.value}'`,
          detail: `${describe(left.left)} ${tok.value} ${describe(left.right)}`,
        });
      } else {
        break;
      }
    }
    return left;
  }

  function parseFactor() {
    const left = parseUnary();
    if (!isAtEnd() && peek().type === 'operator' && peek().value === '^') {
      next();
      const right = parseFactor(); // right-associative
      const node = createNode('^', 'operator', left, right);
      steps.push({
        description: `Combine with '^'`,
        detail: `${describe(node.left)} ^ ${describe(node.right)}`,
      });
      return node;
    }
    return left;
  }

  function parseUnary() {
    if (!isAtEnd()) {
      const tok = peek();
      if (tok.type === 'operator' && (tok.value === '-' || tok.value === '+')) {
        next();
        const operand = parseUnary();
        if (tok.value === '+') return operand;
        // Represent unary minus as operator with single child stored as `right`
        const zero = createNode('0', 'operand');
        const node = createNode('-', 'operator', zero, operand);
        steps.push({
          description: `Apply unary minus`,
          detail: `-${describe(operand)}`,
        });
        return node;
      }
    }
    return parsePrimary();
  }

  function parsePrimary() {
    if (isAtEnd()) {
      unexpected(null, 'operand');
    }
    const tok = next();
    if (tok.type === 'number' || tok.type === 'identifier') {
      const node = createNode(tok.value, 'operand');
      steps.push({
        description: `Read operand`,
        detail: tok.value,
      });
      return node;
    }
    if (tok.type === 'paren' && tok.value === '(') {
      const inner = parseExpression();
      const close = peek();
      if (!close || close.type !== 'paren' || close.value !== ')') {
        const err = new Error('Unbalanced parentheses.');
        err.code = 'UNBALANCED_PARENS';
        throw err;
      }
      next(); // consume ')'
      return inner;
    }
    unexpected(tok, 'operand');
    return null; // unreachable
  }

  function describe(node) {
    if (!node) return '';
    if (node.type === 'operand') return String(node.value);
    return `(${describe(node.left)} ${node.value} ${describe(node.right)})`;
  }

  // Top-level parse
  if (tokens.length === 0) {
    const err = new Error('Expression is empty.');
    err.code = 'EMPTY_EXPRESSION';
    throw err;
  }

  const tree = parseExpression();
  if (!isAtEnd()) {
    const tok = peek();
    const err = new Error(`Unexpected token: ${tok.value}`);
    err.code = 'UNEXPECTED_TOKEN';
    err.context = { token: tok.value };
    throw err;
  }

  const metadata = {
    originalExpression,
    tokenCount: tokens.length,
    nodeCount: factory.count(),
    tokens,
  };

  return { tree, steps, metadata };
}

module.exports = { parse, PRECEDENCE };