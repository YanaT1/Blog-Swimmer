const {User} = require('../models/models');
const userService = require('../service/user-service');
const ApiError = require('../error/ApiError');

class AdminController {
    async adminDashboard(req, res, next){
        try {
            return res.json({message: `Welcome to admin panel`});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AdminController();