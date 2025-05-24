const { BookingService } = require("../service/index");
const { StatusCodes } = require("http-status-codes");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
  constructor() {}
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = { 
      data:{
        subject:'This is Notify queue',
        content:'this is my fourth queue',
        recepientEmail:'asif123@gmail.com',
        notificationTime:' 2023-07-09 12:21:15'
      },
      service:'CREATE_TICKET',
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
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
