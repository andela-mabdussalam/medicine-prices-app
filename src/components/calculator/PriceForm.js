import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

// tooltip for link to suggestions form
const suggestMedTooltip = (
  <Tooltip id="suggest-med-tooltip">
    Didn&lsquo;t find what you were looking for? Click here and let us know.
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
          <div className="rectangle">
            <div className="i_buy">I buy</div>
            <div className="pull-right negative-margin-top">
              <OverlayTrigger placement="right" overlay={suggestMedTooltip}>
                <a href="https://goo.gl/forms/DADVeRMpRcNIKqqA3"
                  className="fa fa-question-circle suggest-med"
                  aria-hidden="true"
                  target="_blank" rel="noopener noreferrer"
                >
                </a>
              </OverlayTrigger>
            </div>
            <Col md={6} sm={8} xs={8}>
              <div className="row">
                <Typeahead
                  className={this.props.bodyFont}
                  labelKey="name" options={this.props.drugs} placeholder="Drug name"
                  renderMenuItemChildren={drug => (
                    <div className="dropdown-drug" onClick={() => this.handleDrugChange(drug)}>
                      <span className={this.props.headerFont}>{drug.name}</span>
                      <div>
                        <small className={this.props.bodyFont}>
                          Dosage form: {drug.form}
                          &nbsp;Strength: <i>{drug.strength}</i>
                        </small>
                      </div>
                    </div>
                  )}
                />
              </div>
            </Col>
          </div>
        </FormGroup>
        <FormGroup controlId="formHorizontalUserDrugPrice">
          <div className="rectangle">
            <div className="i_buy">for {String.fromCharCode(8358)}</div>
            <div className="row subString">
              <Col md={12} sm={12} xs={12}><FormControl type="number" value={this.state.userDrugPrice} placeholder="unit price, e.g price per tablet" onChange={this.handleUserDrugPriceChange} /></Col>
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <div className="center-text mg-top-11">
            <Button className={"show-result-btn" + (this.props.headerFont || "")} disabled={!this.formIsValid()} type="submit">Next</Button>
          </div>
        </FormGroup>
        <div className="row">
          <p className={"sub sachet col-xs-12 col-sm-11 col-md-11 center-block " + (this.props.bodyFont || "")}>
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

