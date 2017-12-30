import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: [
        {
          url: ''
        }
      ]
    };
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
    console.log(artist);
    return (
      <div>
        <div>{ artist.name }</div>
        <div>{ artist.followers.total }</div>
        <img src={artist.images[0].url} alt={artist.name} />
      </div>
    );
  }
}

export default Profile;
