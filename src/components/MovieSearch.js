import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import * as actions from '../store/movies/actions';
import * as selectors from '../store/movies/reducer';

class MovieSearch extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchMovies());
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="MovieSearch">
        <Button bsStyle="primary" disabled={isLoading} onClick={this.getMovies}>
          {isLoading ? 'Retrieving...' : 'Get Movies'}
        </Button>
      </div>
    );
  }

  getMovies = () => {
    this.props.dispatch(actions.fetchMovies());
  };
}

const mapStateToProps = state => {
  return {
    isLoading: selectors.isFetching(state)
  };
};

export default connect(mapStateToProps)(MovieSearch);
