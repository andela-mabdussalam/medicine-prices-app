import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

/*
* Navigation bar Component
*/
class NavigationBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onClick={this.props.resetCalculator}>
              <h2 className="check-your-med-prices">#CheckYourMedPrices</h2></NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className="get-in-touch">
            <NavItem eventKey={1} href="https://twitter.com/code4africa" target="_blank">Get in touch</NavItem>
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



export default NavigationBar;
