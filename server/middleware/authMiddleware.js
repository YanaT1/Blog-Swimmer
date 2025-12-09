const ApiError = require('../error/ApiError');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new ApiError.unauthorizedError('You not logged in');
        }

        const accesstoken = authorizationHeader.split(' ')[1];
        if (!accesstoken) {
            throw new ApiError.unauthorizedError('You not logged in');
        }
    
        const decoded = tokenService.validateAccessToken(accesstoken);
        if (!decoded) {
            throw new ApiError.unauthorizedError();
        }
        
        req.user = decoded;
        next();
    } catch (e) {
        next(ApiError.unauthorizedError('You not logged in'));
    }
}