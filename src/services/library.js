
const LIBRARY ENDPOINT = '';

class LibraryService {
  async getMovies() {
    return [
      {
        title: 'Drown [DVD].',
        thumbnailUrl: 'https://secure.syndetics.com/index.aspx?type=xw12&client=843-805-6801&upc=712267341528&oclc=&isbn=/MC.GIF'
      },
      {
        title: 'Justice League Dark [DVD] / Warner Bros. Animation.',
        thumbnailUrl: 'https://secure.syndetics.com/index.aspx?type=xw12&client=843-805-6801&upc=883929487264&oclc=&isbn=/MC.GIF'
      }
    ]
  }
}

export default new LibraryService();
