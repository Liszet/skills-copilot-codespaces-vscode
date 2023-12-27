// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// Set port
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static('public'));

// Set body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'comment'
});

// Connect to database
connection.connect((err) => {
	if (err) throw err;
	console.log('Connected to database');
});

// Get all comments
app.get('/', (req, res) => {
	let sql = 'SELECT * FROM comments';
	connection.query(sql, (err, result) => {
		if (err) throw err;
		res.render('index', { comments: result });
	});
});

// Post comment
app.post('/comment', (req, res) => {
	let comment = req.body.comment;
	let sql = 'INSERT INTO comments (comment) VALUES (?)';
	connection.query(sql, [comment], (err, result) => {
		if (err) throw err;
		res.redirect('/');
	});
});

// Start server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});