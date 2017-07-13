import React, { Component } from 'react';
import Calculator from './calculator/Calculator';
import NavigationBar from './Navbar';
import Footer from './Footer';
import Stories from './Stories';
import { Button } from 'react-bootstrap';
/*
* Home component
*/
export default class Home extends Component {
  resetCalculator() {
    this.calculator.resetCalculator();
  }
  generateLink() {
    // generate link
    let link = document.location.origin;
    link += "/sample";
    return link;
  }
  render() {
    return (
      <div className="page-width">
        <NavigationBar resetCalculator={this.resetCalculator.bind(this)} />
        <div className="illustration">
          <img src="img/illustration.svg" alt="banner" className="img-responsive"/>
          </div>
        <div className="spacer"></div>
        <Calculator ref={(calculator) => { this.calculator = calculator; }} />
          <div className="center-text">
            <a href={this.generateLink()}><Button className="embed-btn">EMBED THIS</Button></a>
          </div>
        <Stories />
        <Footer />
      </div>
    );
  }
}
