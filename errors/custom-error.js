class CustomError extends Error {
    constructor(message, statuscode) {
        super(message)
        this.statuscode = statuscode;
    }
}

const createCustomError = (message, statuscode) => new CustomError(message, statuscode)

module.exports = { createCustomError, CustomError }