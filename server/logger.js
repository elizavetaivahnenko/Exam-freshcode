const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ code, message, stack, timestamp }) => {
  return `{"message": "${message.replace(
    /(")/gm,
    "'"
  )}", "time": "${timestamp}", "code": "${code}", "stackTrace": "${stack.replace(
    /(")/gm,
    "'"
  )}"},`.replace(/(\r\n|\n|\r)/gm, "");
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [new transports.File({ filename: "error.log" })],
});

module.exports = logger;
