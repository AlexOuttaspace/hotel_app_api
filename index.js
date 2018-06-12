require('dotenv').config();

// dev packages
const morgan = require('morgan');

// constants
const PORT = process.env.PORT || 3001;

// packages
const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	boolParser = require('express-query-boolean');

// routes
const { authRoutes, suitesRouts, bookingsRouts } = require('./routes/');

// helper functions
const { errorHandler, errorThrower } = require('./handlers/errors');
const { getLoggedUser } = require('./middleware/auth');
const sanitizeQuery = require('./middleware/sanitizeQuery');

// Log server requests
app.use(morgan('tiny'));

// allow for request with different origin
app.use(cors());

// for testing with postman
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json());

// parse query boolean values
app.use(boolParser());

// add user id to req.user_id
app.use(getLoggedUser);

// check if query contains objects
app.use(sanitizeQuery);

// ROUTES //
app.use('/api/auth/', authRoutes);
app.use('/api/suites/', suitesRouts);
app.use('/api/bookings/', bookingsRouts);
////////////

// not found, raise 404
app.use(errorThrower);

// general error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
