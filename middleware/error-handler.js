const { CustomError } = require('../errors/custom-error')
const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomError)
        return res.status(err.statuscode).json({ msg: err.message })
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandler;