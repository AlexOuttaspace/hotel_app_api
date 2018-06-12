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
