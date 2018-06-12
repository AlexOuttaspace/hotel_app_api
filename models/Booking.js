const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	suite: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Suite'
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	adults: {
		type: Number,
		min: [1, 'Should be at least one adult']
	},
	children: [
		{
			type: Number,
			min: [0, 'Incorrect age provided. Must be > 0']
		}
	],
	from: {
		type: Date,
		requried: true
	},
	to: {
		type: Date,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	payed: {
		type: Boolean,
		default: false
	},
	confirmed: {
		type: Boolean,
		default: false
	}
});


// when booking is saved, add it to its suite
BookingSchema.post('save', async function (...args) {
	const Suite = mongoose.model('Suite');
	await Suite.findByIdAndUpdate(this.suite, { $push: { bookings: this._id } });
});

// when booking is deleted, remove it from its suite
BookingSchema.pre('remove', async function (next) {
	try {
		const Suite = mongoose.model('Suite');
		await Suite.findByIdAndUpdate(this.suite, { $pull: { bookings: this._id } });

		return next();
	} catch (err) {
		return next(err);
	}
});


module.exports = mongoose.model('Booking', BookingSchema);
