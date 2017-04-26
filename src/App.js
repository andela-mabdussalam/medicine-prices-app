import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Calculator from './components/calculator/Calculator';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Route path="/" component={Calculator} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
