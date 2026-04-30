module.exports = function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[ERROR]', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message:
        process.env.NODE_ENV === 'production'
          ? 'Something went wrong.'
          : err.message,
    },
  });
};