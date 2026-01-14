const ApiError = require('../error/ApiError');

const checkRole = (role) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return next(ApiError.unauthorizedError('User is not authorized'));
            }
            if (req.user.role !== role) {
                return next(ApiError.forbidden('Access denied: ' + role + ' role required'));
            }
            next();
        } catch (e) {
            next(ApiError.unauthorizedError('Role verification error'));
        }
    } 
}

module.exports = checkRole;