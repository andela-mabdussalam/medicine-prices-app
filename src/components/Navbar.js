import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

/*
* Navigation bar Component
*/
class NavigationBar extends Component {
  render() {
    return (

      <Navbar fixedTop>
        <div className="inner-container">
          <Navbar.Header>
            <NavLink to="/" onClick={this.props.resetCalculator} className="navbar-brand">
              #CheckYourMedPrices
            </NavLink>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight className="get-in-touch">
              <NavItem eventKey={1} href="https://twitter.com/code4africa" target="_blank" style={{"marginRight": "26px"}}>Get in touch</NavItem>
              <NavItem eventKey={3} href=" https://facebook.com/CodeForAfrica" target="_blank">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </NavItem>
              <NavItem href="https://medium.com/code-for-africa" target="_blank">
                <i className="fa fa-medium" aria-hidden="true"></i>
              </NavItem>
              <NavItem href="https://twitter.com/code4africa" target="_blank">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Navbar>
    );
  }
}

/*
* EmbedPopup Component
* Provides embed code for calculator
*/



export default NavigationBar;
