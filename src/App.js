import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Calculator from './components/calculator/Calculator';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/embed" component={Calculator} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
