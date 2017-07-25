import _ from 'lodash';
import axios from 'axios';

import secret from '../secret';

const ENDPOINT = 'http://www.omdbapi.com/';
const API_KEY = secret.omdb.apiKey;

class OmdbService {
  async getData(title) {
    const response = await axios.get(ENDPOINT, {
      params: {
        apikey: API_KEY,
        t: title
      }
    });

    console.log('response: ', response);

    return this._objectKeysToCamelCase(
      _.pick(response.data, [
        'Genre',
        'Language',
        'Plot',
        'Poster',
        'Rated',
        'Ratings',
        'Released',
        'Runtime',
        'Title',
        'Year',
        'imdbVotes'
      ])
    );
  }

  _objectKeysToCamelCase = obj => {
    const mapKeys = objToChange => {
      return _.mapKeys(objToChange, function(value, key) {
        return _.camelCase(key);
      });
    };

    // map the current object
    let result = mapKeys({ ...obj });

    // check if the current object has any values that are objects
    _.each(result, (value, key) => {
      if (_.isObject(value)) {
        // camel case those too
        result[key] = this._objectKeysToCamelCase(value);
      }
    });

    return result;
  };
}

export default new OmdbService();
