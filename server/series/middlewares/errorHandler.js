module.exports = function (error, req, res, next) {
    console.log(error)

    res.status(500).json({
        message: 'Internal Server Error'
    })
}