import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem, OverlayTrigger, Popover, InputGroup, Button, FormControl, Tooltip, Glyphicon } from 'react-bootstrap';

/*
* Navigation bar Component
*/
class NavigationBar extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onClick={this.props.resetCalculator}>
              <h2 className="medprices-heading" style={{"fontSize": "30px"}}>#CheckYourMedPrices</h2></NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://twitter.com/code4africa" target="_blank">Get in touch</NavItem>
            <OverlayTrigger trigger="click" placement="bottom" overlay={<EmbedPopup />} rootClose={true}>
              <NavItem eventKey={2} href="#">Embed this <i className="fa fa-caret-down" aria-hidden="true"></i></NavItem>
            </OverlayTrigger>
            <NavItem className="navitem-divider"></NavItem>
            <NavItem eventKey={3} href=" https://facebook.com/CodeForAfrica" target="_blank">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </NavItem>
            <NavItem href="https://twitter.com/code4africa" target="_blank">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

/*
* EmbedPopup Component
* Provides embed code for calculator
*/

class EmbedPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { toolTipClass: "hidden", tooltipText: "Copied" };
    this.copyEmbedCodeToClipboard = this.copyEmbedCodeToClipboard.bind(this);
  }
  generateEmbedCode() {
    // generate embed code
    let url = document.location.origin;
    url += "/embed";
    let embedCode = '<iframe src="{}" frameborder="0" scrolling="yes" height="600px" width="100%"></iframe>'.replace("{}", url);
    return embedCode;
  }
  getTooltip(props) {
    return (
      <Tooltip className={this.state.toolTipClass} id="tooltip" >{this.state.tooltipText}</Tooltip >
    );
  }

  copyEmbedCodeToClipboard(event) {
    // copy embedcode from embedcode input to clipboard
    ReactDOM.findDOMNode(this.embedCodeInput).select();
    this.setState({ tooltipText: "Copied", toolTipClass: "visible" })
    // schedule hiding of tooltip
    setTimeout(() => this.setState({ toolTipClass: "hidden" }), 1000)
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    event.target.focus();
  };
  render() {
    return (
      <Popover id="popover-positioned-bottom" title="Embed this tool" {...this.props}>
        <p>Copy the embed code below and place it on your website!</p>
        <InputGroup>
          <FormControl className="embed-code-input" type="text" readOnly value={this.generateEmbedCode()} ref={(input) => this.embedCodeInput = input} />
          {
            /* Only display the button if the copy command exists */
            document.queryCommandSupported('copy') &&
            <InputGroup.Button>
              <OverlayTrigger placement="bottom" overlay={this.getTooltip()} trigger="click">
                <Button className="embed-copy-btn" onClick={this.copyEmbedCodeToClipboard}><Glyphicon glyph="copy" /></Button>
              </OverlayTrigger>
            </InputGroup.Button>
          }
        </InputGroup>
      </Popover>
    )
  }
}

export default NavigationBar;
