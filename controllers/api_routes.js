
const router = require('express').Router();
const store = require('..//config/store');

// get request
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// post request
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// delete request
router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ removed: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
