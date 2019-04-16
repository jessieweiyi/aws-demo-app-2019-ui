import api from '../api';

export const QUERY_JOB_SUCCESS = 'QUERY_JOB_SUCCESS';
export const QUERY_JOB_ERROR = 'QUERY_JOB_ERROR';

function queryJobSuccess(data) {
  return {
    type: QUERY_JOB_SUCCESS,
    data,
  };
}

function queryJobError(error) {
  return {
    type: QUERY_JOB_ERROR,
    error,
  };
}

export default function queryJob(jobId) {
  return (dispatch) => {
    api.queryJob(jobId)
      .then(result => dispatch(queryJobSuccess(result)))
      .catch(error => dispatch(queryJobError(error)));
  };
}
