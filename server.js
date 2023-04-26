const express = require('express');
const uuid = require('uuid');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.listen(PORT, () => {
	console.log('App listening on PORT %s !', PORT);
});
