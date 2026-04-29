/**
 * Pre-validation for the arithmetic expression string.
 * Returns a `{ code, message, position? }` error object if invalid, otherwise `null`.
 */

const ALLOWED_OPERATORS = ['+', '-', '*', '/', '^', '%'];
const ALLOWED_CHARS = /^[A-Za-z0-9_+\-*/^%().\s]+$/;

function validate(expression) {
  if (typeof expression !== 'string') {
    return { code: 'INVALID_TYPE', message: 'Expression must be a string.' };
  }

  const trimmed = expression.trim();
  if (trimmed.length === 0) {
    return { code: 'EMPTY_EXPRESSION', message: 'Expression cannot be empty.' };
  }

  if (trimmed.length > 500) {
    return { code: 'TOO_LONG', message: 'Expression exceeds the maximum of 500 characters.' };
  }

  if (!ALLOWED_CHARS.test(trimmed)) {
    // Find first illegal char position
    for (let i = 0; i < trimmed.length; i++) {
      const c = trimmed[i];
      if (!/[A-Za-z0-9_+\-*/^%().\s]/.test(c)) {
        return {
          code: 'ILLEGAL_CHARACTER',
          message: `Illegal character "${c}" at position ${i}.`,
          position: i,
        };
      }
    }
  }

  // Balanced parentheses
  let depth = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const c = trimmed[i];
    if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth < 0) {
        return {
          code: 'UNBALANCED_PARENTHESES',
          message: `Unexpected ")" at position ${i}.`,
          position: i,
        };
      }
    }
  }
  if (depth > 0) {
    return { code: 'UNBALANCED_PARENTHESES', message: 'Missing closing parenthesis.' };
  }

  return null;
}

module.exports = { validate };