import _ from 'lodash';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import * as selectors from '../store/movies/reducer';

class MovieList extends Component {
  render() {
    if (!this.props.movies || this.props.movies.length === 0) {
      return this.renderLoading();
    }

    return (
      <Col className="MovieList" xs={12} md={8} mdOffset={2}>
        <ListGroup>
          {this.renderMovies()}
        </ListGroup>
      </Col>
    );
  }

  renderLoading() {
    return (
      <div className="MovieList">
        <p>Please hit the 'Get Movies' button.</p>
      </div>
    );
  }

  renderMovies = () => {
    console.log('props', this.props);

    return _.map(this.props.movies, movie => {
      return (
        <ListGroupItem key={movie.title}>
          {movie.title} [{movie.publicationDate}]
        </ListGroupItem>
      );
    });
  };
}

const mapStateToProps = state => {
  console.log('state:', state);

  return {
    movies: selectors.getMovies(state)
  };
};

export default connect(mapStateToProps)(MovieList);
