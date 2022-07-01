const cron = require("node-cron");
const aggregator = require("./app");
const db = require("./models");
const formatter = require("./services/formatter");
const email = require("./services/email");

async function process() {
  await aggregator.run();
  await formatter.formatData();

  await db.mongoose
    .disconnect()
    .then(() => {
      console.log("data aggregation complete");
    })
    .catch((err) => {
      console.log("error closing connection to the database:", err);
      process.exit();
    });
}

async function start() {
  await db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to the database, beginning data aggregation");
      process();
    })
    .catch((err) => {
      console.log("error connecting to the database:", err);
      process.exit();
    });
}

console.log("starting jobs");

// run job every 6 hours
cron.schedule(
  "0 */6 * * *",
  () => {
    console.log("aggregation job started");
    start();
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);

// send email at midnight
cron.schedule(
  "0 0 * * *",
  () => {
    email.sendEmail();
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);
