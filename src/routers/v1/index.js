const express=require('express');
const router=express.Router();
const {BookingController}=require('../../controller/index')

const bookingController = new BookingController()

router.post('/bookings',bookingController.createBooking);
router.get('/bookings/:id',bookingController.get);
router.post('/publish',bookingController.sendMessageToQueue)


module.exports=router