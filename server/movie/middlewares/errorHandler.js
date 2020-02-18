module.exports = function (error, req, res, next) {
    console.log(error)

    let statusCode,
        messageError = []

    switch (error.name) {
        case "ValidationError":
            statusCode = 400;
            for (const key in error.errors) {
                messageError.push(error.errors[key].message);
            };
            break;
        case 'CastError':
            statusCode = 400
            messageError = "passed id invalid"
            break;
        default:
            statusCode = error.status || 500;
            messageError = error.msg || "Internal Server Error";
            break;
    }


    res.status(statusCode).json({
        message: messageError
    })

}