const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

//Let express know we are going to use ejs to render
app.set('view engine', 'ejs');

//Connect to the database
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'monica',
	password : '',
	database : 'neptury'
});


app.use(session({
	secret: 'I_havToFind_aSaferKey', //Check into this for security
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Serving the static files
app.use('/styles', express.static('styles'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));

//Serve the login page
app.get('/login', (req, res) => {
	res.render('index');
});

app.get('/home', (req, res) => {
	if (req.session.loggedin) {
		console.log('I am logged in');
		res.render('index');
	} else {
		console.log('please log in');
	}
});

//Once the user submits the form check for credentials
app.post('/auth', function(req, res) {
	let username = req.body.username.toLowerCase();
	let password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM employee WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

//If the user is logged in and send responses accordingly
app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		console.log('I am logged in');
		document.getElementById("loginForm").reset();
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


//Start the Server
app.listen(3000);

// //Start the Server
// const http = require ('http');
// // const fs = require ('fs'); //Uncomment if we want to stream content
// let server = http.createServer((req, res) =>{
//   console.log('Request was made: '+ req.url);
//   res.writeHead(200, {'Content-Type' : 'text/html'});
//   // const myReadStream = fs.createReadStream(__dirname + '/filename.html', 'utf8'); //uncomment if we want to stream content
//   // myReadStream.pipe(res);
//   res.end('Server started on port 3006'); //Comment if we are streaming content
// });
// server.listen(3000,'127.0.0.1');
// console.log('Server up and running');
