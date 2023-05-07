"use strict";
const { TOOLS_FOR_MAILER } = require("../constants");
const nodemailer = require("nodemailer");
const { HOST, PORT, EMAIL_SENDER, AUTH } = TOOLS_FOR_MAILER;

const transporter = nodemailer.createTransport(
  {
    host: HOST,
    port: PORT,
    auth: {
      user: AUTH.USER,
      pass: AUTH.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  { from: EMAIL_SENDER }
);

const mailer = (message) =>
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });

const createMessageText = (status, userName) => {
  let text;
  if (status === "confirmed") {
    text = `Hello, ${userName}! Your offer was confirmed`;
  } else if (status === "rejected") {
    text = `Hello, ${userName}! Unfortunately, your offer was rejected`;
  }
  return text;
};

module.exports.sendStatusOfferOnEmail = async (mailData) => {
  const { moderationStatus, User } = mailData;
  const message = {
    to: User.email,
    subject: `Your offer was ${moderationStatus}`,
    text: createMessageText(moderationStatus, User.firstName),
  };
  mailer(message);
};
