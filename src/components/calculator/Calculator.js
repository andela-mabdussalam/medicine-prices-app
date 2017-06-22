import React, { Component } from 'react';
import { CalculationResult } from './CalculationResult';
import { PriceForm } from './PriceForm';
import { getMedicine } from '../utils/Api';
import axios from 'axios';
import pym from 'pym.js';

let ReactGA = require('react-ga');
ReactGA.initialize('UA-93090833-2');
var pymChild = null;
/*
* The Calculator Component
*/
export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.EXCHNG = 304; // Naira to USD exchange rate
    this.state = {
      drugs: getMedicine(),
      currentDrug: '',
      showDrugList: false,
      showCalculator: true,
      showResult: false,
      userDrugPrice: 0,
      userPercentage: 0
    };
    this.baseState = this.state;
    this.onSubmit = this.onSubmit.bind(this);
    this.calculate = this.calculate.bind(this);
    this.formatDrugs = this.formatDrugs.bind(this);
  }
  componentDidMount() {
    pymChild = new pym.Child();
    axios.get("https://dc.sourceafrica.net/javascripts/rates.json").then(
      res => { this.EXCHNG = res.data.rates.NGN; }
    ).catch((error) => {
      alert(error);
    });;
    this.formatDrugs();
  }
  onSubmit(drug, userDrugPrice) {
    this.setState({
      userDrugPrice: userDrugPrice,
      currentDrug: drug
    }, this.calculate);
    pymChild.sendHeight();
    ReactGA.event({
      category: "Search",
      action: "search",
      label: `${drug.id};${drug.name};${drug.price};${userDrugPrice}`,
      value: Number((userDrugPrice / (drug.price * this.EXCHNG) * 100).toFixed(0))
    });
  }

  // format list of drugs to have each brand name as it's own drug
  formatDrugs() {
    // make copy of state
    let counter = 0;
    let drugs = this.state.drugs.copyWithin();
    for (let drug of drugs) {
      if (drug.brand_names) {
        // make each brand name into a copy of it's generic drug
        for (let name in drug.brand_names) {
          let new_drug = {
            price: drug.price,
            strength: drug.strength,
            name: drug.brand_names[name],
            form: drug.form,
            id: counter
          };
          counter++;
          drugs.push(new_drug); // peer pressure
        }
      }
      delete drug.brand_names;
    }
    this.setState({ drugs: drugs });
  }

  // Calculate percentage of the global average
  calculate() {
    let userPercentage = (this.state.userDrugPrice / (this.state.currentDrug.price * this.EXCHNG)) * 100
    userPercentage = Math.round(userPercentage);
    this.setState({
      userPercentage: userPercentage,
      showCalculator: false,
      showResult: true,
    }, () => window.scrollTo(0, 0));
  }

  // Reset the calculator
  resetCalculator() {
    this.setState(this.baseState);
  }

  render() {
    return (
      <div>
      <div className="container calculator-container">
        {this.state.showCalculator ?
          <div className="calculator well well-lg">
            <div className="price-form-container">
            <p className={"sub text-center " + (this.props.bodyFont || "")}>You might be paying too much for life saving drugs.</p>
            <h1 className={"medprices-heading text-center " + (this.props.headerFont || "")}>What should your medicine cost?</h1>
            <p className={"medprices-paragraph text-center " + (this.props.bodyFont || "")}>
              Let&lsquo;s find out. Tell us how much you pay.
            </p>
            <PriceForm
              drugs={this.state.drugs}
              onSubmit={this.onSubmit}
              headerFont={this.props.headerFont}
              bodyFont={this.props.bodyFont}
              />
            </div>
         </div> : null
        }
        {this.state.showResult ?
          <CalculationResult
            price={String(this.state.userDrugPrice)}
            percentage={this.state.userPercentage}
            drug={this.state.currentDrug}
            amount={this.state.userPercentage >= 100 ? "more" : "less"}
            exchangeRate={this.EXCHNG}
            resetCalculator={this.resetCalculator.bind(this)}
            headerFont={this.props.headerFont}
            bodyFont={this.props.bodyFont}
          />
          : null
          }
                    {!document.location.pathname.includes("embed") ?
              <div className="row">
                <div className="about col-xs-12 col-sm-12 col-md-7 center-block textColor">
                <p className={"textColor" + (this.props.bodyFont || "")}>
                    Most Nigerians struggle to afford medicines. Ministry of Health
                    research, going as far back as 2006, indicates that 90.2% of
                    citizens survive on income of just US$2 a day. Even government
                    workers earn, on average, just US$1.4 per day.
                  </p>
                  <p className={" textColor " + (this.props.bodyFont || "")}>
                    Income levels haven’t improved much over the past 10 years but
                    medicine prices continue to soar. This tool helps shine a spotlight
                    on just how expensive medicine is and asks why Nigeria pays more
                    than the rest of the worlds.
                  </p>
                </div>
              </div> : null}
        </div>
      </div>
    )
  }
}
