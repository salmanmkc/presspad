const nodeMailer = require('nodemailer');
const { email, pass, service } = require('./../../../config');

const mailsTypes = require('./mailsTypes');

const createHeader = require('./createHeader');
const createFooter = require('./createFooter');
const composeHtml = require('./composeHtml');

const sendMail = ({ type, userType, params }) => {
  const transporter = () =>
    nodeMailer.createTransport({
      service: service || 'gmail',
      auth: {
        user: email,
        pass,
      },
    });
  const { subject, createBody } = mailsTypes[userType][type];

  const header = createHeader(subject);
  const body = createBody(params);
  const footer = createFooter(params);

  const html = composeHtml({ header, body, footer });

  return transporter.sendMail({
    from: email,
    to: params.email,
    subject: 'Your profile has been approved',
    html,
  });
};
module.exports = sendMail;
