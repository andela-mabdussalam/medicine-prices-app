import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Calculator from './components/calculator/Calculator';
import EmbedSample from './components/EmbedSample';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/sample" component={EmbedSample} />
          <Route exact path="/embed" component={() =>
            <Calculator />
          } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
