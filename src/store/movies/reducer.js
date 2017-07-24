import * as types from './actionTypes';

const initialState = {
  movieList: [],
  isFetching: false
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_MOVIES:
      return { ...state, isFetching: true };
    case types.MOVIES_FETCHED:
      return { ...state, isFetching: false, movieList: action.payload };
    default:
      return state;
  }
}

// selectors

export function isFetching(state) {
  return state.movies.isFetching;
}

export function getMovies(state) {
  return state.movies.movieList;
}
