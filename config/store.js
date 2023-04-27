// will store all of our data/notes
// to add all functions we need for our application
const util = require('util');
// to read and write our files and json data
const fs = require('fs/promises');
// to generate a unique id for each note
const { v4: uuidv4 } = require('uuid');

// read and write notes
const readFileAsync = util.promisfy(fs.readFile);
const writeFileAsync = util.promisfy(fs.writeFile);

class Store {
  write(note) {
    return writeFileAsync('./db/db.json', JSON.stringify(note));
  }

  read() {
    return readFileAsync('./db/db.json');
  }
	//gets the notes from the database and returns them as an array
  getNote() {
		return this.read().then((notes => {
			let convertedNotes;
      try {
				convertedNotes = [].concat(JSON.parse(notes));
			} catch (err) {
				convertedNotes = [];
			}
			return convertedNotes;
    });
	}
	//adds a new note to the database
	insertNote(note) {'
		// create a unique id for notes and add a error message if title or text is not provided
		const { title, text } = note;
		if(!title ||!text) {
			throw new Error('Please provide a note title and note text');
		}
		// create a unique ID for each note
		const createNote = { title, text, id: uuidv4() };
	}
