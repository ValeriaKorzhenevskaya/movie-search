import getMovieRating from './Rating';

export default class Movie {
  constructor({
    Title, Poster, Year, imdbID,
  }) {
    this.Title = Title;
    this.Poster = Poster;
    this.Year = Year;
    this.imdbID = imdbID;
  }

  generateMovie() {
    let template = '';
    const div = document.createElement('div');
    div.className = 'swiper-slide';

    template += '<div class="movie">';
    template += `<div class="movie__title"><h3>${this.Title}</h3></div>`;
    template += `<img class="movie__poster" src="${this.Poster}">`;
    template += `<div class="movie__year"><h4>${this.Year}</h4></div>`;
    template += `<div class="movie__rating"><h5>${getMovieRating(this.imdbID)}</h5><span class="star"></span></div>`;
    template += '</div>';

    div.innerHTML = template;

    return div;
  }
}
