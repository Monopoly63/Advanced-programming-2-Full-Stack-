const express = require('express');
const { z } = require('zod');
const { validate } = require('../services/validator');
const { tokenize } = require('../services/tokenizer');
const { parse } = require('../services/parser');
const { createNodeFactory } = require('../utils/nodeFactory');

const router = express.Router();

const BodySchema = z.object({
  expression: z.string().min(1).max(500),
});

router.post('/parse-expression', (req, res, next) => {
  let expression;
  try {
    ({ expression } = BodySchema.parse(req.body));

    // Pre-validation
    const preError = validate(expression);
    if (preError) {
      return res.status(400).json({ success: false, expression, error: preError });
    }

    // Tokenize
    const tokens = tokenize(expression);

    // Fresh factory per request — fixes nodeCounter bug
    const factory = createNodeFactory();

    // Parse
    const { tree, steps, metadata } = parse(tokens, factory, expression);

    return res.json({ success: true, expression, tree, metadata, steps });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_BODY',
          message: 'Request body must be { expression: string } (1–500 characters).',
        },
      });
    }
    if (err.code && err.message) {
      return res.status(400).json({
        success: false,
        expression: req.body?.expression,
        error: {
          code: err.code,
          message: err.message,
          ...(err.position !== undefined ? { position: err.position } : {}),
        },
      });
    }
    return next(err);
  }
});

module.exports = router;