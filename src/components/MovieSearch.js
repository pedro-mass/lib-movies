import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Button bsStyle="primary" disabled={isLoading} onClick={this.getMovies}>
        {isLoading ? 'Retrieving...' : 'Get Movies'}
      </Button>
    );
  }

  getMovies = () => {
    this.setState({ isLoading: true });

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({ isLoading: false });
    }, 2000);
  };
}

export default MovieSearch;
