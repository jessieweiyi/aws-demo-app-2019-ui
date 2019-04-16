import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import S3FileUploader from '../S3FileUploader';
import { JobStatus } from '../../reducers/job';
import { resetJob } from '../../actions/resetJob';

class Job extends Component {
  constructor() {
    super();
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
  }

  handleResetButtonClick() {
    this.props.dispatchResetJob();
  }

  render() {
    const {
          jobStatus,
          jobId,
          jobUrl,
          jobError,
      } = this.props;

    return (
      <div>
        {(jobStatus === JobStatus.NONE) && <S3FileUploader />}
        {(jobStatus === JobStatus.SUBMITTING) && <p>uploading Image ...</p>}
        {(jobStatus === JobStatus.SUBMITTED) && <p>processing image ...</p>}
        {(jobStatus === JobStatus.COMPLETED) && <div><img src={ jobUrl } alt={ `job_${ jobId }` } /></div>}
        {jobError && <p> {jobError} </p>}
        { (jobStatus === JobStatus.ERROR || jobStatus === JobStatus.COMPLETED)
          && <button onClick={ this.handleResetButtonClick }>Start again</button> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobStatus: state.job.get('jobStatus'),
  jobId: state.job.get('jobData'),
  jobUrl: state.job.get('jobUrl'),
  jobError: state.job.get('jobError'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchResetJob: resetJob
    },
    dispatch,
  );


export default connect(mapStateToProps, mapDispatchToProps)(Job)
