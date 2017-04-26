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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/"><img alt="logo" src="/logo.png" className="cfn-logo" /></NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://twitter.com/code4africa" target="_blank">Get in touch</NavItem>
            <OverlayTrigger trigger="click" placement="bottom" overlay={<EmbedPopup />} rootClose={true}>
              <NavItem eventKey={2} href="#">Embed this</NavItem>
            </OverlayTrigger>
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
    this.state = { showTooltip: false, tooltipText: "Copied" };
    this.copyEmbedCodeToClipboard = this.copyEmbedCodeToClipboard.bind(this);
  }
  generateEmbedCode() {
    // generate embed code
    let host = document.location.origin;
    let embedCode = '<iframe src="{}" frameborder="0" scrolling="yes" height="600px" width="100%"></iframe>'.replace("{}", host);
    return embedCode;
  }
  getTooltip(props) {
    return (
      <Tooltip id="tooltip" >{this.state.tooltipText}</Tooltip >
    );
  }

  copyEmbedCodeToClipboard(event) {
    // copy embedcode from embedcode input to clipboard
    ReactDOM.findDOMNode(this.embedCodeInput).select();
    this.setState({ tooltipText: "Copied" })
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
          <FormControl type="text" readOnly value={this.generateEmbedCode()} ref={(input) => this.embedCodeInput = input} />
          {
            /* Only display the button if the copy command exists */
            document.queryCommandSupported('copy') &&
            <InputGroup.Button>
              <OverlayTrigger placement="bottom" ref="tooltipOverlay" overlay={this.getTooltip()} trigger="click">
                <Button onClick={this.copyEmbedCodeToClipboard}><Glyphicon glyph="copy" /></Button>
              </OverlayTrigger>
            </InputGroup.Button>
          }
        </InputGroup>
      </Popover>
    )
  }
}

export default NavigationBar;
