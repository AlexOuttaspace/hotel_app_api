const db = require('../models');

const notFound = {
	status: 404,
	message: 'Document not found'
};

module.exports.createBooking = async function(req, res, next) {
	try {
		const newBooking = await db.Booking.create(req.body);

		return res.status(200).json(newBooking);
	} catch (err) {
		return next(err);
	}
};

module.exports.getBookings = async function(req, res, next) {
	try {
		const bookings = await db.Booking.find();

		return res.status(200).json(bookings);
	} catch (err) {
		return next(err);
	}
};

module.exports.getBooking = async function(req, res, next) {
	try {
		const booking = await db.Booking.findById(req.params.booking_id);

		return res.status(200).json(booking);
	} catch (err) {
		return next(err);
	}
};

module.exports.updateBooking = async function(req, res, next) {
	try {
		const updatedBooking = await db.Booking
			.findByIdAndUpdate(req.params.booking_id, req.body, { new: true })
			.populate('suite');

		if (!updatedBooking) {
			return next(notFound);
		}
		return res.status(200).json(updatedBooking);
	} catch (err) {
		return next(err);
	}
};

module.exports.deleteBooking = async function(req, res, next) {
	try {
		await db.Booking.findByIdAndRemove(req.params.booking_id);
		res.status(200).json({ deleted: true });
	} catch (err) {
		return next(err);
	}
};
