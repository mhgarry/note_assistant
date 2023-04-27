const express = require('express');
const apiRoutes = require('./controllers/api_routes') // require api routes
const htmlRoutes = require('./controllers/html_routes') // require html routes
const Store = require('./config/store'); // require our store class to save data
const PORT = process.env.PORT || 3001; // set our port
const app = express(); // use express to create our server
require('dotenv').config(); // load

const store = new Store('data'); // add our Store class to the db.json file

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse the appliction body as JSON data

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
	console.log('App listening on PORT %s !', PORT);
}); // listen on the specified port to start server
