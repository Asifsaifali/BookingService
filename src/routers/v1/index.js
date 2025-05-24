const express=require('express');
const router=express.Router();
const {BookingController}=require('../../controller/index')

const bookingController = new BookingController()


router.get('/info',(req,res)=>{
    res.json({message:'hitting from routes'})
})
router.post('/bookings',bookingController.createBooking);
router.get('/bookings/:id',bookingController.get);
router.post('/publish',bookingController.sendMessageToQueue)
router.get("/getAllBookings", bookingController.get);


module.exports=router