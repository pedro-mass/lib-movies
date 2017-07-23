import * as types from './actionTypes';

const initialState = {
  movies: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.MOVIES_FETCHED:
      return [...state, action.payload];
    default:
      return state;
  }
}

// selectors
