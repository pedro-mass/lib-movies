import * as types from './actionTypes';
import libraryService from '../../services/library';

export function fetchMovies() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: types.MOVIES_FETCHED });
    } catch (error) {
      console.error(error);
    }
  };
}
