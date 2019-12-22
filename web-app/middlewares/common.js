
logger = (req, res, next) => {
    console.log(`Requested! URL : ${req.url} Method: ${req.method}`);
    next();
}


wrongRoute = (req, res, next) => {
    var error = new Error("Route does not exists please try with another route");
    error.status = 404;
    next(error);
}


errorHandler = (err, req, res, next) => {
    var errObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };
    res.status(err.status).json(errObj);
};



module.exports = { logger, wrongRoute, errorHandler, userLogin };