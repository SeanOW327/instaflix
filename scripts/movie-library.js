const movieCards = document.querySelectorAll(".movie-card");
        movieCards.forEach(card => {
            card.addEventListener("click", () => {
                const movieId = card.getAttribute("data-id");
                window.location.href = `individualmovie.html?id=${movieId}`;
            });
        });