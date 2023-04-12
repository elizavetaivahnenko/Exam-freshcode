const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

function logError({ message, code, stack, timestamp }) {
  logger.log({
    level: "error",
    message: message,
    time: timestamp || new Date(),
    code: code,
    stackTrace: stack,
  });
}

module.exports = logError;
