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

            // movie details
const apiKey = '36d3716b309f66d8de33fabd0f6aa6c9';
const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

fetch(tmdbUrl)
    .then(response => response.json())
    .then(data => {
            document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
               document.getElementById('title').textContent = data.title;
                   document.getElementById('director').textContent = data.credits.crew.find(crew => crew.job === 'Director').name;
                       document.getElementById('actors').textContent = data.credits.cast.slice(0, 3).map(actor => actor.name).join(', ');
                            document.getElementById('synopsis').textContent = data.overview;
                              document.getElementById('rating').textContent = data.vote_average;
                                   document.getElementById('year').textContent = data.release_date.split('-')[0];
                                      document.getElementById('box-office').textContent = data.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }); })
    .catch(error => {
        console.error('Error fetching movie details:', error);
    });

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const trailerKey = data.results[0] ? data.results[0].key : null;
          if (trailerKey) {
            trailerElement.src = `https://www.youtube.com/embed/${trailerKey}`;
        } else {
            trailerElement.style.display = 'none';
        }
    })
    .catch(error => console.error(error));



  //movie poster URL from the query parameter -- >
const urlpParams = new URLSearchParams(window.location.search);
const posterUrl = urlpParams.get('poster');


const headerPosterElement = document.getElementById('header-poster');
headerPosterElement.src = posterUrl;
