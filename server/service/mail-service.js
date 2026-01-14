const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: '"Ivan Tryputen" <noreply@ivantryputen.com>',
            to,
            subject: 'Activate your account' + process.env.API_URL,
            text:'',
            html: `
                <div>
                    <h1>Activate your account</h1>
                    <p>Please click on the following link to activate your account:</p>
                    <a href="${link}">${link}</a>
                    <br />
                    <p>Sincerely, Ivan.</p>
                </div>
            `
        })
    }

    async sendResetPasswordMail(to, link) {
        await this.transporter.sendMail({
            from: '"Ivan Tryputen" <noreply@ivantryputen.com>',
            to,
            subject: 'Password Reset Request',
            text: `Hello,

                You (or someone using your email) requested a password reset for your account.
                
                Please click the following link to reset your password:
                ${link}

                If you did not request this, you can safely ignore this email.
                
                Best regards,
                Ivan Tryputen
                ivantryputen.com`,
            html: `
                <div>
                    <h1>Password Reset</h1>
                    <p>Please click the following link to reset your password:</p>
                    <a href="${link}">${link}</a>
                    <br />
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending reset password email');
    }
}

module.exports = new MailService();