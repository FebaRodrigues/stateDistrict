module.exports = (err, req, res, next) => {
    console.error(err.stack);

    // If error has no status, default to 500
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong!';

    res.status(statusCode).json({
        success: false,
        message
    });
};
