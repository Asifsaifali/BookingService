const dotenv=require("dotenv");
const path=require("path");

dotenv.config({path:path.resolve(__dirname, "../../.env")});

module.exports={
    PORT:process.env.PORT,
    FLIGHT_SEARCH_PATH:process.env.FLIGHT_SEARCH_PATH,
    MESSAGE_BROKER_URL:process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
}