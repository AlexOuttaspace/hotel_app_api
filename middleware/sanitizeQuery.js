module.exports = (req, res, next) => {
	for (let key in req.query) {
		if (req.query[key] instanceof Object) {
			return next({ message: 'Invalid query string', status: 400 });
		}
	}
	return next();
};
