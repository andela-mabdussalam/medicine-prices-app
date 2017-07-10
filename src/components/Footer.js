import React, { Component } from 'react';

/*
* Footer component
*/
export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="about col-sm-12 center-block text-center">
          <h3>This is a <span>&nbsp;Cost of Life&nbsp;</span> Project</h3>
          <div className="credits">
            <p>Journalist:
              <a href="https://twitter.com/badebayopunch" target="_blank" rel="noopener noreferrer">
                Bukola Adebayo (Nigeria)
              </a>
            </p>
            <p>Project Manager:
              <a href="https://twitter.com/enkayfreda" target="_blank" rel="noopener noreferrer">
                Nkechi Okwuone (Nigeria)
              </a>
            </p>
            <p>Data Visualizations:
              <a href="https://github.com/ryansept" target="_blank" rel="noopener noreferrer">
                Ryan Marvin (Kenya)
              </a>
              <a href="https://github.com/andela-mabdussalam" target="_blank" rel="noopener noreferrer">
                Mariam Abdussalam(Nigeria)
              </a>
            </p>
            <p>Data Source:
              <a href="http://apps.who.int/medicinedocs/en/m/abstract/Js21983en/" target=" _blank" rel="noopener noreferrer">
                World Health Organisation
              </a>
            </p>
          </div>

          <div className="post-credits col-sm-6 center-block">
            <p>
              Produced by <a href="http://punchng.com" target="_blank" rel="noopener noreferrer">PUNCH </a>
              in partnership with the <a href="https://investigativecenters.org" target="_blank" rel="noopener noreferrer">
                African Network of Centres for Investigative Reporting (ANCIR) </a>
              with technology support
              from <a href="https://codefornigeria.org/" target="_blank" rel="noopener noreferrer">Code for Nigeria</a>.
            </p>
            <p>
              ANCIR&lsquo;s Cost of Life project seeks to shine an investigative light on the
              human cost of profiteering and abuses in the healthcare industry.
            </p>
            <p>Co-funded by
              the <a href="http://www.osiwa.org/" target="_blank" rel="noopener noreferrer">Open Society
              Initiative for West Africa</a> and the&nbsp;
              <a href="http://www.gatesfoundation.org/" target="_blank" rel="noopener noreferrer">
                Bill and Melinda Gates Foundation&nbsp;
              </a>
              through the <a href="http://www.icfj.org" target="_blank" rel="noopener noreferrer">
                International Center for Journalists.</a>
            </p>
          </div>
          <a href="https://investigativecenters.org" className="sponsors-link" target="_blank" rel="noopener noreferrer"><img className="sponsors ancir-logo" alt="ANCIR" src="img/ancir-logo.jpg" /></a>
          <a href="http://punchng.com" className="sponsors-link" target="_blank" rel="noopener noreferrer"><img className="sponsors" alt="Punch Nigeria" src="img/punch-ng-logo-white.png" /></a>
          <a href="http://www.codefornigeria.org" className="sponsors-link" target="_blank" rel="noopener noreferrer"><img className="sponsors cfn-logo" alt="Code for Nigeria" src="img/cfn-logo-white.png" /></a>
        </div>
      </footer >
    )
  }
}
