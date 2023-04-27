
const router = require('express').Router();
const store = require('..//config/store');

// get request
router.get('/.notes', function (req , res) {
	store.getNotes.then(note => res.json(note))
}
