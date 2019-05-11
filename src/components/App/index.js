import React, { Component } from 'react';
import './styles.css';
import Main from '../Main';
import HelloWorldMessage from '../HelloWorldMessage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>
        <HelloWorldMessage/> 
      </div>
    );
  }
}

export default App;
