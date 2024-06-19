import logToCloudWatch from '../utils/cloudwatchLogger.js'; // Adjust the import path as necessary

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    logToCloudWatch('404 Not Found', { url: req.originalUrl, method: req.method });
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    logToCloudWatch('Error Handler Triggered', {
        url: req.originalUrl,
        method: req.method,
        message: err.message,
        statusCode: statusCode,
        stack: process.env.NODE_ENV === 'development' ? err.stack : 'Stack hidden in production',
    });
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

export { notFound, errorHandler };
