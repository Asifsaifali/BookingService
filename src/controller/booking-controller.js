const {BookingService}=require('../service/index')
const { StatusCodes}=require('http-status-codes');

const bookingService=new BookingService();
 
const createBooking=async(req,res)=>{
    try {
        const flight=await bookingService.createBooking(req.body)
        // console.log(flight.data)
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Successfully booked a flight",
            data:flight,
            err:{}
        })
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            err:error
        })
    }
}

module.exports={
    createBooking,
}