const express = require('express');
const store = require('../db/store');
const api = express.Router();

api.get('/notes', (req, res) => {
    store
        .retrieveNote()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

api.post('/notes', (req, res) => {
    store
        .addNote(req.body)
        .then(note => res.json(note))
        .catch(err => res.status(500).json(err));
});

module.exports = api;