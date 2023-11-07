// In your JavaScript for the library page
document.addEventListener('DOMContentLoaded', () => {
  const movieCards = document.querySelectorAll('.movie-card');
  
  movieCards.forEach((card) => {
    const viewDetailsLink = card.querySelector('a');
    viewDetailsLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      const movieId = viewDetailsLink.getAttribute('href').split('=')[1]; // Extract the movie ID from the URL
      loadIndividualMoviePage(movieId);
    });
  });
});

function loadIndividualMoviePage(movieId) {
  // Fetch detailed movie information using the movieId from the TMDb API
  // Populate your individual movie page with the fetched data
  // You can update the content of the individual movie page here
}


// Movie api url
const tmdbUrl =
      "https://api.themoviedb.org/3/movie/507089?api_key=36d3716b309f66d8de33fabd0f6aa6c9&language=en-US";

// Defining async function to fetch movie data
async function fetchmoviedata(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
    showmoviedata(data);
    }
}
// call function
fetchmoviedata(tmdbUrl);
displayMovieTrailer('507089');
function showmoviedata(data) {

    //Log variable to  console
    console.log(data.overview);

                document.getElementById('poster2').src = 'https://image.tmdb.org/t/p/w500/'+data.poster_path;
                   document.getElementById('title2').textContent = data.title;
//                       document.getElementById('director').textContent = data.credits.crew.find(crew => crew.job === 'Director').name;
//                           document.getElementById('actors').textContent = data.credits.cast.slice(0, 3).map(actor => actor.name).join(', ');
                                document.getElementById('synopsis').textContent = data.overview;
                                  document.getElementById('rating').textContent = data.vote_average;
                                      document.getElementById('year').textContent = data.release_date;
                                          document.getElementById('box-office').textContent = 'USD ' + data.revenue;

}

function showmoviedata(data) {
  // Set the movie poster and title in the header banner
  document.getElementById('poster1').src = 'https://image.tmdb.org/t/p/w500/' + data.poster_path;
  document.getElementById('title1').textContent = data.title;
  
  // Other code for displaying additional movie information
  document.getElementById('rating').textContent = data.vote_average;
  document.getElementById('year').textContent = data.release_date;
  document.getElementById('box-office').textContent = 'USD ' + data.revenue;
}

// Function to display the movie trailer
async function displayMovieTrailer(movieId) {
  // Construct the URL to fetch the videos related to the movie
  const videosUrl = `https://api.themoviedb.org/3/movie/507089/videos?api_key=36d3716b309f66d8de33fabd0f6aa6c9&language=en-US`;
  const response = await fetch(videosUrl);

// Storing data in form of JSON
var data = await response.json();
console.log(data);
if (response) {
showmovietrailer(data);
};

// Fetch the videos data
 // fetch(videosUrl)
  //  .then((response) => response.json())
    //.then((data) => {
     // if (data.results.length > 0) {
       // const trailerKey = data.results[0].key; // Assuming the first video is the trailer

        // Construct the YouTube URL for the trailer
        //const trailerUrl = `https://www.youtube.com/embed/507089-five-nights-at-freddy-s#`;

        // Set the trailer URL in the iframe
        //document.getElementById('trailer').src = trailerUrl;
     // } else {
        // Handle the case where no trailer is available
       // document.getElementById('trailer').style.display = 'none';
     // }
   // })
    //.catch((error) => {
      //console.error('Error fetching movie trailer:', error);
      // Handle any errors here
  //  });
}

 // Storing response
 

 function showmovietrailer(data) {
  if (data.results.length > 0) {
    const trailerKey = data.results[0].key; // Assuming the first video is the trailer

    // Construct the YouTube URL for the trailer
    const trailerUrl = 'https://www.youtube.com/embed/'+ trailerKey;

    // Set the trailer URL in the iframe
    document.getElementById('trailer').src = trailerUrl;
  } else {
    // Handle the case where no trailer is available
    document.getElementById('trailer').style.display = 'none';
  }
 }

 document.addEventListener('DOMContentLoaded', () => {
  const addToWatchlistButton = document.getElementById('addToWatchlist');
  
  // Check if the movie is already in the watchlist
  checkIfInWatchlist();

  // Add a click event listener to the "Add to Watchlist" button
  addToWatchlistButton.addEventListener('click', () => {
    addToWatchlist();
  });
});

// Function to add the movie to the watchlist
function addToWatchlist() {
  // Get the movie ID and other necessary information from the current movie page
  const movieId = '507089'; // Replace with the actual movie ID
  const movieTitle = 'Movie Title'; // Replace with the actual movie title

  // Check if the movie is already in the watchlist
  if (isMovieInWatchlist(movieId)) {
    alert('This movie is already in your watchlist.');
    return;
  }

  // Get the existing watchlist from local storage or initialize an empty array
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  // Add the movie to the watchlist
  watchlist.push({ id: movieId, title: movieTitle });

  // Save the updated watchlist to local storage
  localStorage.setItem('watchlist', JSON.stringify(watchlist));

  alert('Movie added to your watchlist!');
}

// Function to check if the movie is already in the watchlist
function isMovieInWatchlist(movieId) {
  // Get the existing watchlist from local storage
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  // Check if the movie with the given ID is in the watchlist
  return watchlist.some((movie) => movie.id === movieId);
}

// Function to check if the movie is already in the watchlist and update the button text
function checkIfInWatchlist() {
  const addToWatchlistButton = document.getElementById('addToWatchlist');
  const movieId = '507089'; // Replace with the actual movie ID
  const isAlreadyInWatchlist = isMovieInWatchlist(movieId);

  if (isAlreadyInWatchlist) {
    addToWatchlistButton.textContent = 'In Watchlist';
    addToWatchlistButton.disabled = true;
  }
}

 