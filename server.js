const express = require('express');
const path = require('path'); 

const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/api',api);

// Middleware for using static pages inside public folder
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname,'/public/index.html'))
);

app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname,'/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
