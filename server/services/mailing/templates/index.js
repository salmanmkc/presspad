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
  const footer = createFooter();

  const html = composeHtml({ header, body, footer });

  const attachments = [
    {
      filename: 'presspad-logo.png',
      path: `${__dirname}/../../../assets/presspad-logo.png`,
      cid: 'logo',
    },
  ];

  return transporter.sendMail({
    from: email,
    to: params.email,
    subject,
    html,
    attachments,
  });
};
module.exports = sendMail;
