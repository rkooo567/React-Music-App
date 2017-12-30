import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: null
    };
  }

  search() {
    const BASE_URL = "https://api.spotify.com/v1/search?";
    // request url for spotify API
    let fetch_url = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    // url for album
    const ALBUM_URL = 'https://api.spotify.com/v1/artists'
    // access token for spotify API access (need refresh later)
    const accessToken = "BQCZNx9TnlJ2CFbO2rAus7_hOGm4in8Yd9mzvJrbZVRpmbvrTnOxTriG3WxUJtS8nW8YHLAUC4qouBNL9s_0_a0s-Y8sLeF3gNOVsZBpD07iX7x1w3pVh8epsGMzegMUMnVMGMTb1xUP5hDMH3bxRWEMTx0Zie39DN7VtG05WNaDHLZYmw";
    // for the API authorization
    const requestOption = {
        method: "GET",
        headers: {
          'Authorization': "Bearer " + accessToken
        }
    };
    // fetch the artist data based on query and save it to json format object
    fetch(fetch_url, requestOption).then(
      response => response.json()
    ).then(
      json => {
        if (json.artists.total !== 0) {
          const artist = json.artists.items[0];
          this.setState({artist:artist});
          // change the fetch url to request album data
          fetch_url = `${ALBUM_URL}/${artist.id}/top-tracks?country=US`;
          console.log('fetch url :', fetch_url);
          // fetch the album information of the artists
          fetch(fetch_url, requestOption).then(
            response => response.json()
          ).then(
            json => {
              const tracks = json.tracks;
              console.log(`top tracks of ${artist.name}: `, tracks);
              this.setState({tracks: tracks});
            }
          );
        } else {
          console.log(this.state.query, "is not in the database");
        }
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
        {
          (this.state.artist !== null && this.state.tracks !== null)
          ? <div>
              <Profile
                artist={this.state.artist}
              />
            <Gallery
              tracks={this.state.tracks}
            />
            </div>
          : <div></div>
        }
      </div>
    );
  };
}

export default App;
