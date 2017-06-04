// get mongoose package
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  	console.log("open");
});

// creates DB schema
var userSchema = mongoose.Schema({
    name: 'string',
    title: 'string',
    pig:'string',
    move:'string',
    comment:[{
      nickname:'string',
      desc:'string'
    }]
});

// compiels our schema into a model
var MeTeam = mongoose.model('meteam', userSchema);
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.get('/', (req, res) => {
  MeTeam.find({},(err, result) => {
    if (err) return console.log(err) // renders index.ejs
    res.render('index.ejs', {topics: result});
  })
})
app.post('/remove',(req,res)=>{
    MeTeam.update(
    { pig: req.body.pig},
    { $pull: { comment:{nickname:req.body.nickname,desc:req.body.desc}}},
    (err, result) => {
      if (err) {
        res.status(500)
      }
    }
  );
  res.redirect('/');
});

app.post('/',(req,res)=>{
  MeTeam.update(
  { pig: req.body.pig },
  { $push:  { comment:{nickname:req.body.nickname,desc:req.body.desc}}},
  {safe: true, upsert: true, new : true},
  (err, result) => {
    if (err) {
      res.status(500)
    }
 }
);
  res.redirect('/');

});

app.listen(3000,function(){
  console.log('Connected, 3000 Port!');
});
