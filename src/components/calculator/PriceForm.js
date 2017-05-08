import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
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
    this.setState({ drug: drug });
  }

  handleUserDrugPriceChange(event) {
    // set state and update the currentDrug in calculator
    this.setState({ userDrugPrice: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.drug, this.state.userDrugPrice);
  }

  formIsValid() {
    return this.props.drugs.includes(this.state.drug) && this.state.userDrugPrice > 0;
  }

  render() {
    return (
      <Form className="price-form" horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalDrug">
          <Col componentClass={ControlLabel} className={this.props.headerFont} sm={2} smOffset={2}>I buy</Col>
          <Col sm={4}>
            <Typeahead
              className={this.props.bodyFont}
              labelKey="name" options={this.props.drugs} placeholder="drug name"
              renderMenuItemChildren={drug => (
                <div onClick={() => this.handleDrugChange(drug)}>
                  <span className={this.props.headerFont}>{drug.name}</span>
                  <div>
                    <small className={this.props.bodyFont}>
                      Dosage form: {drug.form}
                      &nbsp;Strength: <i>{drug.strength}</i>
                    </small>
                  </div>
                </div>
              )}
            /></Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUserDrugPrice">
          <Col componentClass={ControlLabel} className={this.props.headerFont} sm={2} smOffset={2}>for {String.fromCharCode(8358)}</Col>
          <Col sm={4}><FormControl type="number" value={this.state.userDrugPrice} placeholder="unit price, e.g price per tablet" onChange={this.handleUserDrugPriceChange} /></Col>
        </FormGroup>
        <FormGroup>
          <Button className={"show-result-btn col-sm-offset-5 col-xs-offset-3 " + this.props.headerFont} disabled={!this.formIsValid()} type="submit">NEXT</Button>
        </FormGroup>
        <p className={"sub sachet " + this.props.bodyFont}>
          * (If you bought your medicine in a sachet, count the number of tablets in a
            sachet and divide the price by the number of tablets. Most sachets in Nigeria
            contain 10 tablets.)
        </p>
      </Form>
    )
  }
}
