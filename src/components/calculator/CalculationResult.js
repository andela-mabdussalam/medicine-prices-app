import React, { Component } from 'react';
import { Fade } from 'react-bootstrap';
import TypeWriter from 'react-typewriter';

/*
* This contains the display for the result
* of the calculator.
*/

export class CalculationResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTwitterLink: false,
      space: " "

    }
  }

  percentageDecreaseOrIncrease() {
    return this.props.percentage >= 100 ? this.props.percentage - 100 : 100 - this.props.percentage;
  }

  generateQuote() {
    let percentage = this.percentageDecreaseOrIncrease.apply(this);
    return encodeURI(`I’m paying ${this.numberWithCommas(percentage)}% ${this.props.amount} than the global average price for ${this.props.drug.name} in Nigeria #CheckYourMedPrices`);
  }

  generateFacebookLink() {
    let href = "https://medprices.codefornigeria.org";
    let quote = this.generateQuote.apply(this);

    let appID = 106054503300342;
    let facebookLink = `https://www.facebook.com/dialog/share?app_id=${appID}&display=popup&href=${href}&quote=${quote}&hastag=#CheckYourMedPrices`
    return facebookLink;
  }

  generateTwitterLink() {
    let percentage = this.percentageDecreaseOrIncrease.apply(this);
    let drugName = this.props.drug.name.split(/\s|\+/)[0];
    // repeated instead of using this.generateQuote so as to slot in a shortened drug name
    let quote = encodeURIComponent(`🇳🇬${this.state.space}I’m paying ${this.numberWithCommas(percentage)}% ${this.props.amount} than the global avg price for ${drugName} #CheckYourMedPrices`);
    // add image
    quote += " pic.twitter.com/J93jVY2oNQ";
    let twitterLink = `https://twitter.com/intent/tweet?text=${quote}&url=http://bit.ly/CheckMedPrices`;
    return twitterLink;
  }

  // return a number with commas if it's long
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    return (
      <div className="calculation-result">
        <p className={"global-average text-center " + (this.props.bodyFont || "")}>
          The global average price for {this.props.drug.name}, {this.props.drug.form}
          : {this.props.drug.strength} is
          <span style={{ color: "black", fontWeight: 600 }}>
            &nbsp;&#8358;{(this.props.drug.price * this.props.exchangeRate).toFixed(2)}
          </span>
        </p>
        <TypeWriter typing={1} onTypingEnd={() => this.setState({ showTwitterLink: true })}>
          <p className={"medprices-paragraph text-center " + (this.props.bodyFont || "")}>
            At {String.fromCharCode(8358)}{this.numberWithCommas(this.props.price)}
            &nbsp;per unit, you are paying
          </p>
          <h2 className={"medprices-heading text-center " + (this.props.headerFont || "")}>{String(this.numberWithCommas(this.percentageDecreaseOrIncrease.apply(this)))}% {this.props.amount} than the global average price.</h2>
        </TypeWriter>
        <Fade in={this.state.showTwitterLink} timeout={2000}>
          <div className="text-center">
            <div className="share-results-links">
              <p className="share-header text-center">Share</p>
              <p className={"share-context text-center " + (this.props.bodyFont || "")}>
                Medicine profiteers are going to continue over-charging
                Nigerians unless we speak out. Tell the world how much
                you're paying.
              </p>
              <a className="call-to-action" href={this.generateTwitterLink.apply(this)} target="blank" >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a className="call-to-action hidden-md hidden-lg" href={"whatsapp://send?text=" + this.generateQuote.apply(this) + " #CheckMedPrices http://bit.ly/CheckMedPrices"} data-action="share/whatsapp/share" target="blank">
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
              </a>
              <a className="call-to-action" href={this.generateFacebookLink.apply(this)} target="blank">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </div>
            <p className={"assumption text-center " + (this.props.bodyFont || "")}>
              This tool assumes that $1 equals &#8358;
              {this.props.exchangeRate.toFixed(2)}
            </p>
            <p className="reset-calculator text-center" onClick={this.props.resetCalculator}>
              <p className={this.props.bodyFont}>Want to check more prices?</p>
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              <span className={this.props.bodyFont}>&nbsp;Go back</span>
            </p>
          </div>
        </Fade >
      </div >
    )
  }
}
