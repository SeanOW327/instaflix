// Fetch movie details from TMDb API
const apiKey = '36d3716b309f66d8de33fabd0f6aa6c9';
const movieId = '507089'; // Five Nights at Freddy's movie ID
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
        document.getElementById('box-office').textContent = data.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    })
    .catch(error => {
        console.error('Error fetching movie details:', error);
    });