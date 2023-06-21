const { BookingService } = require("../service/index");
const { StatusCodes } = require("http-status-codes");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  constructor() {}
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const data = { message: "success" };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: "Successfully published the event",
    });
  }

  async createBooking(req, res) {
    try {
      const flight = await bookingService.createBooking(req.body);
      // console.log(flight.data)
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully booked a flight",
        data: flight,
        err: {},
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        err: error,
      });
    }
  }

  async get(req, res) {
    try {
      const response = await bookingService.getbookingDetails(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Successfully fetched flight details",
        data: response,
        err: {},
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        err: error,
      });
    }
  }
}
module.exports = BookingController;
