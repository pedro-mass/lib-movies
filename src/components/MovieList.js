import _ from 'lodash';
import React, { Component } from 'react';
import './MovieList.css';
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import * as actions from '../store/movies/actions';
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
      <div className="MovieList text-center">
        <p>Please hit the 'Get Movies' button.</p>
      </div>
    );
  }

  renderMovies = () => {
    return _.map(this.props.movies, movie => {
      return (
        <ListGroupItem key={movie.title}>
          {movie.title} [{movie.publicationDate}]
          <div className="movie-ratings pull-right">
            {this.renderRatings(movie)}
          </div>
        </ListGroupItem>
      );
    });
  };

  renderRatings(movie) {
    if (!movie.scores) {
      return (
        <Button
          onClick={() => this.props.dispatch(actions.getMovieRatings(movie))}
        >
          Get Ratings
        </Button>
      );
    }

    return _.map(movie.scores, (score, source) => {
      return (
        <span key={source} className="movie-rating">
          {source}: {score}
        </span>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    movies: selectors.getMoviesById(state)
  };
};

export default connect(mapStateToProps)(MovieList);
