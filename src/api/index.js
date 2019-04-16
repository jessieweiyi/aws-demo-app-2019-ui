import promiseRetry from 'promise-retry';
import axios from 'axios';

function submitJob(file) {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  };
  const url = `${ window.ENVIRONMENT_CONFIG.SERVICE_HOST }/api/v1/job/${ file.name }`;
  return axios.put(url, file, options)
      .then((result) => { return result.data; });
}

function getJobResult(jobId) {
  const url = `${ window.ENVIRONMENT_CONFIG.SERVICE_HOST }/api/v1/job/${ jobId }`;
  return new Promise((resolve, reject) => {
    axios.get(url)
            .then(result => {
              if (result && result.data && result.data.url) {
                resolve(result.data);
              }

              reject('retry');
            });
  });
}

function queryJob(jobId) {
  const retryOption = {
    retries: 100,
    minTimeout: 1000,
    maxTimeout: 2000,
    randomize: true,
  };
  return promiseRetry((retry) => {
    return getJobResult(jobId).catch(retry);
  }, retryOption);
}

export default {
  submitJob,
  queryJob,
};
