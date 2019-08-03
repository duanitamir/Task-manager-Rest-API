const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWellcomeEmail = (email, name) => {
  sgMail.send({
      to: email,
      from: 'tduany@gmail.com',
      subject: 'Wellcome Email',
      text: `Wellcome ${name}! Let me know how you get along with the app!`,
      html: `<h1>Welcom to your new AppManager service!</hi>`
  })
};

const sendCancellationEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'tduany@gmail.com',
        subject: 'Cancellation Email',
        text: `Hi ${name}. Its unfotunate the you decided to close your account, i would be happy to hear your criticize and your experience with the app.`
    })
};

module.exports = {
    sendWellcomeEmail,
    sendCancellationEmail
};