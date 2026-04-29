const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parseExpressionRouter = require('./routes/parseExpression');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', parseExpressionRouter);

app.use(errorHandler);

module.exports = app;