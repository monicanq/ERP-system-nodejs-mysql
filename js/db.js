const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'monica',
    password : '',
    database : 'neptury'
});

// Connect
db.connect((err) => {
    if (err) throw err; // not connected!
    console.log('MySql Connected...');
});

const app = express();

app.listen('3006', () => {
    console.log('Server started on port 3006');
});
