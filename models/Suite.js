const mongoose = require('mongoose');

const SuiteSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: true,
		unique: true
	},
	rooms: {
		type: Number,
		default: 1
	},
	lodgers: {
		type: Number,
		default: 1
	},
	additionalLodgers: {
		type: Number,
		default: 0
	},
	roomType: {
		type: String,
		enum: ['люкс', 'полулюкс']
	},
	features: [
		{
			type: String,
			minlength: [
				20,
				'feature length should be more than 20 characters'
			]
		}
	],
	bookings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Booking'
		}
	]
});

// when suite is deleted, delete all its bookings
SuiteSchema.pre('remove', async function (next) {
	try {
		const Booking = mongoose.model('Booking');
		await Booking.deleteMany({ suite: this.suite });
		return next();
	} catch (err) {
		return next(err);
	}
});

module.exports = mongoose.model('Suite', SuiteSchema);
