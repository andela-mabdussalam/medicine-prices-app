import React, { Component } from 'react';

/*
* Footer component
*/
export default class Footer extends Component {
  render() {
    return (
      <footer className="row footer">
        <div className="about col-sm-12 center-block text-center">
          <h3>This is a <span>&nbsp;Cost of Life&nbsp;</span> project</h3>
          <div className="credits">
            <p>Journalist:
              <a href="https://twitter.com/badebayopunch" target="_blank" rel="noopener noreferrer">
                <strong> Bukola Adebayo (Nigeria)</strong>
              </a>
            </p>
            <p>Project Manager:
              <a href="https://twitter.com/enkayfreda" target="_blank" rel="noopener noreferrer">
                <strong> Nkechi Okwuone (Nigeria)</strong>
              </a>
            </p>
            <p>Data Visualizations:
              <a href="https://github.com/ryansept" target="_blank" rel="noopener noreferrer">
                <strong> Ryan Marvin (Kenya)</strong>
              </a>
            </p>
            <p>DData Source:
              <a href="http://apps.who.int/medicinedocs/en/m/abstract/Js21983en/" target=" _blank" rel="noopener noreferrer">
                <strong> World Health Organisation</strong>
              </a>
            </p>
          </div>

          <div className="post-credits col-sm-6 center-block">
            <p>
              Produced by <strong>PUNCH</strong> in partnership with the <strong>African Network of
              Centres for Investigative Reporting (ANCIR)</strong> with technology support
              from <a href="https://codefornigeria.org/" target="_blank">Code for Nigeria</a>.
              ANCIR's Cost of Life project seeks to shine an investigative light on the
              human cost of profiteering and abuses in the healthcare industry.
            </p>
            <p>Funded by the <strong>Bill and Melinda Gates Foundation </strong>
              through the <strong>International Center for Journalists</strong>.
            </p>
          </div>
          <a href="http://punchng.com" target="_blank"><img className="sponsors" alt="Punch Nigeria" src="/punch-ng-logo-white.png" /></a>
          <a href="http://www.icfj.org" target="_blank"><img className="sponsors" alt="ICFJ" src="/icfj-white.png" /></a>
          <a href="http://www.codeforafrica.org" target="_blank"><img className="sponsors" alt="Code for Africa" src="/cfafrica-white.png" /></a>
        </div>
      </footer >
    )
  }
}
