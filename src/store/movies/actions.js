import _ from 'lodash';
import * as types from './actionTypes';
import libraryService from '../../services/library';
import imdbService from '../../services/imdb';
import rottenTomatoesService from '../../services/rottenTomatos';
import metacriticService from '../../services/metacritic';

export function fetchMovies() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: types.FETCH_MOVIES });

      const movies = await libraryService.getMovies();
      const moviesById = _.keyBy(movies, movie => movie.id);

      dispatch({ type: types.MOVIES_FETCHED, payload: moviesById });
    } catch (err) {
      console.error(err);
    }
  };
}

export function getMovieRatings(movie) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: types.FETCH_MOVIE_RATINGS });

      let thisMovie = { ...movie };
      thisMovie.scores = {};

      // IMDB
      thisMovie.scores.imdb = await imdbService.getScore(
        movie.title,
        movie.publicationDate
      );

      // RottenTomatoes
      thisMovie.scores.rottenTomatoes = await rottenTomatoesService.getScore(
        movie.title,
        movie.publicationDate
      );

      // MetaCritic
      thisMovie.scores.metacritic = await metacriticService.getScore(
        movie.title,
        movie.publicationDate
      );

      dispatch({ type: types.MOVIE_RATINGS_FETCHED, payload: thisMovie });
    } catch (err) {
      console.error(err);
    }
  };
}
