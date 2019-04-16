import { Map } from 'immutable';

import {
  SUBMIT_JOB_START,
  SUBMIT_JOB_ERROR,
  SUBMIT_JOB_SUCCESS,
} from '../actions/submitJob';

import {
  QUERY_JOB_ERROR,
  QUERY_JOB_SUCCESS,
} from '../actions/queryJob';

import {
  RESET_JOB,
} from '../actions/resetJob';

export const JobStatus = {
  NONE: 'none',
  SUBMITTING: 'submitting',
  SUBMITTED: 'submitted',
  COMPLETED: 'completed',
  ERROR: 'error',
};

const initialState = Map({
  jobStatus: JobStatus.NONE,
  jobId: null,
  jobUrl: null,
  jobError: null,
});

const ERROR_MESSAGE = 'Whoops, something went wrong';

const actionsMap = {
  [SUBMIT_JOB_START]: (state) => {
    return state.merge({
      jobStatus: JobStatus.SUBMITTING,
    });
  },
  [SUBMIT_JOB_SUCCESS]: (state, action) => {
    return state.merge({
      jobStatus: JobStatus.SUBMITTED,
      jobId: action.data.jobId,
    });
  },
  [SUBMIT_JOB_ERROR]: (state) => {
    return state.merge({
      jobStatus: JobStatus.ERROR,
      jobError: ERROR_MESSAGE,
    });
  },
  [QUERY_JOB_SUCCESS]: (state, action) => {
    return state.merge({
      jobStatus: JobStatus.COMPLETED,
      jobUrl: action.data.url,
    });
  },
  [QUERY_JOB_ERROR]: (state) => {
    return state.merge({
      jobStatus: JobStatus.ERROR,
      jobError: ERROR_MESSAGE,
    });
  },
  [RESET_JOB]: () => {
    return initialState;
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
