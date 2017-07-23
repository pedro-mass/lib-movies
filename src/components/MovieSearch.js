import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import * as movieActions from '../store/movies/actions';

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

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: false });
  }

  getMovies = () => {
    this.setState({ isLoading: true });
    this.props.dispatch(movieActions.fetchMovies());
  };
}

export default connect()(MovieSearch);
