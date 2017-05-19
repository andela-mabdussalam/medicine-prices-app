import React, { Component } from 'react';

/*
* Footer component
*/
export default class Footer extends Component {
  render() {
    return (
      <footer className="row footer">
        <div className="about col-sm-12">
          <h3>About</h3>
          <hr></hr>
          <p>
            <a href="https://codefornigeria.org/" target="_blank">Code for Nigeria</a> is a non-profit civic technology movement.
            A network of civic-minded volunteers who contribute their talents, skills, expertise, and community knowledge as technological tools to improve public service, bring governments to account, and promote informed (data-driven) decision-making; leveraging open data + media, and backed by a core (full-time) tech team.
          </p>
        </div>
        <div className="data-sources col-sm-3">
          <h3>Data sources</h3>
          <hr></hr>
          <a href="http://apps.who.int/medicinedocs/en/m/abstract/Js21983en/"> World Health Organization 2015</a>
          <p className="built-by">Built by <a href="https://codefornigeria.org/" target="_blank">Code for Nigeria,</a> with thought leadership from</p>
          <hr></hr>
          <a href="http://www.icfj.org" target="_blank"><img className="sponsors" alt="ICFJ" src="/icfj.png" /></a>
          <a href="http://www.codeforafrica.org" target="_blank"><img className="sponsors" alt="Code for Africa" src="/cfafrica.png" /></a>
        </div>
        <div className="social-icons col-sm-3">
          <p className="clickable"><i className="fa fa-facebook-square"></i><a href="https://facebook.com/CodeForAfrica" target="_blank"> Like us on Facebook</a></p>
          <p className="clickable"><i className="fa fa-twitter-square"></i><a href="https://twitter.com/code4africa" target="_blank"> Follow us on Twitter</a></p>
          <p className="clickable"><i className="fa fa-github"></i><a href="https://github.com/Code4Nigeria/medicine-prices-app" target="_blank">Fork this on Github</a></p>
        </div>

      </footer>
    )
  }
}
