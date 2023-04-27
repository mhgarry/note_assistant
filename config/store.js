// refactored again to use promises instead of callbacks
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async read() {
    try {
      const data = await readFileAsync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async write(notes) {
    await writeFileAsync(this.filePath, JSON.stringify(notes));
  }

  async getNotes() {
    const notes = await this.read();
    return notes;
  }

  async addNote (note) {
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

  async removeNote (id) {
    const notes = await this.read();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await this.write(filteredNotes);
  }
}

module.exports = Store;
