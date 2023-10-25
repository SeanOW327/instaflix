 // Replace 'YOUR_API_KEY' with your actual TMDb API key
 var apiKey = '942846c4f78bca737d083698069ab8c5';

 // The base URL for TMDb API
 var baseUrl = 'https://api.themoviedb.org/3/';

 // Endpoint for getting upcoming movies
 var endpoint = 'movie/upcoming';

 // Complete URL for the AJAX request
 var apiUrl = baseUrl + endpoint + '?api_key=' + apiKey;

 // Make an AJAX GET request to retrieve upcoming movies
 $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function(data) {
        // Handle the JSON response here
        var today = new Date();
        var movies = data.results
            .filter(function(movie) {
                var releaseDate = new Date(movie.release_date);
                return releaseDate >= today;
            })
            .slice(0, 4); // Filter and select the first four upcoming movies

        // Reference the container where you want to append the cards
        var $container = $('#movie-container');

        // Loop through the movies and append them to the container
        for (var i = 0; i < movies.length; i++) {
            var movie = movies[i];

            // Create a new card element
            var $card = $('<div class="col-12 col-md-3 mb-3 px-12"></div>');
            $card.append('<div class="card" style="background-color: rgba(0, 0, 0, 0); border: none;">');
            $card.find('.card').append('<img class="card-img-top" src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" alt="' + movie.title + '">');
            $card.find('.card').append('<div class="card-body">');
            $card.find('.card-body').append('<h5 class="card-title">' + movie.title + '</h5>');
            $card.find('.card-body').append('<p class="card-text">Release Date: ' + movie.release_date + '</p>');

            // Append the card to the container
            $container.append($card);
        }
    },
    error: function(error) {
        // Handle any errors
        console.error('Error: ' + error);
    }
});


$.ajax({
    url: apiUrl,
    method: 'GET',
    success: function(data) {
        // Handle the JSON response here
        var movies = data.results;

        // Reference the movie slider
        var $movieSlider = $('#movie-slider');

        // Retrieve the existing watchlist from local storage
        var watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Function to create a closure for the movie data
        function createAddToWatchlistHandler(movie) {
            return function() {
                var movieData = {
                    title: movie.title,
                    overview: movie.overview,
                    backdrop_path: movie.backdrop_path,
                    vote_average: movie.vote_average
                };

                // Check if the movie is already in the watchlist
                var isMovieInWatchlist = watchlist.some(function(watchlistItem) {
                    return watchlistItem.title === movieData.title;
                });

                // If the movie is not already in the watchlist, add it
                if (!isMovieInWatchlist) {
                    watchlist.push(movieData);

                    // Store the updated watchlist in local storage
                    localStorage.setItem('watchlist', JSON.stringify(watchlist));

                    // Show an alert when the movie is added to the watchlist
                    alert('Movie added to your watchlist: ' + movieData.title);
                }
            };
        }

        // Loop through the movies and add them to the slider
        for (var i = 0; i < movies.length; i++) {
            var movie = movies[i];

            // Create a carousel item for each movie
            var $carouselItem = $('<div class="carousel-item"></div>');
            if (i === 0) {
                $carouselItem.addClass('active');
            }

            // Set the movie background image
            $carouselItem.append('<img src="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + movie.backdrop_path + '" class="d-block w-100" alt="' + movie.title + '">');
            $carouselItem.append('<div style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: rgba(0, 0, 0, 0.5);"></div>');

            // Create a carousel caption with movie details
            var $carouselCaption = $('<div class="carousel-caption d-flex flex-column justify-content-center align-items-start h-100"></div>');
            $carouselCaption.append('<h1 class="text-white">' + movie.title + '</h1>');
            $carouselCaption.append('<p class="text-white">' + movie.overview + '</p>');
            $carouselCaption.append('<div class="d-flex justify-content-between">');
            $carouselCaption.find('.d-flex').append('<button id=" ' + movie.id + '" class="btn btn-primary mx-1">Watch now</button>');
            $carouselCaption.find('.d-flex').append('<button id=" ' + movie.id + '" class="btn btn-primary1 mx-1 add-to-watchlist">Add to Watchlist</button>'); //attach movie id to watch list button
            $carouselCaption.append('<p class="text-viewer">Viewer Rating: ' + movie.vote_average + '</p');

            // Add a click event handler to the "Add to Watchlist" button using the closure function
            $carouselCaption.find('.add-to-watchlist').on('click', createAddToWatchlistHandler(movie));

            // Append the caption to the carousel item
            $carouselItem.append($carouselCaption);

            // Append the carousel item to the movie slider
            $movieSlider.append($carouselItem);
        }
    },
    error: function(error) {
        // Handle any errors
        console.error('Error: ' + error);
    }

    
});

// Function to create a closure for the movie data

// ---------------------------------------------------------------------------
// Add to watch list
  
let watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
console.log(watchList)

$(document).ready(function() {


  $(document).on("click", ".add-to-watchlist", function() {
    let buttonId = $(this).attr("id");
    var isDuplicate = false;
    for(let i = 0; i < watchList.length; i++){
      if(buttonId === watchList[i]){
        isDuplicate = true;
      } 
    }
    
    if(isDuplicate === false){

      let movieResult;

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
        }
      };
      
      const apiCallPromise = fetch('https://api.themoviedb.org/3/movie/' + buttonId, options)
        .then(response => response.json())
        .then(data => {
          movieResult = data;
        })
        .catch(err => console.error(err));

      apiCallPromise.then(() => {
        watchList.push(buttonId)
        localStorage.setItem('watchlist', JSON.stringify(watchList));
        alert("'" + movieResult.original_title + "'" + " has been added to watchlist!")
      });
    

      
    } else {
      alert("Movie is already added!")
    }
    
  });
});

// Add click event handler for "Add to Watchlist" button
// $carouselCaption.find('.add-to-watchlist').on('click', createAddToWatchlistHandler(movie));









