const express = require('express');
const mysql = require('mysql');
const http = require('http');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'monica',
    password : '',
    database : 'neptury'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err; // not connected!
    console.log('MySql Connected...');
});

//Start the Server
const http = require ('http');
// const fs = require ('fs'); //Uncomment if we want to stream content
let server = http.createServer((req, res) =>{
  console.log('Request was made: '+ req.url);
  res.writeHead(200, {'Content-Type' : 'text/html'});
  // const myReadStream = fs.createReadStream(__dirname + '/filename.html', 'utf8'); //uncomment if we want to stream content
  // myReadStream.pipe(res);
  res.end('Serve r started on port 3006'); //Comment if we are streaming content
});
server.listen(3006,'127.0.0.1');
console.log('Server up and running');
