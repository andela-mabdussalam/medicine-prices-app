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

  percentageDecreaseOrIncrease() {
    return this.props.percentage >= 100 ? this.props.percentage - 100 : 100 - this.props.percentage;
  }

  generateQuote() {
    let percentage = this.percentageDecreaseOrIncrease.apply(this);
    return encodeURI(`I’m paying ${percentage}% ${this.props.amount} than the global average price for ${this.props.drug.name} 💊`);
  }

  generateFacebookLink() {
    let href = "https://medprices.codefornigeria.org";
    let quote = this.generateQuote.apply(this);
    let appID = 106054503300342;
    let facebookLink = `https://www.facebook.com/dialog/share?app_id=${appID}&display=popup&href=${href}&quote=${quote}&hashtag=CheckYourMedPrices`
    return facebookLink;
  }

  generateTwitterLink() {
    let percentage = this.percentageDecreaseOrIncrease.apply(this);
    let drugName = this.props.drug.name.split(/\s|\+/)[0];
    let quote = encodeURI(`I’m paying ${percentage}% ${this.props.amount} than the global average price for ${drugName} 💊`);
    quote += " https://pic.twitter.com/HaRC0NujLF";
    let twitterLink = `https://twitter.com/intent/tweet?text=${quote}&hashtags=CheckYourMedPrices&url=http://bit.ly/CheckMedPrices`;
    return twitterLink;
  }

  // return a number with commas if it's long
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    return (
      <div className="calculation-result">
        <p className={"global-average text-center " + this.props.bodyFont}>
          The global average price for {this.props.drug.name}, {this.props.drug.form}
          : {this.props.drug.strength} is
          <span style={{ color: "black", fontWeight: 600 }}>
            &nbsp;&#8358;{(this.props.drug.price * this.props.exchangeRate).toFixed(2)}
          </span>
        </p>
        <TypeWriter typing={1} onTypingEnd={() => this.setState({ showTwitterLink: true })}>
          <p className={"medprices-paragraph text-center " + this.props.bodyFont}>At {String.fromCharCode(8358)}{this.numberWithCommas(this.props.price)} you are paying</p>
          <h2 className={"medprices-heading text-center " + this.props.headerFont}>{String(this.numberWithCommas(this.percentageDecreaseOrIncrease.apply(this)))}% {this.props.amount} than the global average price.</h2>
        </TypeWriter>
        <Fade in={this.state.showTwitterLink} timeout={2000}>
          <div className="text-center">
            <div className="share-results-links">
              <p className="text-center">Share</p>
              <a className="call-to-action" href={this.generateTwitterLink.apply(this)} target="blank" >
                <i className="fa fa-twitter fa-lg animated animate-slow pulse infinite" aria-hidden="true"></i>
              </a>
              <a className="call-to-action" href={"whatsapp://send?text=" + this.generateQuote.apply(this) + " #FixMedPrices http://bit.ly/CheckMedPrices"} data-action="share/whatsapp/share" target="blank">
                <i className="fa fa-whatsapp fa-lg animated animate-slow pulse infinite" aria-hidden="true"></i>
              </a>
              <a className="call-to-action" href={this.generateFacebookLink.apply(this)} target="blank">
                <i className="fa fa-facebook fa-lg animated animate-slow pulse infinite" aria-hidden="true"></i>
              </a>
            </div>
            <p className={"assumption text-center " + this.props.bodyFont}>The tool assumes that $1 is changed for &#8358;{this.props.exchangeRate}</p>
            <p className="reset-calculator text-center" onClick={this.props.resetCalculator}>
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              <span className={this.props.bodyFont}>&nbsp;Check something else</span>
            </p>
          </div>
        </Fade >
      </div >
    )
  }
}
