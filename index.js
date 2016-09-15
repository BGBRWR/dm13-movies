var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require("cors");
var config = require('./config.json');

var moviesController = require('./controllers/movies_controller');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}));

app.use(function (req, res, next) {
  console.log(req.session);
  console.log('This sentence is logged on every single request.');
  next();
});


app.get('/movies', moviesController.index);
app.get('/movies/:id', moviesController.show);
app.post('/movies', moviesController.create);
app.put('/movies/:id', moviesController.update);
app.delete('/movies/:id', moviesController.destroy);

app.get("/wishlist", function(req,res,next){
  if(!req.session.wishlist){
    req.session.wishlist=[];
  }
  res.status(200).json(req.session.wishlist);
});
app.post("/wishlist", function() {
  if(!req.session.wishlist){
    req.session.wishlist=[];
  }
  req.session.wishlist.push(req.body);
  res.sendStatus(204);
});

app.listen(config.port, function () {
  console.log('I is running ok on port', config.port);
});
