let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */
const MoviesSchema = mongoose.Schema({
  film_ID: {type: String},
  film_title: {type: String},
  year: {type: Number},
  rating: {type: Number}
});

const MoviesModel = mongoose.model('movies', MoviesSchema);

const MoviesMethods = {
  getAll: function() {
    return MoviesModel.find()
      .then(movies => {
        return movies;
      })
      .catch(e => {
        throw Error(e);
      });
  },

  add: function(movie){
    movie.film_ID = uuid();
    return MoviesModel.create(movie)
      .then(response => {
        return response;
      })
      .catch(e => {
        throw Error(e);
      });
  }
};

module.exports = {MoviesMethods};