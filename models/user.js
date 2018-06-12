const mongoose = require('mongoose'),
	bcrypt = require('bcrypt');

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		required: [ true, 'email is required' ],
		index: true,
		unique: true,
		validate: {
			validator: (email) => emailRegexp.test(email),
			message: 'Invalid email'
		}
	},
	username: {
		type: String,
		required: [ true, 'username is required' ],
		minlength: [ 2, 'Username should be at least 2 characters' ],
		maxlength: [ 16, "Username can't be more than 16 characters" ]
	},
	password: {
		type: String,
		required: [ true, 'password is required' ],
		minlength: [ 6, 'password is too short' ],
		maxlength: [ 32, 'password is too long' ]
	}
});

userSchema.pre('save', async function(next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(
				this.password,
				+process.env.SALTROUNDS
			);
		}
		return next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

module.exports = mongoose.model('User', userSchema);
