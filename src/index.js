const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const ApiRoute = require("./routers/index");
const db = require("./models/index");

const setupServer = () => {
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());

  app.use("/api", ApiRoute);
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true }).then(() => {
        console.log("Database is synced");
      });
    }
  });
};

setupServer();
