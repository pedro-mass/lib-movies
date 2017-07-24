import _ from 'lodash';
import * as types from './actionTypes';
import libraryService from '../../services/library';
import imdbService from '../../services/imdb';

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
      // MetaCritic

      dispatch({ type: types.MOVIE_RATINGS_FETCHED, payload: thisMovie });
    } catch (err) {
      console.error(err);
    }
  };
}
