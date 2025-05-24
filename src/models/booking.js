'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
  flightId: {
    type:DataTypes.INTEGER,
    allowNull:false
  },
    userId: {
      type:DataTypes.INTEGER,
    allowNull:false,
    },
    status: {
     type: DataTypes.ENUM,
      values:['PROCESSING','BOOKED','REJECTED'],
      defaultValue:'PROCESSING'
    },
    noOfSeats:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    totalCost:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};