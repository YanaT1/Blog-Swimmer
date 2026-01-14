const SibApiV3Sdk = require('@sendinblue/client');

class BrevoService {
  constructor() {
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );
  }

  async sendEmail({ toEmail, toName, subject, htmlContent }) {
    try {
      const data = await this.apiInstance.sendTransacEmail({
        to: [{ email: toEmail, name: toName }],
        sender: { email: 'noreply@ivantryputen.com', name: 'Ivan Tryputen'},
        subject,
        htmlContent,
      });

      return data;
    } catch (error) {
      console.error('Brevo sendEmail error:', error);
      throw error;
    }
  }
}

module.exports = new BrevoService();


