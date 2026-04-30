/**
 * Pre-validation of raw expression string.
 * Returns null when valid, otherwise an error object { code, message, context }.
 */

const VALID_CHARS = /^[A-Za-z0-9_+\-*/^%().\s]+$/;

function validate(expression) {
  if (typeof expression !== 'string') {
    return { code: 'INVALID_BODY', message: 'Expression must be a string.' };
  }

  const trimmed = expression.trim();
  if (trimmed.length === 0) {
    return { code: 'EMPTY_EXPRESSION', message: 'Expression is empty.' };
  }

  // Invalid characters
  const invalid = trimmed.match(/[^A-Za-z0-9_+\-*/^%().\s]/);
  if (invalid) {
    return {
      code: 'INVALID_CHARACTER',
      message: `Invalid character: ${invalid[0]}`,
      context: { char: invalid[0] },
    };
  }

  // Parentheses balance
  let depth = 0;
  for (const ch of trimmed) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (depth < 0) {
      return { code: 'UNBALANCED_PARENS', message: 'Unbalanced parentheses.' };
    }
  }
  if (depth !== 0) {
    return { code: 'UNBALANCED_PARENS', message: 'Unbalanced parentheses.' };
  }

  // Consecutive binary operators (e.g. "A + * B"). Unary minus is handled by parser.
  if (/[+*/^%]\s*[+*/^%]/.test(trimmed)) {
    return {
      code: 'CONSECUTIVE_OPERATORS',
      message: 'Consecutive operators are not allowed.',
    };
  }

  return null;
}

module.exports = { validate, VALID_CHARS };