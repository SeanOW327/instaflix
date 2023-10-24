// ---------------------------------------------------------------------------
// Setting containers
let movieContainer = document.getElementById("movies-container");
    let defaultContainer = `
    
    <template id="movieTemplate">
            <div class="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
              <div class="movie-card">
                <button id="wishlist-button" href="" class="rem-lib-btn" >
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="1.625" width="1.25" height="10" transform="rotate(-90 0 1.625)" fill="white"/>
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
// Fetch movie data

let watchListArray = [];

let watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
console.log(watchList);

for(let i = 0; i < watchList.length; i++){
    let movieResult;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmIyNzAwYzVhMjkxZTkyZGFlZTYyMjEyZTVlMjRmOCIsInN1YiI6IjY1MzRmNTUzMmIyMTA4MDExZGRmYTE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aF-FMrsAtLTGS4ISe4FLhdLw9YJb0_xcdnNbLEZH--s'
        }
      };
      
      const apiCallPromise = fetch('https://api.themoviedb.org/3/movie/' + watchList[i], options)
        .then(response => response.json())
        .then(data => {
          movieResult = data;
        })
        .catch(err => console.error(err));

      apiCallPromise.then(() => {
        watchListArray.push(movieResult)
      });    

}

console.log(watchListArray);


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
  
  const apiCallPromise = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(data => {
        genreArray = data;  
      })
    .catch(err => console.error(err));
console.log(genreArray)

// ---------------------------------------------------------------------------
// Load movies
    

function loadWatchList() {
        
        movieContainer.innerHTML = defaultContainer;
        for (let i = 0; i < watchListArray.length; i++) {
            $("#movies-container").append($("#movieTemplate").html());

            let movieGenres = [];
            for(let j = 0; j < watchListArray[i].genres.length; j++){
                for(let k = 0; k < genreArray.genres.length; k++){

                    if(genreArray.genres[k].id === watchListArray[i].genres[j].id){
                       
                        movieGenres.push(genreArray.genres[k].name)
                        
                    }
                }
            }
            
            let lessGenres = [];
            for(let j = 0; j < 2; j++){
                lessGenres.push(movieGenres[j])
            }

            let movieYear = watchListArray[i].release_date.substring(0, 4);

        let currentChild = $("#movies-container").children().eq(i + 1);
        $(currentChild).find("#movie-title").text(watchListArray[i].original_title);
        $(currentChild).find("#movie-year").text(movieYear);
        $(currentChild).find("#movie-genres").text(lessGenres.join(", "));
        $(currentChild).find("#movie-img").attr('src','https://image.tmdb.org/t/p/w500/' + watchListArray[i].poster_path);
        $(currentChild).find("#wishlist-button").attr("id", watchListArray[i].id);
      }
    }
apiCallPromise.then(() => {
    loadWatchList();
    console.log(genreArray)
});

   
    // ---------------------------------------------------------------------------
    // Remove from watch list
    let updatedList;

  $(document).on("click", ".rem-lib-btn", function() {
    let buttonId = $(this).attr("id");

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
        updatedList = watchList.filter(item => item !== buttonId);
        watchList = updatedList;
        localStorage.setItem('watchlist', JSON.stringify(watchList));
        alert("'" + movieResult.original_title + "'" + " has been removed to watchlist!")
        loadWatchList()
        location.reload();
      });
    
  });

}); // close document ready





$(document).ready(function() {
    
});


// ---------------------------------------------------------------------------
// Filter by genre

