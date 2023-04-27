const express = require('express');
const uuid = require('uuid');
require('dotenv').config();
const Store = require('./config/store')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  const store = new Store();
  store.getNotes().then(notes => {
    res.json(notes);
  });
});
app.listen(PORT, () => {
	console.log('App listening on PORT %s !', PORT);
});
