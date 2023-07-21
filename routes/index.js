const express = require('express');

//import modular routers for /notes
const notesRouter = require('./notes');

const app = express();

// Initialize notes route
app.use('/notes',notesRouter);

module.exports = app;