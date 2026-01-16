const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class UserService {
    async registration(email, role, password) {
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.badRequest('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 9);
        const activationLink = uuid.v4();

        const user = await User.create({email, role, password: hashedPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}});
        if (!user) {
            throw ApiError.badRequest('Invalid activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password, role) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('Incorrect login or password');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.badRequest('Incorrect login or password');
        }
        const roles = await User.findOne({role: ['admin', 'user']});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refreshToken(refreshToken){
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized();
        }
        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async check(userId){
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.unauthorizedError('User not found');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async getUsers(){
        const users = await User.findAll();
        return users;
    }

    async forgotPassword(email) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('User with this email not found');
        }
        const resetToken = tokenService.generateResetToken({userId: user.id});
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();
        const resetLink = `${process.env.CLIENT_URL}/user/reset-password/${resetToken}`;
        await mailService.sendResetPasswordMail(email, resetLink);
        return {message: 'Check your email for the reset link'};
    }

    async resetPassword(token, newPassword, confirmPassword) {
        if (newPassword !== confirmPassword) {
            throw ApiError.badRequest('Passwords do not match');
        }
        const userData = tokenService.validateResetToken(token);
        if (!userData) {
            throw ApiError.badRequest('Password reset token is invalid or has expired');
        }
        const user = await User.findOne({
            where: {
                id: userData.userId,
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() }
            }
        });
        if (!user) {
            throw ApiError.badRequest('Password reset token is invalid or has expired');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 9);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        return { message: 'Password has been reset successfully' };
    }
}

module.exports = new UserService();