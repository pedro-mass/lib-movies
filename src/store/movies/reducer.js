import * as types from './actionTypes';

const initialState = {
  moviesById: undefined,
  isFetching: false,
  isGettingRating: false
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_MOVIES:
      return { ...state, isFetching: true };
    case types.MOVIES_FETCHED:
      return { ...state, isFetching: false, moviesById: action.payload };
    case types.FETCH_MOVIE_RATINGS:
      return { ...state, isGettingRating: true };
    case types.MOVIE_RATINGS_FETCHED:
      return {
        ...state,
        isGettingRating: false,
        moviesById: { ...state.moviesById, [action.payload.id]: action.payload }
      };
    default:
      return state;
  }
}

// selectors

export function isFetching(state) {
  return state.movies.isFetching;
}

export function getMoviesById(state) {
  return state.movies.moviesById;
}
