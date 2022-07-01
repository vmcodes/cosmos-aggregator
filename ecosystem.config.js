module.exports = {
  apps: [
    {
      name: "cosmos-aggregator",
      script: "node index",
      instances: 1,
      out_file: "/dev/null",
      error_file: "/dev/null",
      cron_restart: "0 23 * * *",
    },
  ],
};
