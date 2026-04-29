/**
 * Tokenizer — converts an arithmetic expression string into a list of tokens.
 * Token shape: { type: 'number' | 'identifier' | 'operator' | 'lparen' | 'rparen', value: string, position: number }
 */

const OPERATORS = new Set(['+', '-', '*', '/', '^', '%']);

function isDigit(c) { return c >= '0' && c <= '9'; }
function isLetter(c) { return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'; }
function isAlphaNum(c) { return isLetter(c) || isDigit(c); }

function tokenize(expression) {
  const tokens = [];
  let i = 0;
  const n = expression.length;

  while (i < n) {
    const c = expression[i];

    // Skip whitespace
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
      i++;
      continue;
    }

    // Number (integer or float)
    if (isDigit(c) || (c === '.' && i + 1 < n && isDigit(expression[i + 1]))) {
      let start = i;
      let hasDot = false;
      while (i < n && (isDigit(expression[i]) || expression[i] === '.')) {
        if (expression[i] === '.') {
          if (hasDot) {
            const err = new Error(`Invalid number: multiple decimal points at position ${i}.`);
            err.code = 'INVALID_NUMBER';
            err.position = i;
            throw err;
          }
          hasDot = true;
        }
        i++;
      }
      tokens.push({ type: 'number', value: expression.slice(start, i), position: start });
      continue;
    }

    // Identifier (variable)
    if (isLetter(c)) {
      let start = i;
      while (i < n && isAlphaNum(expression[i])) i++;
      tokens.push({ type: 'identifier', value: expression.slice(start, i), position: start });
      continue;
    }

    // Operators
    if (OPERATORS.has(c)) {
      tokens.push({ type: 'operator', value: c, position: i });
      i++;
      continue;
    }

    if (c === '(') {
      tokens.push({ type: 'lparen', value: '(', position: i });
      i++;
      continue;
    }
    if (c === ')') {
      tokens.push({ type: 'rparen', value: ')', position: i });
      i++;
      continue;
    }

    // Unknown character (should have been caught by validator, but be defensive)
    const err = new Error(`Unexpected character "${c}" at position ${i}.`);
    err.code = 'ILLEGAL_CHARACTER';
    err.position = i;
    throw err;
  }

  return tokens;
}

module.exports = { tokenize };