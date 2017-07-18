import React, { Component } from 'react';
import NavigationBar from './Navbar';

/*
* Embed Sample component
*/
export default class EmbedSample extends Component {
  constructor(props) {
    super(props);
    let url = document.location.origin;
    url += "/embed";
    this.state = {
      pymloader: '<script type="text/javascript" src="https://pym.nprapps.org/pym-loader.v1.min.js"></script>',
      pym: '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.2/pym.v1.min.js"></script>',
      embedLoaderUrl: '<p data-pym-src={}>Loading...</p>'.replace("{}", url),
      embedUrl: `<script>var pymParent = new pym.Parent('embed', {}, {});</script>`.replace("{}", url),
      divTag: '<div id="embed"></div>',
      sampleDiv: '<div id="example" class="col-lg-5">',
      closingTag: '</div>',
      url: '{}'.replace("{}", url)
    };
  }

  render() {
    const { pym, pymloader, embedLoaderUrl, divTag, embedUrl, sampleDiv, closingTag, url} = this.state;
    return (
      <div>
        <NavigationBar />
        <div id="spacers" style={{ "height": "40px" }}></div>
        <div>
          <div className="container">
            <div className="inner-container">
              <div style={{ "marginBottom": "40px" }}>
                <h3 style={{ "marginBottom": "40px" }}> Embed the tool on your page </h3>
                <h4><strong>In your html add: </strong></h4>
                <p><strong> Alternative 1:</strong></p>
                <pre>
                  {divTag}<br />{embedUrl}<br />{pym}
                </pre>
                <p> If you are experiencing issues or the embed does not load, try this alternative: </p>
                <p><strong>Alternative 2:</strong></p>
                <pre>
                  {embedLoaderUrl}<br />{pymloader}
                </pre>

                  <p className="lineHeight"> An example of using our embed responsively is displayed below. The code used is displayed below. The embed
                    scales to fit in properly based on the width of the parent container that we specified. This ensures
                    that the embed fits in well into your page.<br /></p>
                  <p className="lineHeight">(Quick Tip: Do not apply any padding or border to your container div. In our example,
                    that is <strong>example div</strong>. It may distort the height calculation. Instead, create an outer div and add the padding to it.)</p>

              </div>

              <div className="row" style={{ "marginLeft": "0px" }}>

                <div className="col-lg-7"><strong>Sample Code:</strong>
                  <p><strong> Using alternative 1:</strong></p>
                  <pre>
                    {sampleDiv}{closingTag}<br />
                    {embedUrl}<br />
                    {pym}
                  </pre>
                  <p><strong> Using alternative 2:</strong></p>
                  <pre>
                    {sampleDiv}<br />
                    {embedLoaderUrl}<br />
                    {closingTag}<br />
                    {pymloader}
                  </pre>
                  <p className="lineHeight">You can read more about using pym <a href="http://blog.apps.npr.org/pym.js/">here. </a>
                    Also if you have any issues around inserting the embed, you can also read more <a href="http://blog.apps.npr.org/pym.js/loader">here.</a>
                  </p>
                  <p className="lineHeight">Pls send us feedback via <a href="mailto:support@codeforafrica.org" target="_top">email</a>.
                   We would be more than glad to respond to you.</p>
                </div>
                <div id="example" className="col-lg-5 embed">
                  <p data-pym-src={url}>Loading...</p>
                </div>
              </div>
              <script type="text/javascript" src="https://pym.nprapps.org/pym-loader.v1.min.js"></script>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
