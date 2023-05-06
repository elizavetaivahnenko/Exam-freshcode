"use strict";
const { EMAIL_SENDER } = require("../constants");
const nodemailer = require("nodemailer");

module.exports.sendStatusOfferOnEmail = async (
  userName,
  userEmail,
  text,
  status
) => {
  const message = {
    from: EMAIL_SENDER,
    to: userEmail,
    subject: `Your offer was ${status}ed`,
    html: `<h3>Hello, ${userName}</h3> <p>Your offer ${text} was ${status}ed one minute ago</p> <h5>More details on our site</h5>`,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "dolly98@ethereal.email",
      pass: "X2PEgqjz8FpNqzFBfZ",
    },
  });
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};
