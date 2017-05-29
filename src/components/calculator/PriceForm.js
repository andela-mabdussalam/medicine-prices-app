import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

// tooltip for link to suggestions form
const suggestMedTooltip = (
  <Tooltip id="suggest-med-tooltip">
    Didn't find what you were looking for? Click here and let us know.
  </Tooltip>
);

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
          <Col componentClass={ControlLabel} className={this.props.headerFont} sm={2} md={2} mdOffset={2}>I buy</Col>
          <Col md={4} sm={8} xs={12}>
            <Typeahead
              className={this.props.bodyFont}
              labelKey="name" options={this.props.drugs} placeholder="drug name"
              filterBy={["name", "brand_names"]}
              renderMenuItemChildren={drug => (
                <div className="dropdown-drug" onClick={() => this.handleDrugChange(drug)}>
                  <span className={this.props.headerFont}>{drug.name}</span>
                  <div>
                    <small className={this.props.bodyFont}>
                      Dosage form: {drug.form}
                      &nbsp;Strength: <i>{drug.strength}</i>
                    </small>
                  </div>
                  <OverlayTrigger placement="right" overlay={
                    <Tooltip id="brand-name-tooltip">
                      Brand names: {drug.brand_names.join()}
                    </Tooltip>}>
                    <i className="fa fa-info-circle" style={{ float: "right" }} aria-hidden="true"></i>
                  </OverlayTrigger>
                </div>
              )}
            />
            <OverlayTrigger placement="right" overlay={suggestMedTooltip}>
              <a href="https://goo.gl/forms/DADVeRMpRcNIKqqA3"
                className="fa fa-question-circle suggest-med"
                aria-hidden="true"
                target="_blank" rel="noopener noreferrer"
              >
              </a>
            </OverlayTrigger>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUserDrugPrice">
          <Col componentClass={ControlLabel} className={this.props.headerFont} sm={2} md={2} mdOffset={2} >for {String.fromCharCode(8358)}</Col>
          <Col md={4} sm={8} xs={12}><FormControl type="number" value={this.state.userDrugPrice} placeholder="unit price, e.g price per tablet" onChange={this.handleUserDrugPriceChange} /></Col>
        </FormGroup>
        <FormGroup>
          <Button className={"show-result-btn col-md-offset-5 col-sm-offset-4 col-xs-offset-3 " + (this.props.headerFont || "")} disabled={!this.formIsValid()} type="submit">NEXT</Button>
        </FormGroup>
        <div className="row">
          <p className={"sub sachet col-xs-12 col-sm-8 col-md-5 center-block " + (this.props.bodyFont || "")}>
            * (Most medicine in Nigeria comes in sachets, containing 10 tablets.
          If yours did, simply divide the cost of your sachet by 10 to get to
          a unit cost. If your sachet has more more/less than 10 tablets,
          count the number and then divide the purchase price by the number
          of tablets.)
        </p>
        </div>
      </Form >
    )
  }
}
