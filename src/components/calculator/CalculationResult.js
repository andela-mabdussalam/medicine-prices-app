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
  generateTwitterLink() {
    let twitterLink = "https://twitter.com/intent/tweet?text=Hello world, I am paying {percentage} percent of the global average price for {drugName}!&hashtags=fixmedprices&url=https://medprices.codefornigeria.org";
    twitterLink = twitterLink.replace("{percentage}", this.props.percentage)
      .replace("{drugName}", this.props.drug.name);
    return twitterLink;
  }
  render() {
    return (
      <div className="calculation-result">
        <p className="global-average text-center">
          The global average price for {this.props.drug.name}, {this.props.drug.form}
          : {this.props.drug.strength} is
          <span style={{ color: "black", fontWeight: 600 }}>
            &nbsp;&#8358;{(this.props.drug.price * this.props.exchangeRate).toFixed(4)}
          </span>
        </p>
        <TypeWriter typing={1} onTypingEnd={() => this.setState({ showTwitterLink: true })}>
          <p className="pre-form-paragraph text-center">At {String.fromCharCode(8358)}{this.props.price}, you are paying</p>
          <h2 className="pre-form-heading text-center">{String(this.props.percentage)}% of the global average price.</h2>
        </TypeWriter>
        <Fade in={this.state.showTwitterLink} timeout={2000}>
          <div className="text-center">
            <a className="call-to-action" href={this.generateTwitterLink.apply(this)} target="blank" >
              <i className="fa fa-twitter fa-lg animated animate-slow pulse infinite" aria-hidden="true"></i>
              &nbsp;Share on Twitter...
            </a>
            <p className="assumption text-center">Assumption: $1 = &#8358;{this.props.exchangeRate}</p>
            <p className="reset-calculator text-center" onClick={this.props.resetCalculator}>
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              &nbsp;Check something else
            </p>
          </div>
        </Fade >
      </div >
    )
  }
}
