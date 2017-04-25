import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Table, Fade } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

/*
* The Calculator Component
*/
class Calculator extends Component {
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
  // Display calculation result
  render() {
    return (
      <div className="container">
        {this.state.showCalculator ? <div>
          <div>
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
            price={this.state.userDrugPrice}
            percentage={this.state.userPercentage}
          />
          : null
        }
      </div>
    )
  }
}

/*
* The form querying the user on how much they usually pay for a certain medicine
*/
class PriceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { drug: '', userDrugPrice: '' };

    this.handleDrugChange = this.handleDrugChange.bind(this);
    this.handleUserDrugPriceChange = this.handleUserDrugPriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  handleDrugChange(drug) {
    this.setState({ drug: drug });
  }

  handleUserDrugPriceChange(event) {
    // set state and update the currentDrug in calculator
    this.setState({ userDrugPrice: event.target.value }, () => this.handleSubmit(event));
  }

  handleSubmit(event) {
    // stop normal browser behaviour of submitting to site
    event.preventDefault();
    console.log('handleSubmit: ' + JSON.stringify(this.state));
    this.props.onSubmit(this.state.drug, this.state.userDrugPrice);
  }

  formIsValid() {
    return this.props.drugNames.includes(this.state.drug) && this.state.userDrugPrice > 0;
  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalDrug">
          <Col componentClass={ControlLabel} sm={2}>I buy</Col>
          <Col sm={5}><Typeahead options={this.props.drugNames} placeholder="drug name" onInputChange={this.handleDrugChange} /></Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUserDrugPrice">
          <Col componentClass={ControlLabel} sm={2}>for</Col>
          <Col sm={5}><FormControl type="number" value={this.state.userDrugPrice} placeholder="unit price, e.g price per tablet" onChange={this.handleUserDrugPriceChange} /></Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={!this.formIsValid()}>Next</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

/*
* The list of dosages/variations of a drug a user
* chooses from after submitting the drug they purchase
*/
class DosageKindsList extends Component {
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage Form</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {this.props.dosageKinds.map(
            (drug, index) => {
              return (
                <tr key={index} onClick={() => this.props.dosageKindClicked(drug)}>
                  <td>{drug.name}</td>
                  <td>{drug.form}</td>
                  <td>{drug.strength}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    )
  }
}

/*
* This contains the display for the result
* of the calculator
*/
class CalculationResult extends Component {
  render() {
    return (
      <div>
        <p className="text-center">At {String.fromCharCode(8358)}{this.props.price}, you are paying</p>
        <h2 className="text-center">{this.props.percentage}% of the global average price.</h2>
      </div>
    )
  }
}
export default Calculator;
