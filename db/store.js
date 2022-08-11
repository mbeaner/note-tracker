const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Store {
    read() {
        return readNote('db/db.json', 'utf8');
    }

    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    retrieveNote() {
        return this.read().then((notes) => {
            let parseNotes;

            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parseNotes = [];
            }

            return parseNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error('Title and text can not be blank');
        }

        const newNote = { title, text, id: uuidv1() };

        return this.retrieveNote()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }
}

module.exports = new Store();