import React, { Component } from 'react';
import { CalculationResult } from './CalculationResult';
import { PriceForm } from './PriceForm';
import { getMedicine } from '../utils/Api';
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

  onSubmit(drug, userDrugPrice) {
    console.log(JSON.stringify(drug))
    this.setState({
      userDrugPrice: userDrugPrice,
      currentDrug: drug
    }, this.calculate);
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
    console.log(userPercentage);
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
            <p className={"sub text-center " + this.props.bodyFont}>You might be paying too much for life saving drugs, let’s find out.</p>
            <h1 className={"pre-form-heading text-center " + this.props.headerFont}>What should your medicine cost?</h1>
            <p className={"pre-form-paragraph text-center " + this.props.bodyFont}>Tell us how much you pay.</p>
            <PriceForm
              drugs={this.state.drugs}
              drugNames={this.getListofDrugNames()}
              onSubmit={this.onSubmit}
              headerFont={this.props.headerFont}
              bodyFont={this.props.bodyFont}
            />
            <p className={"sub post-form-paragraph " + this.props.bodyFont}>According to a 2006 report of the Ministry of Health, medicines are unaffordable to the majority of Nigerians (90.2%) who live below the income level of 2 USD a day as well as the government worker that earns a minimum wage of 1.4 USD per day.</p>
            <p className={"sub " + this.props.bodyFont}>10 years later, the story is not different. This tool is intended to call the attention of policy makers to the soaring cost of medicines in Nigeria.</p>
          </div>
        </div>
          : null
        }
        {this.state.showResult ?
          <CalculationResult
            price={String(this.state.userDrugPrice)}
            percentage={this.state.userPercentage}
            drug={this.state.currentDrug}
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
