const path = require('path');
const express = require('express');

const html = express.Router();

html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirmane, '../public/notes.html'));
});

html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = html;