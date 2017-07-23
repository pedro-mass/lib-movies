import React, { Component } from 'react';
import './App.css';
import MovieSearch from './components/MovieSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieSearch />
      </div>
    );
  }
}

export default App;
