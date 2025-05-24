const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const ApiRoute = require("./routers/v1/index")
const db = require("./models/index");

const setupServer = () => {
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());

  app.use("/api/v1/bookingservice", ApiRoute);
  // app.get('/bookingservice/api/v1/home',(req,res)=>{
  //   res.json({
  //     message:'Hitting the booking service'
  //   })
  // })
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true })
    }
  });
};

setupServer();
