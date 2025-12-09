const brevoService = require('../service/clientMail-service');

exports.handleContactForm = async (req, res) => {
  console.log('Получен запрос /contact:', req.body);
  const {name, email, message} = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({error: 'Fill in all fields'});
  }
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    return res.status(400).json({error: 'Invalid email'});
  }

  const subject = `New message from ${name}`;
  const htmlContent = `<p><b>Name:</b> ${name}</p>
                       <p><b>Email:</b> ${email}</p>
                       <p><b>Message:</b><br>${message}</p>
                      `;

  try {
    await brevoService.sendEmail({
      toEmail: 'plswimmer78@gmail.com',
      toName: 'Ivan',
      subject,
      htmlContent,
    });

    res.json({ message: 'Letter sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({error: 'Failed to send email'});
  }
};
