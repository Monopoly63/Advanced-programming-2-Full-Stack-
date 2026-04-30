const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parseExpressionRouter = require('./routes/parseExpression');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS configuration - accepts multiple allowed origins
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser requests (no origin) and any configured origin
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(null, true); // permissive fallback for dev; tighten in prod via env
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', parseExpressionRouter);

app.use(errorHandler);

module.exports = app;