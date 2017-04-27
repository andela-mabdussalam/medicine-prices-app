import React, { Component } from 'react';
import Calculator from './calculator/Calculator';
import NavigationBar from './Navbar';
import Footer from './Footer';

/*
* Home component
*/
export default class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Calculator />
        <Footer />
      </div>
    );
  }
}
