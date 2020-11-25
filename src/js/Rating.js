export default function getMovieRating(imdbID) {
  const urlForRating = `https://www.omdbapi.com/?i=${imdbID}&apikey=8a42b8ea`;
  return fetch(urlForRating)
    .then((response) => response.json())
    .then((search) => {
      getMovieRating(search.imdbRating);
    });
}
