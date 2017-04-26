import React, { Component } from 'react';
import { Fade } from 'react-bootstrap';
import TypeWriter from 'react-typewriter';

/*
* This contains the display for the result
* of the calculator
*/
export class CalculationResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTwitterLink: false
    }
  }
  render() {
    return (
      <div>
        <p className="text-center">
          The global average price for {this.props.drug.name}, {this.props.drug.form}
          : {this.props.drug.strength} is {(this.props.drug.price * this.props.exchangeRate).toFixed(4)}
        </p>
        <TypeWriter typing={1} onTypingEnd={() => this.setState({ showTwitterLink: true })}>
          <p className="text-center">At {String.fromCharCode(8358)}{this.props.price}, you are paying</p>
          <h2 className="text-center">{String(this.props.percentage)}% of the global average price.</h2>
        </TypeWriter>
        <Fade in={this.state.showTwitterLink} timeout={2000}>
          <div>
            <p className="text-center">Share on Twitter</p>
            <p className="text-center" onClick={this.props.resetCalculator}>Check something else</p>
          </div>
        </Fade>
      </div>
    )
  }
}
