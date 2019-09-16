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
	var data = {name : ''};
	res.render('login', {data: data});
});

//If the user is logged in redirect to home page, otherwise redirect to login
app.get('/home', (req, res) => {
	if (req.session.loggedin) {
		console.log('session details');
		console.log(req.session.username);
		console.log('I am logged in');
		var data = {name: req.session.username}
		res.render('index', {data: data});
	} else {
		res.render('login');
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
				console.log('Incorrect Username and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}});

//
app.get('/piezas', (req, res) => {
	// var data = {name : ''};
	res.render('piezas');
});

// Select single post
// app.get('/getpost/:id', (req, res) => {
//     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post fetched...');
//     });
// });


//Start the Server
app.listen(3000);
