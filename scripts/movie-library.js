const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
  }
};

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
            <div id="review-avg" class="review-number">10</div>
          </div>
        </div>
        
        
      </div>
      
      <div class="movie-card_info">
        <div id="movie-title-link" class="movie-link"> <h4 id="movie-title" class="movie-name"> No Hard Feelings</h4> </div>
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


    document.querySelectorAll('.movie-card').forEach(card => {
      card.addEventListener('click', async () => {
          const movieId = card.getAttribute('data-movie-id');
          // Redirect to the movie display page with the movie ID as a query parameter
          window.location.href = `movie.html?id=${movieId}`;
      });
  });
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
    }
  };
  

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


const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");
        alert(movieId)
        
        fetch('https://api.themoviedb.org/3/movie/' + movieId, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data)
                const movieInfo = document.getElementById("movie-info");
                let movieYear = data.release_date.substring(0, 4);
                let movieGenres = [];
                for(let j = 0; j < data.genres.length; j++){
                    for(let k = 0; k < genreArray.length; k++){
                        
                        if(genreArray[k].id === data.genres[j].id){
                        
                            movieGenres.push(genreArray[k].name)
                        }
                    }
                }
                movieInfo.innerHTML = `
                    <h2>${data.original_title}</h2>
                    <p>Release Year: ${movieYear}</p>
                    <p>Rating: ${data.vote_average}</p>
                    <p>Genre: ${movieGenres.join(", ")}</p>
                    <p>Plot: ${data.overview}</p> 
                    <p>Actors: ${data.actors}</p>
                    <p>Writers: ${data.writer}</p>
                 
                    
                `;
            })
            .catch(err => console.error(err));


            

            // document.addEventListener("DOMContentLoaded", function () {
            //     const apiKey = 'https://api.themoviedb.org/3/account/36d3716b309f66d8de33fabd0f6aa6c9';
            //     const movieId = 'movie-info';
                

            //     fetch(`https://api.themoviedb.org/3/account/36d3716b309f66d8de33fabd0f6aa6c9/${movie-info}?api_key=${36d3716b309f66d8de33fabd0f6aa6c9}`)
            //         .then(response => response.json())
            //         .then(data => {
            //             const posterURL = data.poster_path;
            //             const posterElement = document.getElementById('movie-poster');
                        
            //             if (posterURL) {
            //                 posterElement.src = 'https://image.tmdb.org/t/p/w500/' + posterURL; 
            //             } else {
            //                 posterElement.src = '/assets/movie.jpg'; 
            //             }
            //         })
            //         .catch(error => console.error('Error fetching movie poster:', error));
            // })

            username = localStorage.getItem("username");
            
            if (!username) {
              alert("Please sign in!")
              window.location.href = 'http://127.0.0.1:5501/pages/signin.html'; 
            } else {
              document.getElementById("username").textContent = username;
            }

  

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


// ---------------------------------------------------------------------------
// Years array

let yearDropdown = document.getElementById("year-select");
        function populateYearDropdown() {
            let startYear = 1980;
            let endYear = 2023;

            for (let year =  endYear; year >= startYear; year--) {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearDropdown.appendChild(option);
            }
        }
        populateYearDropdown();


// ---------------------------------------------------------------------------
// Reviews array

let reviewDropdown = document.getElementById("score-select");
        function populateScoreDropdown() {
            let startScore = 1;
            let endScore = 10;

            for (let score =  endScore; score >= startScore; score--) {
                const option = document.createElement("option");
                option.value = score;
                option.textContent = score;
                reviewDropdown.appendChild(option);
            }
        }
        populateScoreDropdown();


// ---------------------------------------------------------------------------
// Fetch movie data

let movieArray = []; 
      
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(response => response.json())
  .then(data => {
      for(let i = 0; i <data.results.length; i++){
          movieArray.push(data.results[i]);
      }
       
  })
  .catch(err => console.error(err));
    
    const apiCallPromise = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(data => {
          for(let i = 0; i <data.results.length; i++){
              movieArray.push(data.results[i]);
          }
           
      })
      .catch(err => console.error(err));


// ---------------------------------------------------------------------------
// Load movies
$(document).ready(function() {
    function loadMovies() {
        
        movieContainer.innerHTML = defaultContainer;
        for (let i = 0; i < movieArray.length; i++) {
            $("#movies-container").append($("#movieTemplate").html());
            
            let movieGenres = [];
            for(let j = 0; j < movieArray[i].genre_ids.length; j++){
                for(let k = 0; k < genreArray.length; k++){
                    
                    if(genreArray[k].id === movieArray[i].genre_ids[j]){
                       
                        movieGenres.push(genreArray[k].name)
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
        $(currentChild).find("#review-avg").text(movieArray[i].vote_average);
        $(currentChild).find("#movie-genres").text(lessGenres.join(", "));
        $(currentChild).find("#movie-img").attr('src','https://image.tmdb.org/t/p/w500/' + movieArray[i].poster_path);
        $(currentChild).find("#wishlist-button").attr("id", movieArray[i].id);
        $(currentChild).find("#movie-title-link").attr("id", movieArray[i].id);
      }
    }
    $("#all-movies-filter").on("click", loadMovies);

    

    apiCallPromise.then(() => {
        loadMovies();

        // ---------------------------------------------------------------------------
        // Navigate to individual movie page
        
        $(document).on("click", ".movie-link", function(){
          window.location.href = '../individualmovie.html?id=' + this.id;
          
        })
        
    });

}); // close document ready


// ---------------------------------------------------------------------------
// Add to watch list
  
let watchList = JSON.parse(localStorage.getItem('watchlist')) || [];

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
// Filter

$(document).ready(function() {

  genreCallPromise.then(() => {

    const select = document.getElementById('genre-select');


    genreArray.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
      select.appendChild(option);
  });

  function displayComedy(){

    let selectedGenreValue = "";
    let selectedYearValue = "";
    let selectedImdbScore = "";
    
    let selectGenre = document.getElementById('genre-select');
    let selectedGenre = selectGenre.options[selectGenre.selectedIndex].value;

    let selectYear = document.getElementById('year-select');
    let selectedYear =  selectYear.options[selectYear.selectedIndex].value;

    let selectScore = document.getElementById('score-select');
    let selectedScore =  selectScore.options[selectScore.selectedIndex].value;
    

    if(selectedGenre === ""){
    } else{
      selectedGenreValue = "&with_genres=" + selectedGenre;
    }

    if(selectedYear === ""){
    } else{
      selectedYearValue = "&primary_release_year=" + selectedYear;
    }  
    
    if(selectedScore === ""){
    } else{
      selectedImdbScore = "&vote_average.gte=" + selectedScore;
    }  



   
   

    let movieFilterArray = [];
    
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1' + selectedYearValue + '&sort_by=popularity.desc' + selectedImdbScore + selectedGenreValue, options)
      .then(response => response.json())
      .then(data => {
        for(let i = 0; i <data.results.length; i++){
            movieFilterArray.push(data.results[i]);
        }
         
    })
      .catch(err => console.error(err));

      const apiCallPromise = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2' + selectedYearValue + '&sort_by=popularity.desc' + selectedImdbScore + selectedGenreValue, options)
      .then(response => response.json())
      .then(data => {
        for(let i = 0; i <data.results.length; i++){
            movieFilterArray.push(data.results[i]);
        }
        console.log()
         
    })
      .catch(err => console.error(err));
  

      function loadMovies() {
          
        movieContainer.innerHTML = defaultContainer;
        for (let i = 0; i < movieFilterArray.length; i++) {
            $("#movies-container").append($("#movieTemplate").html());
            
            let movieGenres = [];
            for(let j = 0; j < movieFilterArray[i].genre_ids.length; j++){
                for(let k = 0; k < genreArray.length; k++){
                    
                    if(genreArray[k].id === movieFilterArray[i].genre_ids[j]){
                       
                        movieGenres.push(genreArray[k].name)
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
        $(currentChild).find("#review-avg").text(movieFilterArray[i].vote_average);
        $(currentChild).find("#movie-img").attr('src','https://image.tmdb.org/t/p/w500/' + movieFilterArray[i].poster_path);
        $(currentChild).find("#wishlist-button").attr("id", movieFilterArray[i].id);
        $(currentChild).find("#movie-title-link").attr("id", movieFilterArray[i].id);

        
        
      }
    }
    
  
    apiCallPromise.then(() => {
        loadMovies();
    });

  }

  const selectCheck = document.getElementById('filter-form');
  selectCheck.addEventListener('change', displayComedy);

  });

  

});


username = localStorage.getItem("username");

if (!username) {
  alert("Please sign in!")
  window.location.href = '../pages/signin.html'; 
} else {
  document.getElementById("username").textContent = username;
}