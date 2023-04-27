
const router = require('express').Router();
const store = require('..//config/store');

// get request
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});
