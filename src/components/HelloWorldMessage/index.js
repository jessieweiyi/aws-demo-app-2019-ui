import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getHelloWorld from '../../actions/getHelloWorld';

class HelloWorldMessage extends Component {
  componentDidMount () {
    this.props.dispatchGetHelloWorld();
  }
  render() {
    return (
      <div className="HelloWorldMessage">
          {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    message: state.helloWorld.get('helloWorldMessage'),
  })


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchGetHelloWorld: getHelloWorld
    },
    dispatch,
  );


export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldMessage);