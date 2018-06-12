const router = require('express').Router({ mergeParams: true });

const sanitizeQuery = require('../middleware/sanitizeQuery');

const {
	createSuite,
	getSuites,
	getSuite,
	updateSuite,
	deleteSuite
} = require('../handlers/suites');

router.route('/').get(getSuites).post(createSuite);

router.route('/:suite_id').get(getSuite).put(updateSuite).delete(deleteSuite);

module.exports = router;
