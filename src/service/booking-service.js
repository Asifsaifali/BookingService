const { BookingRepository } = require("../repository/index");
const { FLIGHT_SEARCH_PATH } = require("../config/serverConfig");
const axios= require("axios");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      let flightURL = `${FLIGHT_SEARCH_PATH}/api/v1/flights/${flightId} `;
      const response = await axios.get(flightURL);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      throw new ServiceError(error);
    }
  }
}

module.exports = BookingService;
