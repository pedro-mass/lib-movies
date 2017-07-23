import * as types from './actionTypes';
import libraryService from '../../services/library';

export function fetchMovies() {
  return async (dispatch, getState) => {
    try {
      const movies = await libraryService.getMovies();

      dispatch({ type: types.MOVIES_FETCHED, movies });
    } catch (error) {
      console.error(error);
    }
  };
}
