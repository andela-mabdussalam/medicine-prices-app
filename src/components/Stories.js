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
      mediumStories: [],
      item: {}
    }
  }

  sortData(data) {
    data = data.match(/\((.+)\)/)[1];
    data = JSON.parse(data).feed.entry;
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
  sortMediumArticles(response) {
    var data = response.data.items;
    var storiesArray = [];
    data.forEach((item) => {
      var tagIndex = item.description.indexOf('<img');
      var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;
      var srcStart = srcIndex + 5;
      var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;
      var src = item.description.substring(srcStart, srcEnd);
      const storiesObject = {
        "imageUrl": src,
        "title": item.title,
        "author": item.author,
        "link": item.link
      }
      storiesArray.push(storiesObject);
    });
    return storiesArray;
  }
  componentDidMount() {
    var _this = this;
    var rss_url = '?rss_url=https://medium.com/feed/code-for-africa';
    const REACT_APP_LATEST_STORIES_ENDPOINT = 'https://spreadsheets.google.com/feeds/list/1QlIqnMCprzz7w4Z3EEmXrWURmK72O1_-MRlBDpAaDzU/od6/public/values?alt=json-in-script&callback=x';
    this.serverRequest =
      axios
        .get(REACT_APP_LATEST_STORIES_ENDPOINT)
        .then(function (response) {
          var dataArray = _this.sortData(response.data);
          var filler = 3 - dataArray.length;
          for (var i = 0; i < filler; i++) {
            dataArray.push(0);
          }
          _this.setState({ data: dataArray });
        });
    axios
      .get('https://api.rss2json.com/v1/api.json' + rss_url)
      .then(function (response) {
        var storiesArray = _this.sortMediumArticles(response);
        _this.setState({ mediumStories: storiesArray });
      });
  }
  render() {
    const { data, mediumStories } = this.state;

    return (
      <div className="stories-section">
        <div className="about story">
          <div className="container">

              <div className="inner-container">
                <p className="storyHeading"> Most Nigerians struggle to afford medicines.</p>
                <div className="write-up">
                  <p className="storyBody">Ministry of Health research, going as far back as 2006, indicates that 90.2% of
                    citizens survive on income of just US$2 a day. Even government workers earn, on average, just US$1.4 per day.
                </p>
                  <p className="storyBody">Income levels haven’t improved much over the past 10 years but
                    medicine prices continue to soar. This tool helps shine a spotlight on just how expensive medicine is and asks why Nigeria pays more
                    than the rest of the worlds.
                </p>
                </div>
              </div>

            <div className="story-section">
              <hr />
              <div className="row pic-margin">
                <div className="col-lg-12">
                  <div className="left">
                    <img src="img/mitchell-hollander.png" className="img-responsive" alt="drug" />
                  </div>
                  <div className="recent-story">
                    <h3 className="heading heading-wording">Crisis looms as drug prices rise by 200%</h3>
                    <div className="row topMargin">
                      <div className="latest-story-sub punch-logo-sm">
                        <img src="img/punch-ng-logo-white.png" width="47px" height="14px" alt="punch-logo" />
                      </div>
                      <div className="latest-story-sub font-small time-div">
                        <p> 7h ago</p>
                      </div>
                      <div className="font-small">
                        <p>By Nkechi Okwuone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="stories inner-container">

            {data.map((news, index) => (
              <div key={index} className="story-box">
                <div key={index} className="hover-test">
                  <div className="emergency-img">
                    <img src="img/heroimg.png" alt="emergency" className="img-responsive pic-size" />
                  </div>
                  <div className="well set-height">
                    {news.Title && <p className="ash-colour"> 7h ago </p>}
                    {!news.Title && <p className="ash-colour">&nbsp;</p>}
                    <div className="story-content">
                      {news.Title && <h4 style={{ "fontWeight": "bold" }}>{news.Title || "Coming Soon"}<span className="extra ash-colour">{news.Description}</span></h4>}
                      {!news.Title && <p className="text-muted lead" style={{ "fontSize": "18px" }}>More Stories coming soon...</p>}
                    </div>
                    <div className="row">
                      <div className="top-margin left">
                        {news.Title && <p><a href={news.StoryUrl}>READ ARTICLE</a></p>}
                      </div>
                      <div className="pull-right top-margin">
                        {news.Title && <img src="img/arrow.svg" className="arrow" alt="arrow" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        </div>
        <div>

            <div className="embeds">
              <div className="inner-container">

                  <div className="embed-item">
                      <iframe title="facebook" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCodeForAfrica%2F&tabs=timeline&width=270&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=106054503300342" height="500" style={{ "border": "none", "overflow": "hidden" }} scrolling="no" frameBorder="0" allowTransparency="true" data-width="100%"></iframe>
                  </div>

                  <div className="embed-item medium-embed">
                      <div>
                        <i className="fa fa-medium" aria-hidden="true"></i>
                      </div>
                      <div className="cfa-logo">
                        <img src="https://cdn-images-1.medium.com/max/492/1*Zq7KnTAeKjBf6eENRsacSQ.png" width="80%" height="100px" alt="Medium banner" />
                      </div>
                      {mediumStories.map((story, index) => (
                        <div className="medium-story" key={index}>
                          <hr />
                          <a href={story.link} target="_blank" rel="noopener noreferrer">
                            <img src={story.imageUrl} width="100%" height="120px" alt="Story" />
                            <p className="story-title">{story.title}</p>
                          </a>
                          <p className="author"> Author: {story.author}</p>
                        </div>
                      ))}
                  </div>

                  <div className="embed-item">
                      <a className="twitter-timeline" href="https://twitter.com/hashtag/CheckYourMedPrices" data-widget-id="869862396499816449">Tweets</a>
                      <script>{!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs")}</script>
                      <div className="clearfix"></div>
                  </div>

              </div>
            </div>


        </div>
      </div>
    )
  }
}

