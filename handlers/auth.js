const db = require('../models'),
	jwt = require('jsonwebtoken');

const invalidPass = {
	status: 400,
	message: 'Invalid email/password'
};

const passNotMatch = {
	status: 400,
	message: 'Passwords don\'t match'
}

module.exports.signup = async function (req, res, next) {
	try {
		// password not confirmed.
		if (req.body.confirmPassword !== req.body.password) {
			return next(passNotMatch);
		}

		const user = await db.User.create(req.body);
		const userData = prepareUserData(user);
		return res.status(200).json(userData);
	} catch (err) {
		return next(err);
	}
};

module.exports.signin = async function (req, res, next) {
	try {
		const user = await db.User.findOne({ email: req.body.email });

		const validPassword = await user.comparePassword(req.body.password);

		if (validPassword) {
			const userData = prepareUserData(user);
			return res.status(200).json(userData);
		} else {
			next(invalidPass);
		}
	} catch (err) {
		return next(invalidPass);
	}
};

const prepareUserData = ({ _id, username, profileImageUrl }) => {
	const token = jwt.sign(
		{
			_id,
			username
		},
		process.env.SECRET_KEY
	);

	return {
		_id,
		username,
		token
	};
};
