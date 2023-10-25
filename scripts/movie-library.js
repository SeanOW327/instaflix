// ---------------------------------------------------------------------------
// Sewtting containers
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
                  <img id="movie-img" class="img-fluid movie-card_img" src="../assets-library/movie-img.jpg" alt="">
                  <div class="movie-card-overlay">
  
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
// Add to watch list
  
let watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
console.log(watchList)

$(document).ready(function() {


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


// ---------------------------------------------------------------------------
// Filter by genre

$(document).ready(function() {
  function displayComedy(){

    let movieFilterArray;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer 0fb2700c5a291e92daee62212e5e24f8'
      }
    };
    
    const apiCallPromise = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=comedy', options)
      .then(response => response.json())
      .then(data => {
        for(let i = 0; i <data.results.length; i++){
            movieFilterArray.push(data.results[i]);
        }
         
    })
      .catch(err => console.error(err));
  
  
      function loadMovies() {
          
        movieContainer.innerHTML = defaultContainer;
        for (let i = 0; i < movieFilterArray.length; i++) {
            $("#movies-container").append($("#movieTemplate").html());
            
            let movieGenres = [];
            for(let j = 0; j < movieFilterArray[i].genre_ids.length; j++){
                for(let k = 0; k < genreArray.genres.length; k++){
                    
                    if(genreArray.genres[k].id === movieFilterArray[i].genre_ids[j]){
                       
                        movieGenres.push(genreArray.genres[k].name)
                    }
                }
            }
            
            let lessGenres = [];
            for(let j = 0; j < 2; j++){
                lessGenres.push(movieGenres[j])
            }
  
            let movieYear = movieFilterArray[i].release_date.substring(0, 4);
  
        let currentChild = $("#movies-container").children().eq(i + 1);
        $(currentChild).find("#movie-title").text(movieFilterArray[i].original_title);
        $(currentChild).find("#movie-year").text(movieYear);
        $(currentChild).find("#movie-genres").text(lessGenres.join(", "));
        $(currentChild).find("#movie-img").attr('src','https://image.tmdb.org/t/p/w500/' + movieFilterArray[i].poster_path);
        $(currentChild).find("#wishlist-button").attr("id", movieFilterArray[i].id);
      }
    }
    
  
    apiCallPromise.then(() => {
        loadMovies();
    });

  }
  
  $("#comedy-movies-filter").on("click", displayComedy);

});
