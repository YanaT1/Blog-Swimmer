const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const userService = require('../service/user-service');
const {validationResult} = require('express-validator');

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(
                    'Email does not exist or password does not contain at least eight characters', 
                    errors.array()
                ));
            }
            const {email, role, password} = req.body;
            const userData = await userService.registration(email, role, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none'});
            return res.json(
                accessToken: userData.accessToken,
                user: userData.user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    } 
    
    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none'});
            return res.json(
                accessToken: userData.accessToken,
                user: userData.user
            );
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'none'})
            return res.json(token);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refreshToken(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none'});
            return res.json(
                accessToken: userData.accessToken,
                user: userData.user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async check(req, res, next) {
        try {
            const userData = await userService.check(req.user.id);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none'});
            return res.json(userData);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }    

    async getUsers(req, res, next){
        try{
            const users = await userService.getUsers();
            const userDto = users.map(user => ({
                email: user.email,
                id: user.id,
                role: user.role,
                isActivated: user.isActivated
            }))
            return res.json(userDto);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next){
        try{
            const id = req.params.id;
            await User.destroy({ where: { id: id } });
            
            const users = await userService.getUsers();
            const usersDto = users.map(user => ({
                email: user.email,
                id: user.id,
                role: user.role,
                isActivated: user.isActivated
            }));
            return res.json(usersDto);
        } catch (e) {
        next(ApiError.badRequest(e.message));
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const {email} = req.body;
            const result = await userService.forgotPassword(email);
            return res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async resetPassword(req, res, next) {
        try {
            const {token} = req.params; 
            const {password, confirmPassword} = req.body;
            const result = await userService.resetPassword(token, password, confirmPassword);
            return res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new UserController()