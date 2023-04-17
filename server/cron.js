const CronJob = require("cron").CronJob;
const handlerProcessLogs = require("./copyLogger");

const job = new CronJob(
  "0 0 * * *",
  () => {
    handlerProcessLogs();
  },
  null,
  true,
  "Europe/Berlin"
);

module.exports = job;
