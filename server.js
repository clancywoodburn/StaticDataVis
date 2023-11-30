console.log('Server-side code running');

const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.set('view engine', 'pug')

var router = express.Router();
var path = require('path');

var indexRouter = require('./routes/index');
//var icicleRouter = require('./routes/icicle');

// serve files from the public directory
app.use(express.static('public'));
app.use(express.static('public/js'));

// needed to parse JSON data in the body of POST requests
app.use(bodyparser.json());

// // connect to the db and start the express server
// // ***Replace the URL below with the URL for your database***
// //const url =  //'mongodb://user:password@mongo_address:mongo_port/databaseName';
// /*-------------------------------------------*/
// const url = process.env.MONGODB_URI;
// // Database Name
// const dbName = 'testing';
// console.log("********************")
// MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
//   if(err) {
//     return console.log(err);
//   }

//   db =client.db('testing');
//   app.listen(process.env.PORT || 8080)
// });


app.get('/', function (req, res) {
  res.redirect('/vis1/icicle')
})

app.get('/index.html', function (req, res) {
  res.redirect('/vis1/icicle')
})

app.get('/vis/:visID', function (req, res) {
   let vistype = req.params.visID
  res.render('vis_1', { title: '', vis: vistype })
})

app.get('/vis1/:visID', function (req, res) {
    console.log("--->", req.params, req.params.visID,req.params.visID.split("|")[1])
  res.render('vis_1', { title: '', vis: req.params.visID.split("|")[0], dfile: req.params.visID.split("|")[1] })
})

app.get('/blog', function (req, res) {
  var bid = 'overview'
  res.render('logbook', { title: 'Overview', md: loadmd(bid) })
})

app.get('/blog/:blogID', function (req, res) {
  let bid = req.params.blogID;
  console.log(bid)
  res.render('logbook', { title: 'Research log', md: loadmd(bid) })
})


router.get("/about",function(req,res){
  res.sendFile(__dirname + "/public/d3v5icicle.html");
});

