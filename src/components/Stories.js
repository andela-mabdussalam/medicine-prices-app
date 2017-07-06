import React, { Component } from 'react';
import axios from 'axios';

/*
* Stories component
*/
export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      desc: false
    }
  }

  sortData(data) {
    data = data.match(/\((.+)\)/)[1]
    data = JSON.parse(data).feed.entry
    const dataArray = [];
    data.forEach((element) => {
      const dataObj = {
        "Title": element.gsx$title.$t,
        "Description": element.gsx$descriptions.$t,
        "PublishDate": element.gsx$publishdate.$t,
        "AuthorsName": element.gsx$authorname.$t,
        "ImageUrl": element.gsx$imageurl.$t,
        "StoryUrl": element.gsx$storyurl.$t
      };
      dataArray.push(dataObj);
    });
    return dataArray;
  }
  componentDidMount() {
    var _this = this;
    const REACT_APP_LATEST_STORIES_ENDPOINT = 'https://spreadsheets.google.com/feeds/list/1QlIqnMCprzz7w4Z3EEmXrWURmK72O1_-MRlBDpAaDzU/od6/public/values?alt=json-in-script&callback=x';
    this.serverRequest =
      axios
        .get(REACT_APP_LATEST_STORIES_ENDPOINT)
        .then(function (response) {
          var dataArray = _this.sortData(response.data);
          console.log("thi ", dataArray);
          _this.setState({ data: dataArray });
        });
  }
  render() {
    const { data, desc } = this.state;

    return (
      <div className="cover">
        <div className="about story">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <p className="storyHeading"> Most Nigerians struggle to afford medicines.
              </p>
              <p className="storyBody"> Ministry of Health
                    research, going as far back as 2006, indicates that 90.2% of
                    citizens survive on income of just US$2 a day. Even government
                    workers earn, on average, just US$1.4 per day.
              </p>
              <p className="storyBody">
                Income levels haven’t improved much over the past 10 years but
                    medicine prices continue to soar. This tool helps shine a spotlight
                    on just how expensive medicine is and asks why Nigeria pays more
                    than the rest of the worlds.
              </p>
              <hr />
            </div>

          </div>

          <div className="col-md-6 col-md-offset-3 ontop">
            <div className="row">
              <div className="col-xs-6 col-md-6" style={{ "float": "left" }}>
                <img src="mitchell-hollander.png" className="img-responsive" alt="drug"/>
              </div>
              <div className="col-xs-4 col-md-4 col-sm-4" style={{ "marginLeft": "-55px", "marginTop": "5%", "color": "black", "height": "50px" }}>
                <h3 className="heading heading-wording">Crisis looms as drug prices rise by 200%</h3>
                <div className="row topMargin">
                  <div className="rightborder col-md-5">
                    <img src="punch-ng-logo-white.png" width="47px" height="14px" alt="punch-logo"/>
                  </div>
                  <div className="rightborder2 font-small col-md-2">
                    <p> 7h ago</p>
                  </div>
                  <div className="font-small col-lg-6">
                    <p>By Nkechi Okwuone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="stories">
          <div className="inner" style={{ "width": "55%", "margin": "0 auto" }}>
            <div className="row">
              <div className="col-lg-4">
                {data.map((tile, index) => (
                  <div key={index}>
                    <img src={tile.ImageUrl} alt="..." style={{ "maxWidth": "300px", "width": "100%", "height": "220px" }} className="img-responsive" name="story" />
                    <div className="well" style={{ "width": "100%" }}>
                      <p> 7h ago </p>

                      <div className="description" onmouseover="story.height=150px">
                        <h4 style={{ "font-weight": "bold" }} >{tile.Title}<span className="extra">{tile.Description}</span></h4>
                      </div>
                      <div className="row" >
                        <div style={{ "float": "left" }}>
                          <p className="top-margin"><a href={tile.StoryUrl}>READ ARTICLE</a></p>
                        </div>
                        <div className="pull-right" style={{ "marginTop": "12px" }}>
                          <img src="/arrow.svg" className="arrow" alt="arrow"/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-4" >
                <div >
                  <img src="/mitchell-hollander.png" alt="..." style={{ "maxWidth": "300px", "width": "100%", "height": "220px" }} className="img-responsive" />
                  <div className="well" style={{ "width": "100%" }}>
                    <p> 7h ago </p>
                    <h4 className="align-text text-muted lead" style={{ "font-weight": "bold" }}>Coming Soon</h4>
                    {desc && <p className="align-text text-muted lead">Coming Soon</p>}
                    <div className="row" >
                      <div style={{ "float": "left" }}>
                        <p className="top-margin"><a href="">READ ARTICLE</a></p>
                      </div>
                      <div className="pull-right" style={{ "marginTop": "12px" }}>
                        <img src="/arrow.svg" className="arrow" alt="arrow1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4" >
                <div>
                  <img src="/mitchell-hollander.png" alt="..." style={{ "maxWidth": "300px", "width": "100%", "height": "220px" }} className="img-responsive" />
                  <div className="well" style={{ "width": "100%" }}>
                    <p> 7h ago </p>
                    <h4 className="align-text text-muted lead" style={{ "font-weight": "bold" }}>Coming Soon</h4>
                    {desc && <p className="align-text">Cming </p>}
                    <div className="row" >
                      <div style={{ "float": "left" }}>
                        <p className="top-margin"><a href="">READ ARTICLE</a></p>
                      </div>
                      <div className="pull-right" style={{ "marginTop": "12px" }}>
                        <img src="/arrow.svg" className="arrow" alt="arrow2"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="visible-xs" style={{ "height": "50px" }}></div>*/}
        <div>
          <div className="embeds" style={{ "width": "100%" }}>
            <div className="embed-inner">
              <div className="row">
                <div className="col-md-4">
                  <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCodeForAfrica%2F&tabs=timeline&width=300&height=450&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=106054503300342" width="100%" height="450" style={{ "border": "none", "overflow": "hidden" }} scrolling="no" frameBorder="0" allowTransparency="true" title="facebook"></iframe>              </div>
                <div className="col-md-4" style={{ "overflow": "hidden" }}>
                  <iframe src="https://api.medium.com/embed?type=profile&amp;path=%2Fcode-for-africa&amp;id=0&amp;" allowTransparency="true" frameBorder="0" title="Embedded profile" width="400" height="450" style={{ "display": "block", "maxWidth": "100%", "minWidth": "220px", "padding": "0", "position": "static", "visibility": "visible", "borderTopLeftRadius": "5px", "borderTopRightRadius": "5px", "borderBottomRightRadius": "5px", "borderBottomLeftRadius": "5px", "borderColor": "#eee #ddd #bbb", "borderWidth": "1px", "borderStyle": "solid", "boxShadow": "rgba(0, 0, 0, 0.15) 0px 1px 3px" }}></iframe>
                </div>
                <div className="col-md-4">
                  <a className="twitter-timeline" href="https://twitter.com/hashtag/CheckYourMedPrices" data-widget-id="869862396499816449" data-width="400"
                    data-height="450">#CheckYourMedPrices Tweets</a>
                  <script>{!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs")}</script>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

