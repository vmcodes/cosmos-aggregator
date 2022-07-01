require("dotenv").config();

const apiList = [
  {
    token: "ATOM",
    denom: "uatom",
    api: "https://api.cosmos.network/cosmos",
  },
  {
    token: "JUNO",
    denom: "ujuno",
    api: "https://lcd-juno.itastakers.com/cosmos",
  },
  {
    token: "LUNA",
    denom: "uluna",
    api: "https://phoenix-lcd.terra.dev/cosmos",
  },
  {
    token: "UMEE",
    denom: "uumee",
    api: "https://api.blue.main.network.umee.cc/cosmos",
  },
];

const dbUrl = process.env.MONGODB_URL;

const smtpCreds = {
  host: process.env.SMTP_HOST,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  to: process.env.SMTP_TO,
  from: process.env.SMTP_FROM,
};

module.exports = {
  apiList,
  dbUrl,
  smtpCreds,
};
