const path = require('path');
const router = require('express').Router();
// get notes route
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});
// get index route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
// get route to return user to index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
