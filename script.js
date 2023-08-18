document.addEventListener("DOMContentLoaded", function() {
    const searchMovieBtn = document.getElementById("searchMovieBtn");
    const movieInput = document.getElementById("movieInput");
    const movieResults = document.getElementById("movieResults");

    searchMovieBtn.addEventListener("click", function() {
        const movieTitle = movieInput.value;
        if (movieTitle) {
            searchMovie(movieTitle);
        }
    });

    function searchMovie(movieTitle) {
        const apiKey = "5e72ea0a";
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.Search);
            })
            .catch(error => {
                console.error("Error fetching movie data:", error);
            });
    }

    function displayMovies(movies) {
        movieResults.innerHTML = "";

        if (movies) {
            movies.forEach(movie => {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie-card");

                const movieTitle = document.createElement("h2");
                movieTitle.textContent = movie.Title;

                const movieYear = document.createElement("p");
                movieYear.textContent = `Year: ${movie.Year}`;

                const moviePoster = document.createElement("img");
                moviePoster.src = movie.Poster;
                moviePoster.alt = `${movie.Title} Poster`;

                movieDiv.appendChild(movieTitle);
                movieDiv.appendChild(movieYear);
                movieDiv.appendChild(moviePoster);

                movieResults.appendChild(movieDiv);
            });
        } else {
            movieResults.innerHTML = "<p>No movies found.</p>";
        }
    }
});
