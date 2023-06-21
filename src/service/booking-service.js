const { BookingRepository } = require("../repository/index");
const { FLIGHT_SEARCH_PATH } = require("../config/serverConfig");
const axios = require("axios");
const { ServiceError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const flightURL = `${FLIGHT_SEARCH_PATH}/api/v1/flights/${flightId} `;
      const response = await axios.get(flightURL);
      const flightData = response.data.data;
      const priceOftheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeat) {
        throw new ServiceError(
          "Something went wrong in Booking",
          "Insuffiient Seat to Book",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      const totalCost = priceOftheFlight * data.noOfSeats;
      const bookingPaylod = { ...data, totalCost };
      const booking = await this.bookingRepository.createBooking(bookingPaylod);
      const updateFlightRequestURL = `${FLIGHT_SEARCH_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeat: flightData.totalSeat - data.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.updateBooking(
        booking.id,
        { status: "BOOKED" }
      );
      return finalBooking;
    } catch (error) {
      console.log(error);
      throw new ServiceError(error);
    }
  }

  async getbookingDetails(bookingId) {
    try {
      const response = await this.bookingRepository.get(bookingId);
      return response;
    } catch (error) {
      console.log(error);
      throw new ServiceError(error);
    }
  }
}

module.exports = BookingService;
