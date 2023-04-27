// code to save, read, update, and delete notes from the database db.json file
const util = require('util'); // brings in our utiiity functions specifically util.promisify
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // makes a unique id for each note
// reads files from the database db.json file and writes them to the db.json file
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// make a class called store to read and write note from the database db.json file
class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  // writes note to the database db.json file
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  // get all notes from the database db.json file
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  // add note to the database db.json file
  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error('Note title and text cannot be blank');
    }

    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // delete note from the database db.json file
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}
// export the store class to be used to save, read, update, and delete notes fro the database db.json file
module.exports = Store;
