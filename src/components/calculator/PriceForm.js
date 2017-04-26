import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

/*
* The form querying the user on how much they usually pay for a certain medicine
*/
export class PriceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { drug: '', userDrugPrice: '' };

    this.handleDrugChange = this.handleDrugChange.bind(this);
    this.handleUserDrugPriceChange = this.handleUserDrugPriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  handleDrugChange(drug) {
    this.setState({ drug: drug }, () => this.handleSubmit());
  }

  handleUserDrugPriceChange(event) {
    // set state and update the currentDrug in calculator
    this.setState(
      { userDrugPrice: event.target.value },
      () => { if (this.state.userDrugPrice > 0) { this.handleSubmit() } });
  }

  handleSubmit() {
    console.log('handleSubmit: ' + JSON.stringify(this.state));
    if (this.formIsValid()) {
      this.props.onSubmit(this.state.drug, this.state.userDrugPrice);
    }
  }

  formIsValid() {
    return this.props.drugNames.includes(this.state.drug) && this.state.userDrugPrice > 0;
  }

  render() {
    return (
      <Form className="price-form" horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalDrug">
          <Col componentClass={ControlLabel} sm={2} smOffset={2}>I buy</Col>
          <Col sm={4}><Typeahead options={this.props.drugNames} placeholder="drug name" onInputChange={this.handleDrugChange} /></Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUserDrugPrice">
          <Col componentClass={ControlLabel} sm={2} smOffset={2}>for {String.fromCharCode(8358)}</Col>
          <Col sm={4}><FormControl type="number" value={this.state.userDrugPrice} placeholder="unit price, e.g price per tablet" onChange={this.handleUserDrugPriceChange} /></Col>
        </FormGroup>
      </Form>
    )
  }
}
