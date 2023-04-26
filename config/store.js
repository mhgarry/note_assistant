// will store all of our data/notes
const util = require('util');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

//read and write notes
const readFileAsync = util.promisfy(fs.readFile);
const writeFileAsync = util.promisfy(fs.writeFile);
