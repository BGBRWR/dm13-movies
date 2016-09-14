var movies = require('../models/movies');

module.exports = {
  index: function(req, res, next) {
    res.status(200).json(movies);
  },

  show: function(req, res, next) {
    var id = parseInt(req.params.id);
    res.status(200).json(movies[id]);
  },

  create: function(req, res, next) {
    movies.push(req.body);
    res.status(200).json(movies);
  },

  update: function(req, res, next) {
    var id = parseInt(req.params.id);
    movies[id] = req.body;
    res.status(200).json(movies[id]);
  },

  destroy: function(req, res, next) {
    var id = parseInt(req.params.id);
    movies[id] = null;
    res.sendStatus(204);
  }
};
