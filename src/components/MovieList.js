import _ from 'lodash';
import React, { Component } from 'react';
import './MovieList.css';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

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
      <div className="MovieList">
        <p>Please hit the 'Get Movies' button.</p>
      </div>
    );
  }

  renderMovies = () => {
    return _.map(this.props.movies, movie => {
      return (
        <ListGroupItem
          key={movie.title}
          onClick={() => this.props.dispatch(actions.getMovieRatings(movie))}
        >
          {movie.title} [{movie.publicationDate}]
          {this.renderImdb(movie)}
        </ListGroupItem>
      );
    });
  };

  renderImdb(movie) {
    if (!movie.scores || movie.scores.imdb === undefined) {
      return '';
    }

    return (
      <span>
        IMDB: {movie.scores ? movie.scores.imdb : ''}
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: selectors.getMoviesById(state)
  };
};

export default connect(mapStateToProps)(MovieList);
