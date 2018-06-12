const db = require('../models');

const notFound = {
	status: 404,
	message: 'Document not found'
}

module.exports.createSuite = async function (req, res, next) {
	try {
		const newSuite = await db.Suite.create(req.body);

		return res.status(200).json(newSuite);
	} catch (err) {
		return next(err);
	}
};

module.exports.getSuites = async function (req, res, next) {
	try {
		const suites = await db.Suite.find().populate('bookings');

		if (!!suites.length) { return next(notFound); }

		return res.status(200).json(suites);
	} catch (err) {
		return next(err);
	}
};


module.exports.getSuite = async function (req, res, next) {
	try {
		const suite = await db.Suite.findById(req.params.suite_id).populate('bookings');

		if (!suite) { return next(notFound); }

		return res.status(200).json(suite);
	} catch (err) {
		return next(err);
	}
};

module.exports.updateSuite = async function (req, res, next) {
	try {
		const updatedSuite = await db.Suite
			.findByIdAndUpdate(req.params.suite_id, req.body, { new: true });

		if (!updatedSuite) { return next(notFound); }

		return res.status(200).json(updatedSuite);
	} catch (err) {
		return next(err);
	}
};

module.exports.deleteSuite = async function (req, res, next) {
	try {
		await db.Suite.findByIdAndRemove(req.params.suite_id);
		res.status(200).json({ deleted: true });
	} catch (err) {
		return next(err);
	}
}