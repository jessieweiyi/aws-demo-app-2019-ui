import api from '../api';

export const GET_HELLOWORLD_START = 'GET_HELLOWORLD_START';
export const GET_HELLOWORLD_ERROR = 'GET_HELLOWORLD_ERROR';
export const GET_HELLOWORLD_SUCCESS = 'GET_HELLOWORLD_SUCCESS';

function getHelloWorldStart() {
  return {
    type: GET_HELLOWORLD_START,
  };
}

function getHelloWorldSuccess(data) {
  return {
    type: GET_HELLOWORLD_SUCCESS,
    data,
  };
}

function getHelloWorldError(error) {
  return {
    type: GET_HELLOWORLD_ERROR,
    error,
  };
}

export default function getHelloWorld(file) {
  return (dispatch) => {
    dispatch(getHelloWorldStart());

    api.getHelloWorld(file)
      .then(data => {
        dispatch(getHelloWorldSuccess(data));
        return data.jobId;
      })
      .catch(error => dispatch(getHelloWorldError(error)));
  };
}