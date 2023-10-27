const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");
        alert(movieId)
        fetch('https://api.themoviedb.org/3/movie/' + movieId)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const movieInfo = document.getElementById("movie-info");
                let movieYear = data.release_date.substring(0, 4);
                let movieGenres = [];
                for(let j = 0; j < data.genre_ids.length; j++){
                    for(let k = 0; k < genreArray.length; k++){
                        
                        if(genreArray[k].id === movieArray[i].genre_ids[j]){
                        
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
            .catch(error => console.error("Error fetching movie data: " + error));


            