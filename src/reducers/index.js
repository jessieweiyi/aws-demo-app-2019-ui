import { combineReducers } from 'redux';
import job from './job';
import helloWorld from './helloWorld';

export default combineReducers({
  job,
  helloWorld
});

