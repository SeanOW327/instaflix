const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");
        fetch(`https://api.themoviedb.org/3/account/36d3716b309f66d8de33fabd0f6aa6c9${movieId}`)
            .then(response => response.json())
            .then(data => {
                const movieInfo = document.getElementById("movie-info");
                movieInfo.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>Release Year: ${data.releaseYear}</p>
                    <p>Rating: ${data.rating}</p>
                    <p>Genre: ${data.genre}</p>
                    <p>Plot: ${data.description}</p> 
                    <p>Actors: ${data.actors}</p>
                    <p>Writers: ${data.writer}</p>
                 
                 
                
                    
                `;
            })
            .catch(error => console.error("Error fetching movie data: " + error));


            