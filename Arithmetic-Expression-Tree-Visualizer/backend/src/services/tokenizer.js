/**
 * Tokenizer for arithmetic expressions.
 * Produces an array of tokens: { type, value, position }
 * Token types: 'number' | 'identifier' | 'operator' | 'paren'
 */

const OPERATORS = new Set(['+', '-', '*', '/', '^', '%']);

function tokenize(expression) {
  const tokens = [];
  let i = 0;
  const src = expression;

  while (i < src.length) {
    const ch = src[i];

    // Skip whitespace
    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Numbers (integer or float)
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      let j = i;
      let hasDot = false;
      while (j < src.length && (/[0-9]/.test(src[j]) || (src[j] === '.' && !hasDot))) {
        if (src[j] === '.') hasDot = true;
        j++;
      }
      tokens.push({ type: 'number', value: src.slice(i, j), position: i });
      i = j;
      continue;
    }

    // Identifiers (variables)
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
      tokens.push({ type: 'identifier', value: src.slice(i, j), position: i });
      i = j;
      continue;
    }

    // Parens
    if (ch === '(' || ch === ')') {
      tokens.push({ type: 'paren', value: ch, position: i });
      i++;
      continue;
    }

    // Operators
    if (OPERATORS.has(ch)) {
      tokens.push({ type: 'operator', value: ch, position: i });
      i++;
      continue;
    }

    // Unknown character (should have been caught by validator, but be safe)
    const err = new Error(`Invalid character: ${ch}`);
    err.code = 'INVALID_CHARACTER';
    err.context = { char: ch };
    throw err;
  }

  return tokens;
}

module.exports = { tokenize, OPERATORS };