import React, { Component } from 'react';
import './App.css';
import './Profile.css';

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
      ],
      genres: []
    };
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
    console.log(artist);
    return (
      <div className="profile">
        <img className="profile-image" src={artist.images[0].url} alt="Profile" />
        <div className="profile-info">
          <div className="profile-name">{ artist.name }</div>
          <div className="profile-followers">{ artist.followers.total } followers</div>
          <div className="profile-genres">
            {
              artist.genres.map((genre, index) => {
                // add comma to the genre list
                genre = genre !== artist.genres[artist.genres.length - 1]
                                    ? ` ${genre},`
                                    : ` & ${genre}`
                return (
                  <span key={index}>{genre}</span>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
