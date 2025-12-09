const jwt = require('jsonwebtoken');
const {Token} = require('../models/models');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'10m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    generateResetToken(payload) {
        const resetToken = jwt.sign(payload, process.env.JWT_RESET_PASSWORD_SECRET, {expiresIn: '1h'});
        return resetToken;
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateResetToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where: {userId: userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({userId: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await Token.destroy.refreshToken;
        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = await Token.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();