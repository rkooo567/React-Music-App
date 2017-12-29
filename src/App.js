import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-title">Music app</div>

        <div className="search-bar">
          <input placeholder="search an artist"/>
          <button>submit</button>
        </div>

        <div className="Profile">
          <div>Artist picture</div>
          <div>Artist Name</div>
        </div>

        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  };
}

export default App;
