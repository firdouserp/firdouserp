const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const bookingController =  require('../controllers/booking.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {createBookingSchema,updateBookingSchema} = require('../middleware/validators/bookingValidator.middleware');


router.get('/',auth(), awaitHandlerFactory(bookingController.getAllBooking)); //localhost:3000/api/v1/booking
router.get('/:id', auth(),awaitHandlerFactory(bookingController.getBookingById)); //localhost:3000/api/v1/booking/1
router.get('/code/:code', auth(),awaitHandlerFactory(bookingController.getBookingBycode)); //localhost:3000/api/v1/booking/bookingcode/julia
router.post('/', auth(),createBookingSchema, awaitHandlerFactory(bookingController.createBooking));  // localhost:3000/api/v1/booking
router.put('/:id',auth(),updateBookingSchema, awaitHandlerFactory(bookingController.updateBooking)); //localhost:3000/api/v1/booking/1 , using patch for partial update
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(bookingController.deleteBooking)); //localhost:3000/api/v1/booking/1


module.exports = router;
