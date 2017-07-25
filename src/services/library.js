import _ from 'lodash';
import axios from 'axios';

const LIBRARY_ENDPOINT =
  'https://catalog.ccpl.org/client/en_US/default/search/results?qf=FORMAT%09Format%09VIDEODISC%09Video+disc';

class LibraryService {
  async getMovies() {
    try {
      const response = await axios({
        method: 'GET',
        crossDomain: true,
        url: LIBRARY_ENDPOINT,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const movies = this._parseHtmlResponse(response);

      return movies;
    } catch (err) {
      console.error(err);

      return [];
    }
  }

  _parseHtmlResponse(response) {
    const selectors = {
      // gets the big div holding everything
      results: '.results_cell'
    };

    const rootElement = new DOMParser().parseFromString(
      response.data,
      'text/html'
    );

    // get the results
    const results = rootElement.querySelectorAll(selectors.results);

    return _.map(results, resultNode => {
      return this._getMovieObject(resultNode);
    });
  }

  // Given an HTML node, parse out the relevant fields
  _getMovieObject = htmlNode => {
    const selectors = {
      id: 'input.results_chkbox.DISCOVERY_ALL.listItem.bulkActionCheckbox',
      title: 'div.displayDetailLink > a',
      author: 'div.displayElementText.highlightMe.INITIAL_AUTHOR_SRCH',
      year: 'div.displayElementText.highlightMe.PUBDATE'
    };

    let result = {};

    _.forEach(selectors, (selector, key) => {
      result[key] = htmlNode.querySelector(selector).innerHTML.trim();
    });

    // special case for the ID
    result.id = htmlNode.querySelector(selectors.id).value;

    result.title = this._cleanTitle(result.title);

    return result;
  };

  _cleanTitle(title) {
    console.log('title', title);

    // remove Season #
    title = this._substringOut(title, '. Season ');

    // remove everything after /
    title = this._substringOut(title, ' / ');

    // remove [DVD]
    title = title.replace('[DVD]', '');

    return title.trim();
  }

  _substringOut(title, searchString) {
    let result = title;
    let index = title.indexOf(searchString);

    if (index >= 0) {
      result = title.substring(0, index);
    }

    return result;
  }
}

export default new LibraryService();
