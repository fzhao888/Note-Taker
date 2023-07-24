const notes = require('express').Router();
const fs = require('fs');
const util = require('util'); 
const { v4: uuidv4 } = require('uuid');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//GET route for retrieving all notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//POST route for saving a note
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    // creates new note if title and text exists
    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4(),
        };


        //read and append JSON file with new note
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) => err ? console.error(err) : console.info(`\nData successfully written to db.json.`));
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

// DELETE route for deleting a note
notes.delete('/:id', (req,res) => {
    let newDB = [];

     readFromFile('./db/db.json')
        .then((data) => {
            let parsedData = JSON.parse(data); 
            
            // only add note to newDB if id is not a match
            for(let i = 0; i<parsedData.length;i++){
                if(parsedData[i].id !== req.params.id){
                    newDB.push(parsedData[i]);
                }
            }

            //write newDB to db.json
            fs.writeFile('./db/db.json', JSON.stringify(newDB, null, 4), (err) => err ? console.error(err) : console.info(`\nData successfully written to db.json.`))
            
            res.json(newDB);
        } );
});

module.exports = notes;