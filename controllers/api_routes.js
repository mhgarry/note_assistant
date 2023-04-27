const express = require('express');
const router = express.Router();
const Store = require('../config/store');

const store = new Store('./db.json');
// get notes route
router.get('/notes', async (req, res) => {
  const notes = await store.getNotes();
  res.json(notes);
});
// post notes route
router.post('/notes', async (req, res) => {
  const note = req.body;
  const newNote = await store.addNote(note);
  res.json(newNote);
});
// delete notes route
router.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;
  await store.removeNote(id);
  res.json({ message: 'Note deleted' });
});
// export router and routes
module.exports = router;

