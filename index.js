const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e97b5be27544e99801103a609ef426b6&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=e97b5be27544e99801103a609ef426b6&query="'
const form = document.getElementById('form')
const searchBox = document.getElementById('search-box')
const searchBtn = document.getElementById('search-btn')
const movieColumn = document.getElementById('movie-column')
const watchlistBtn = document.querySelector('.watchlist-btn')

getMovies(API_URL)

async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.results)
  renderMovies(data.results)
}


function renderMovies(movies) {
  movieColumn.innerHTML = ''
    movies.forEach(movie => {
      const { title, poster_path, vote_average, overview} = movie
      movieColumn.innerHTML += `
      <div class="movie">
        <!-- Movie Image -->
        <img src="${IMG_PATH + poster_path}" />
        
        <!-- Movie Description -->
        <div class="movie-description">
          <div class="movie-title">
          <h3>${title}</h3>
          <img src="./imgs/star Icon.png" />
          <span class="rating">${vote_average}</span>
        </div>
        
        <div class="movie-details">
          <span class="duration">177 min</span>
          <span class="genre">Action</span>
          <span class="watchlist-btn">
          <img src="./imgs/add Icon.png" />
           Watchlist </span>
        </div>
        <p>${overview}</p>
      </div>
      `
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const searchValue = searchBox.value

  if(searchValue && searchValue !== ''){
    getMovies(SEARCH_URL + searchValue)
    console.log(searchValue)
    searchBox.value = ''
  } else {
    window.location.reload()
  }
})