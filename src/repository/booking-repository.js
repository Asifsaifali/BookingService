const { ValidationError, AppError } = require("../utils/errors/index");
const { Booking } = require("../models/index");

class BookingService {
  async createBooking(data) {
    try {
       const data=await Booking.create(data);
       return data;
    } catch (error) {
      if (error.name === "SequelizeValidtionError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create booking",
        "There was some issue creating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingService;
