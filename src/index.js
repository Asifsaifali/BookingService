const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { PORT } = require("./config/serverConfig");



const setupServer = () => {
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
};

setupServer();
