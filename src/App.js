import React, { Component } from 'react';
import './App.css';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieSearch />
        <MovieList />
      </div>
    );
  }
}

export default App;
