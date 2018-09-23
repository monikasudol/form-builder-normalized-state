import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import Form from './modules/form';
import { onLoad } from './state/current-form';
import './App.css';

class App extends Component {

  componentDidMount = () => {
    this.props.onLoad();
  }

  render() {
    return (
      <div className="App">
        <header className='app-header'>
          <h1>Form builder application</h1>
        </header>
        <Form />
      </div>
    );
  }
}

const mapDispatchToProps = {
  onLoad
};

export default connect(null, mapDispatchToProps)(App);
