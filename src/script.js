import Swiper from 'swiper';
import Movie from './js/Movie';

let currentMovie = 'Dream';

const addFontLink = () => {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Muli:wght@200;300;400;600;700;800;900&family=Orbitron:wght@400;600;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.append(fontLink);
};
addFontLink();

const swiper = new Swiper('.swiper-container', {
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
});

export function newPage(currentMovie) {
  fetch(`https://www.omdbapi.com/?s=${currentMovie}&page=2&apikey=8a42b8ea`)
    .then((response) => response.json())
    .then((search) => {
      const movies = search.Search.map((movie) => new Movie(movie).generateMovie());
      swiper.appendSlide(movies);
      swiper.update();
    });
}

export function lastSlide() {
  swiper.on('reachEnd', () => {
    newPage(currentMovie);
  });
}


export function getMovies(searchText) {
  fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=8a42b8ea`)
    .then((response) => response.json())
    .then((search) => {
      const movies = search.Search.map((movie) => new Movie(movie).generateMovie());
      swiper.removeAllSlides();
      swiper.appendSlide(movies);
      swiper.update();
    });
}

export function searchForm() {
  document.getElementById('search-form').addEventListener('submit', (e) => {
    currentMovie = document.getElementById('search-text').value;
    getMovies(currentMovie);
    e.preventDefault();
    swiper.activeIndex = 0;
    swiper.update();
  });
}


const INPUT = document.querySelector('#search-text');
INPUT.focus();
lastSlide();
getMovies(currentMovie);
searchForm();
