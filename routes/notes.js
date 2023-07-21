const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//GET route for retrieving all notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//POST route for retrieving all notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    // creates new note if title and text exists
    if (title && text) {

        const newNote = {
            title,
            text,
        };


        //read and append JSON file with new note
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) => err ? console.error(err) : console.info(`\nData successfully writter to db.json.`))
            }
        });

        //send success reponse
        const reponse = {
            status: 'success',
            body: newNote,
        };
        res.json(reponse);
    }else{
        res.json('Error in saving note.');
    }
});


module.exports = notes;