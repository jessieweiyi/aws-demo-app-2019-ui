import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropzone from 'react-dropzone'
import submitJob from '../../actions/submitJob';

import './styles.css';

class S3FileUploader extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.setState({
        message: 'Only images less than 50KB are allowed',
      });
    } else if (acceptedFiles) {
      if (acceptedFiles.length === 1) {
        this.props.dispatchSubmitJob(acceptedFiles[0]);
      } else {
        this.setState({
          message: 'You can only upload 1 file at a time',
        });
      }
    }
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (<div {...getRootProps()}>
          <input {...getInputProps()} />
          <span  className="DropZone">Start your own art by dropping a image here :)</span>
          <p className="DropZoneMessage">{ this.state.message }</p>
        </div>)}
      </Dropzone>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchSubmitJob: submitJob
    },
    dispatch,
  );

  export default connect(null, mapDispatchToProps)(S3FileUploader) 



