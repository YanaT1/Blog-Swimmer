const ApiError = require('../error/ApiError');



const checkRole = (admin) => {
    return (req, res, next) => {
        if (req.user.role !== admin) {
           return ApiError.unauthorizedError('Only admin')
        }
        next();
    } 
}

module.exports = checkRole;