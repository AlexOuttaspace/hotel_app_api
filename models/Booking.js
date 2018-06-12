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
		min: [ 1, 'Should be at least one adult' ]
	},
	children: [
		{
			type: Number,
			required: true
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

module.exports = mongoose.model('Booking', BookingSchema);
