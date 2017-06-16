import React, { Component } from 'react';
import axios from 'axios';

/*
* Stories component
*/
export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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
          _this.setState({ data: dataArray });
        });
  }
  render() {
    const { data } = this.state;

    return (
      <div className="cover">
        <hr/>
        <div className="stories">
          <h3>Latest headlines:</h3><br />
          <div className="row">
            <div className="col-sm-5 rightMargin" >

              {data.map((tile, index) => (
                <div key={index} className="media">
                   <div class="thumbnail">
                      <img src={tile.ImageUrl} alt="..." style={{ "maxWidth": "450px" }} />
                      <div class="caption" className="top-margin">
                        <h3>{tile.Title}</h3>
                        <p className="align-text">{tile.Description}</p>
                        <p className="top-margin"><a href={tile.StoryUrl} className="btn btn-primary" role="button">Read more ...</a></p>
                      </div>
                    </div>
                </div>
              ))}
            </div>

            <div className="visible-xs" style={{ "height": "50px" }}></div>
            <div className="col-sm-6 marginTop">
              <p data-pym-src="embed.html">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

