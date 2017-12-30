import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    };
  }

  search() {
    const BASE_URL = "https://api.spotify.com/v1/search?";
    // request url for spotify API
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    // access token for spotify API access (need refresh later)
    const accessToken = "BQAvMC308SQahuiCK319m9KxqHsEOPi0NzKDagqoZwXdDVXoqwtk6N881LWKS135xRMLCwaEthFZwumAMwnrX2JncrxBC383zZVdQFw10p87QhXmn9pqhwAfjbQReHDNtpLbC-IeQCL-HNI613SVs5qkAfrP0LZhaATzd7fhVIyVhCe42g";
    // for the API authorization
    const requestOption = {
        method: "GET",
        headers: {
          'Authorization': "Bearer " + accessToken
        }
    };
    // fetch the requested data and save it to json format object
    fetch(FETCH_URL, requestOption).then(
      response => response.json()
    ).then(
      json => {
        const artist = json.artists.items[0];
        this.setState({artist:artist});
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music app</div>

        <FormGroup>
          <InputGroup className="search-bar">
            <FormControl
              type="text"
              placeholder="search for an artist.."
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }}
              }
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search">Search</Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <Profile
          artist={this.state.artist}
        />

        <div className="Gallery">
          Gallery
        </div>

      </div>
    );
  };
}

export default App;
