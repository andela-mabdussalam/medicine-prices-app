import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

/*
* The Calculator Component
*/
class Calculator extends Component {
  render() {
    return (
      <div className="container">
        <p className="text-center">You might be paying too much for life saving drugs, let’s find out.</p>
        <h1 className="text-center">What should your medicine cost?</h1>
        <p className="text-center">Tell us how much you pay.</p>
      </div>
    )
  }
}

export default Calculator;
