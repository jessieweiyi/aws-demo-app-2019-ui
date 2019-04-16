import api from '../api';
import queryJob from './queryJob';

export const SUBMIT_JOB_START = 'SUBMIT_JOB_START';
export const SUBMIT_JOB_ERROR = 'SUBMIT_JOB_ERROR';
export const SUBMIT_JOB_SUCCESS = 'SUBMIT_JOB_SUCCESS';

function submitJobStart() {
  return {
    type: SUBMIT_JOB_START,
  };
}

function submitJobSuccess(data) {
  return {
    type: SUBMIT_JOB_SUCCESS,
    data,
  };
}

function submitJobError(error) {
  return {
    type: SUBMIT_JOB_ERROR,
    error,
  };
}

export default function submitJob(file) {
  return (dispatch) => {
    dispatch(submitJobStart());

    api.submitJob(file)
      .then(data => {
        dispatch(submitJobSuccess(data));
        return data.jobId;
      })
      .then(jobId => dispatch(queryJob(jobId)))
      .catch(error => dispatch(submitJobError(error)));
  };
}
