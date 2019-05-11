import { Map } from 'immutable';

import {
  GET_HELLOWORLD_START,
  GET_HELLOWORLD_ERROR,
  GET_HELLOWORLD_SUCCESS,
} from '../actions/getHelloWorld';

const initialState = Map({
    helloWorldMessage: ''
  });

const actionsMap = {
    [GET_HELLOWORLD_START]: (state) => {
      return initialState;
    },
    [GET_HELLOWORLD_SUCCESS]: (state, action) => {
      return state.merge({
          helloWorldMessage: action.data
      });
    },
    [GET_HELLOWORLD_ERROR]: (state) => {
      return initialState;
    },
  };

  export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
  }