const errorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
   

    console.error({
        status,
        message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
    });

    // Respond with error details
    res.status(status).json({
        success: false,
        status,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
