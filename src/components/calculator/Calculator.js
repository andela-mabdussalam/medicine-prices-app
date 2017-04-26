import React, { Component } from 'react';
import { Fade } from 'react-bootstrap';
import { CalculationResult } from './CalculationResult';
import { DosageKindsList } from './DosageKindsList';
import { PriceForm } from './PriceForm';

/*
* The Calculator Component
*/
export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.EXCHNG = 304; // Naira to USD exchange rate
    this.state = {
      drugs: [
        {
          "name": "Amoxicillin",
          "form": "suspen",
          "strength": "250 mg/5 ml",
          "price": 0.0063
        },
        {
          "name": "Amoxicillin",
          "form": "suspen",
          "strength": "125 mg/5 ml",
          "price": 0.009
        },
        {
          "name": "Amoxicillin",
          "form": "tab-cap",
          "strength": "250 mg",
          "price": 0.0207
        },
        {
          "name": "Paracetamol",
          "form": "suspen",
          "strength": "120 mg/5 ml",
          "price": 0.0042
        },
        {
          "name": "Paracetamol",
          "form": "tab-cap",
          "strength": "500 mg",
          "price": 0.0051
        },
        {
          "name": "Paracetamol",
          "form": "suspen",
          "strength": "100 mg/ml",
          "price": 0.0231
        },
        {
          "name": "Penicillamine",
          "form": "tab-cap",
          "strength": "250 mg",
          "price": 0.4381
        },
      ],
      currentDrug: '',
      currentDrugName: '',
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

  onSubmit(drugName, userDrugPrice) {
    console.log(JSON.stringify(drugName))
    this.setState({
      showDrugList: true,
      currentDrugName: drugName,
      userDrugPrice: userDrugPrice
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
  // get the different forms of a drug eg. suspension, tabs etc.
  getDosageKinds(drugName) {
    return this.state.drugs.filter(
      (drug) => {
        return drug.name === drugName;
      }
    );
  }

  // Calculate percentage of the global average
  calculate(drug) {
    console.log(drug.price);
    let userPercentage = (this.state.userDrugPrice / (drug.price * this.EXCHNG)) * 100
    userPercentage = Math.round(userPercentage);
    console.log(userPercentage);
    this.setState({
      userPercentage: userPercentage,
      showCalculator: false,
      showResult: true,
      currentDrug: drug
    });
  }

  // Reset the calculator
  resetCalculator() {
    this.setState(this.baseState);
  }

  render() {
    return (
      <div className="container calculator-containter">
        {this.state.showCalculator ? <div className="calculator">
          <div className="price-form-container">
            <p className="text-center">You might be paying too much for life saving drugs, let’s find out.</p>
            <h1 className="text-center">What should your medicine cost?</h1>
            <p className="text-center">Tell us how much you pay.</p>
            <PriceForm drugs={this.state.drugs} drugNames={this.getListofDrugNames()} onSubmit={this.onSubmit} />
          </div>
          <Fade in={this.state.showDrugList}>
            <div>
              <DosageKindsList
                dosageKinds={this.getDosageKinds.call(this, this.state.currentDrugName)}
                dosageKindClicked={this.calculate}
              />
            </div>
          </Fade>
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
          />
          : null
        }
      </div>
    )
  }
}
