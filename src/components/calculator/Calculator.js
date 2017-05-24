import React, { Component } from 'react';
import { CalculationResult } from './CalculationResult';
import { PriceForm } from './PriceForm';
import { getMedicine } from '../utils/Api';
import axios from 'axios';

let ReactGA = require('react-ga');
ReactGA.initialize('UA-93090833-2');

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
      userPercentage: 0,
    };
    this.baseState = this.state;
    this.onSubmit = this.onSubmit.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    axios.get("https://dc.sourceafrica.net/javascripts/rates.json").then(
      res => { this.EXCHNG = res.data.rates.NGN; console.log(this.EXCHNG) }
    ).catch((error) => {
      alert(error);
    });;
  }
  onSubmit(drug, userDrugPrice) {
    this.setState({
      userDrugPrice: userDrugPrice,
      currentDrug: drug
    }, this.calculate);
    ReactGA.event({
      category: "Search",
      action: "search",
      label: `${drug.id};${drug.name};${drug.price};${userDrugPrice}`,
      value: Number((userDrugPrice / (drug.price * this.EXCHNG) * 100).toFixed(0))
    });
  }

  // get list of drug names from list of drug objects
  getListofDrugNames() {
    let drugNames = this.state.drugs.map(
      (drug) => {
        return drug.name;
      }
    );
    return Array.from(new Set(drugNames));
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
      <div className="container calculator-container">
        {this.state.showCalculator ? <div className="calculator">
          <div className="price-form-container">
            <p className={"sub text-center " + this.props.bodyFont}>You might be paying too much for life saving drugs.</p>
            <h1 className={"medprices-heading text-center " + this.props.headerFont}>What should your medicine cost?</h1>
            <p className={"medprices-paragraph text-center " + this.props.bodyFont}>
              Let's find out. Tell us how much you pay.
            </p>
            <PriceForm
              drugs={this.state.drugs.map(
                (drug) => {
                  console.log(typeof drug.brand_names);
                  // add name as brand_name for drugs with empty brand_names
                  !drug.brand_names.length > 0 ? drug.brand_names.push(drug.name) : null;
                  // make brand_names a string
                  console.log(this.state.drugs, drug.brand_names);
                  drug.brand_names = drug.brand_names.join();
                  return drug;
                }
              )}
              drugNames={this.getListofDrugNames()}
              onSubmit={this.onSubmit}
              headerFont={this.props.headerFont}
              bodyFont={this.props.bodyFont}
            />
            {!document.location.pathname.includes("embed") ? <div className="row"><div className="about col-sm-7 center-block">
              <p className={"sub post-form-paragraph " + this.props.bodyFont}>
                Most Nigerians struggle to afford medicines. Ministry of Health
                 research, going as far back as 2006, indicates that 90.2% of
                citizens survive on income of just US$2 a day. Even government
                workers earn, on average, just US$1.4 per day.
              </p>
              <p className={"sub " + this.props.bodyFont}>
                Income levels haven’t improved much over the past 10 years but
                medicine prices continue to soar. This tool helps shine a spotlight
                on just how expensive medicine is and asks why Nigeria pays more
                than the rest of the world.
              </p>
            </div></div> : null}
          </div>
        </div>
          : null
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
      </div>
    )
  }
}
