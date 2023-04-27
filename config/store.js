// refactored again to use promises instead of callbacks
const util = require('util'); // utility library to use promises instead of callbacks
const fs = require('fs'); //  write save and view notes
const { v4: uuidv4 } = require('uuid'); // create unique id for each note with this package
// read and write notes to the database
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// class to save our notes to the database
class Store {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // read the notes from the database
  async read() {
    try {
      const data = await readFileAsync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  // write notes to the database
  async write(notes) {
    await writeFileAsync(this.filePath, JSON.stringify(notes));
  }

  // get the notes from the database
  async getNotes() {
    const notes = await this.read();
    return notes;
  }

  // add a note to the database
  async addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error('Note title and text cannot be blank');
    }

    const notes = await this.read();
    const newNote = { title, text, id: uuidv4() };
    notes.push(newNote);
    await this.write(notes);
    return newNote;
  }

  // delete a note from the database
  async removeNote(id) {
    const notes = await this.read();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await this.write(filteredNotes);
  }
}
// export the class to use
module.exports = Store;
