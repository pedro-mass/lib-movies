import * as types from './actionTypes';
import libraryService from '../../services/library';

export function fetchMovies() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: types.FETCH_MOVIES });

      const movies = await libraryService.getMovies();

      dispatch({ type: types.MOVIES_FETCHED, payload: movies });
    } catch (error) {
      console.error(error);
    }
  };
}
