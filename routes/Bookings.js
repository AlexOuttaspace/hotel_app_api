const router = require('express').Router({ mergeParams: true });

const {
	createBooking,
	getBookings,
	getBooking,
	updateBooking,
	deleteBooking
} = require('../handlers/bookings');

router.route('/').get(getBookings).post(createBooking);

router
	.route('/:booking_id')
	.get(getBooking)
	.put(updateBooking)
	.delete(deleteBooking);

module.exports = router;

// get all bookings       GET bookings/  (of the suite &suite_id=:suite_id || unconfirmed &confirmed=false)
// create booking         POST bookings/
// get one booking        GET bookings/:booking_id
// update one booking     PUT bookings/:booking_id
// delete booking         DELETE bookings/:booking_id
