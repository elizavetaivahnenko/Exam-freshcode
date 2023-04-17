const fs = require("fs");
const moment = require("moment");
const logger = require("./logger");

createFolderForCopyLogs();

function handlerProcessLogs() {
  if (fs.existsSync(__dirname + "/error.log")) {
    const logData = fs.readFileSync(__dirname + "/error.log", "utf-8");
    clearErrorFile();
    const parsedLogData = JSON.parse([`${logData.replace(/,\s*$/, "")}`]);
    const newErrorLog = reformatErrorLogs(parsedLogData);
    saveErrorLogToFile(newErrorLog);
  }
}

function clearErrorFile() {
  fs.writeFile(__dirname + "/error.log", "", (err) => {
    if (err) {
      logger.error(err);
    }
  });
}

function reformatErrorLogs(array) {
  const newErrorLog = array
    .map(
      ({ message, code, time }) =>
        `{"message": "${message}", "code":"${code}", "time":"${time}"}`
    )
    .join("\n");
  return newErrorLog;
}

function saveErrorLogToFile(log) {
  const newErrorLogFile =
    __dirname + `/errorLogsFolder/${moment().format("YYYYMMDDHHmmss")}.log`;
  fs.writeFile(newErrorLogFile, log, (err) => {
    if (err) {
      logger.error(err);
    }
  });
}

function createFolderForCopyLogs() {
  const folderName = __dirname + "/errorLogsFolder";
  if (!fs.existsSync(folderName)) {
    fs.mkdir(folderName, (err) => {
      if (err) {
        logger.error(err);
      }
    });
  }
}

module.exports = handlerProcessLogs;
