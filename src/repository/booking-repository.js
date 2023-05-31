const { ValidationError, AppError } = require("../utils/errors/index");
const { Booking } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async createBooking(data) {
    try {
      const response = await Booking.create(data);
      return response;
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
  async updateBooking(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId)
      if(data.status){
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot update booking",
        "There was some issue updating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
