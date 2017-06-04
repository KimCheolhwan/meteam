var express = require('express');
var app = express();
var mongoose = require('mongoose');
const bodyParser= require('body-parser')
// const MongoClient = require('mongodb').MongoClient

// var mongoDB = 'mongodb://user:111111@ds157571.mlab.com:57571/meeteamdb';
// var db

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))



//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/*
MongoClient.connect(mongoDB, (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})
*/

app.listen(3000, () => {
	console.log('listening on 3000')
})

app.get('/', (req, res) => {
  db.collection('meteams').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {topics: result})
  })
})

app.get('/index2', (req, res)=> {
	db.collection('test').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.sendfile('public/index2.html', result)
    })


	// res.sendfile('public/index2.html');
})

app.post('/quotes', (req, res) => {
	db.collection('test').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

app.post('/user', (req, res) => {
	db.collection('test').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/index2.html')
	})
})
