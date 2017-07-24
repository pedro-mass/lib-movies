import _ from 'lodash';
import * as types from './actionTypes';
import libraryService from '../../services/library';

export function fetchMovies() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: types.FETCH_MOVIES });

      const movies = await libraryService.getMovies();
      const moviesById = _.keyBy(movies, movie => movie.id);

      dispatch({ type: types.MOVIES_FETCHED, payload: moviesById });
    } catch (error) {
      console.error(error);
    }
  };
}
