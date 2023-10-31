const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
  }
};
 
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
            $carouselCaption.append('<p class="text-white movie-synopsis">' + movie.overview + '</p>');
            $carouselCaption.append('<div class="d-flex justify-content-between">');
            $carouselCaption.find('.d-flex').append('<button id="' + movie.id + '" class="btn btn-primary mx-1 watch-now-btn">Watch now</button>');
            $carouselCaption.find('.d-flex').append('<button id="' + movie.id + '" class="btn btn-primary1 mx-1 add-to-watchlist">Add to Watchlist</button>'); //attach movie id to watch list button
            $carouselCaption.append('<p class="text-viewer">Viewer Rating: ' + movie.vote_average + '</p');
            

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

// ---------------------------------------------------------------------------
        // Navigate to individual movie page
        
        $(document).on("click", ".watch-now-btn", function(){
          window.location.href = 'http://127.0.0.1:5501/pages/individualmovie.html?id=' + this.id;
          
        })

// Function to create a closure for the movie data
// ############################################################



// ****************************************************************************
// ---------------------------------------------------------------------------
// Setting containers
let movieContainer = document.getElementById("movies-container");
    let defaultContainer = `
    
    <template id="movieTemplate">
    <div class="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
    <div class="movie-card">
      <button id="wishlist-button" href="" class="add-lib-btn" >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4.375" width="1.25" height="10" fill="white"/>
          <rect y="5.625" width="1.25" height="10" transform="rotate(-90 0 5.625)" fill="white"/>
        </svg>
      </button>
      <div>
        <div class="image-container">
          <img id="movie-img" class="img-fluid movie-card_img" src="../assets-library/movie-img.jpg" alt="">
          <div class="movie-card-overlay">
            <div id="review-avg" class="review-number"></div>
          </div>
        </div>
        
        
      </div>
      
      <div class="movie-card_info">
        <a href=""> <h4 id="movie-title" class="movie-name"> No Hard Feelings</h4> </a>
        <div class="movie-meta">
          <div id="movie-year">2021</div>
          <div class="pipe"></div>
          <div id="movie-genres">Adventure, Drama</div>
        </div>
      </div>
    </div>
    
  </div>
          </template>
    
    `

// ---------------------------------------------------------------------------
// Fetch genres
let genreArray = []; 
      
const genreCallPromise = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(data => {
      let genreArrayData = data;
      genreArray = genreArrayData.genres;
    })
  .catch(err => console.error(err));

  
$(document).ready(function() {


// ---------------------------------------------------------------------------
// Fetch genres
let genreArray = []; 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
    }
  };
  
  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(data => {
        genreArray = data;  
      })
    .catch(err => console.error(err));


// ---------------------------------------------------------------------------
// Fetch movie data

let movieArray = []; 

    let movies = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
        }
      };
      
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', movies)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i <data.results.length; i++){
                movieArray.push(data.results[i]);
            }
             
        })
        .catch(err => console.error(err));

        movies = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
            }
          };
          
          const apiCallPromise = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc', movies)
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i <data.results.length; i++){
                    movieArray.push(data.results[i]);
                }
                 
            })
            .catch(err => console.error(err));



// ---------------------------------------------------------------------------
// Load movies
    
    
  
    function loadMovies() {
        
        movieContainer.innerHTML = defaultContainer;
        for (let i = 0; i < movieArray.length; i++) {
            $("#movies-container").append($("#movieTemplate").html());
            
            let movieGenres = [];
            for(let j = 0; j < movieArray[i].genre_ids.length; j++){
                for(let k = 0; k < genreArray.genres.length; k++){
                    
                    if(genreArray.genres[k].id === movieArray[i].genre_ids[j]){
                       
                        movieGenres.push(genreArray.genres[k].name)
                    }
                }
            }
            
            let lessGenres = [];
            for(let j = 0; j < 2; j++){
                lessGenres.push(movieGenres[j])
            }

            let movieYear = movieArray[i].release_date.substring(0, 4);

        let currentChild = $("#movies-container").children().eq(i + 1);
        $(currentChild).find("#movie-title").text(movieArray[i].original_title);
        $(currentChild).find("#movie-year").text(movieYear);
        $(currentChild).find("#movie-genres").text(lessGenres.join(", "));
        $(currentChild).find("#movie-img").attr('src','https://image.tmdb.org/t/p/w500/' + movieArray[i].poster_path);
        $(currentChild).find("#wishlist-button").attr("id", movieArray[i].id);
      }
    }
    $("#all-movies-filter").on("click", loadMovies);

    apiCallPromise.then(() => {
        loadMovies();
    });

}); // close document ready


// ---------------------------------------------------------------------------
// Add carousel movie to watch list
  


$(document).ready(function() {

    let watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
    console.log(watchList)

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
    
      console.log(watchList)

      
    } else {
      alert("Movie is already added!")
    }
    
  });
});


// ---------------------------------------------------------------------------
// Add card movie to watch list

$(document).ready(function() {

    let watchList = JSON.parse(localStorage.getItem('watchlist')) || [];

  $(document).on("click", ".add-lib-btn", function() {
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


// ******************************************************************************
// Function to load top-rated movies into the "Top-Rated" section

function loadTopRatedMovies() {
    const topRatedMoviesURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=942846c4f78bca737d083698069ab8c5&language=en-US&page=1'; // Replace with your API key

    fetch(topRatedMoviesURL)
        .then(response => response.json())
        .then(data => {
            const movies = data.results.slice(0, 4); // Get the top 4 movies
            const topRatedMoviesContainer = document.getElementById('top-rated-movies-container');

            

            movies.forEach(movie => {
                // Create a movie card element
                const movieCard = document.createElement('div');
                movieCard.className = 'col-xxl-2 col-lg-3 col-md-4 col-sm-6';

                let movieGenres = [];
            for(let j = 0; j < movie.genre_ids.length; j++){
                for(let k = 0; k < genreArray.length; k++){
                    
                    if(genreArray[k].id === movie.genre_ids[j]){
                       
                        movieGenres.push(genreArray[k].name)
                    }
                }
            }

                let lessGenres = [];
                for(let j = 0; j < 2; j++){
                  lessGenres.push(movieGenres[j])
                }


                movieCard.innerHTML = `
                <div class="movie-card">
                  <button id="${movie.id}" href="" class="add-lib-btn" >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4.375" width="1.25" height="10" fill="white"/>
                      <rect y="5.625" width="1.25" height="10" transform="rotate(-90 0 5.625)" fill="white"/>
                    </svg>
                  </button>
                  <div>
                    <div class="image-container">
                      <img id="movie-img" class="img-fluid movie-card_img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title}">
                      <div class="movie-card-overlay">
                        <div id="review-avg" class="review-number">${movie.vote_average}</div>
                      </div>
                    </div>
                    
                    
                  </div>
                  
                  <div class="movie-card_info">
                    <a id="${movie.id}" class="movie-link"> <h4 id="movie-title" class="movie-name"> ${movie.original_title}</h4> </a>
                    <div class="movie-meta">
                      <div id="movie-year">${movie.release_date.substring(0, 4)}</div>
                      <div class="pipe"></div>
                      <div id="movie-genres">${lessGenres.join(", ")}</div>
                    </div>
                  </div>
                </div>
                `;

                topRatedMoviesContainer.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error('Error loading top-rated movies:', error);
        });
}


// ---------------------------------------------------------------------------
// Navigate to individual movie page

$(document).on("click", ".movie-link", function(){
  window.location.href = 'http://127.0.0.1:5501/pages/individualmovie.html?id=' + this.id;
  
})


// Helper function to get movie genres based on genre_ids
function getGenres(genreIds) {
    // Replace this with a mapping of genre_ids to actual genre names
    const genreMap = {
        28: 'Action',
        12: 'Adventure',
        // Add more genre mappings as needed
    };

    return genreIds.map(id => genreMap[id]).join(', ');
}

// Call the function to load top-rated movies when the page is ready
document.addEventListener('DOMContentLoaded', loadTopRatedMovies);






// Function to load the 4 most recent upcoming movies into the "Coming Soon" section
function loadComingSoonMovies() {
    const comingSoonMoviesURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=942846c4f78bca737d083698069ab8c5&language=en-US&page=1'; // Replace with your API key

    fetch(comingSoonMoviesURL)
        .then(response => response.json())
        .then(data => {
            // Filter movies that are genuinely "coming soon" based on release date
            const currentDate = new Date();
            const movies = data.results.filter(movie => new Date(movie.release_date) > currentDate).slice(0, 4);

            const comingSoonMoviesContainer = document.getElementById('coming-soon-movies-container');
            comingSoonMoviesContainer.innerHTML = ''; // Clear existing content

            movies.forEach(movie => {
                // Create a movie card element
                const movieCard = document.createElement('div');
                movieCard.className = 'col-xxl-2 col-lg-3 col-md-4 col-sm-6';

                let movieGenres = [];
            for(let j = 0; j < movie.genre_ids.length; j++){
                for(let k = 0; k < genreArray.length; k++){
                    
                    if(genreArray[k].id === movie.genre_ids[j]){
                       
                        movieGenres.push(genreArray[k].name)
                    }
                }
            }

                let lessGenres = [];
                for(let j = 0; j < 2; j++){
                  lessGenres.push(movieGenres[j])
                }

                movieCard.innerHTML = `
                <div class="movie-card">
                  <button id="${movie.id}" href="" class="add-lib-btn" >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4.375" width="1.25" height="10" fill="white"/>
                      <rect y="5.625" width="1.25" height="10" transform="rotate(-90 0 5.625)" fill="white"/>
                    </svg>
                  </button>
                  <div>
                    <div class="image-container">
                      <img id="movie-img" class="img-fluid movie-card_img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title}">
                      
                    </div>
                    
                    
                  </div>
                  
                  <div class="movie-card_info">
                    <a href=""> <h4 id="movie-title" class="movie-name"> ${movie.original_title}</h4> </a>
                    <div class="movie-meta">
                      <div id="movie-year">${movie.release_date.substring(0, 4)}</div>
                      <div class="pipe"></div>
                      <div id="movie-genres">${lessGenres.join(", ")}</div>
                    </div>
                  </div>
                </div>
                `;

                comingSoonMoviesContainer.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error('Error loading coming soon movies:', error);
        });
}




// Call the function to load coming soon movies when the page is ready
document.addEventListener('DOMContentLoaded', loadComingSoonMovies);


        // Replace this with your API URL
        const apiURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=942846c4f78bca737d083698069ab8c5&language=en-US&page=1';

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                // Iterate through movie data to create carousel items
                data.forEach((movie, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;

                    carouselItem.innerHTML = `
                        <!-- Background Image -->
                        <img src="${movie.backgroundImage}" class="d-block w-100" alt="Background Image">
        
                        <!-- Movie Information Overlay -->
                        <div class="carousel-caption d-none d-md-block text-left">
                            <div class="row">
                                <!-- Movie Poster -->
                                <div class="col-md-6">
                                    <img src="${movie.poster}" alt="Movie Poster" class="img-fluid">
                                </div>
                                <!-- Movie Details -->
                                <div class="col-md-6">
                                    <h2 style="color: #ffff;">${movie.title}</h2>
                                    <p class="text-left" style="color: #ffff;">${movie.description}</p>
                                    <p class="text-left" style="color: #ffff;">Genre: ${movie.genre}</p>
                                    <div class="text-right">
                                        <a href="${movie.mapLink}" class="btn btn-primary">View on Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    document.querySelector('.carousel-inner').appendChild(carouselItem);
                });
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });


 
            
            









            






















