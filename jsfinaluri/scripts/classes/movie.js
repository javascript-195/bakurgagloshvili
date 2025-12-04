export default class Movie {
    constructor(movieData) {
        this.id = movieData.id;
        this.title = movieData.title;
        this.overview = movieData.overview || 'აღწერა არ არის მოწოდებული.';
        this.posterPath = movieData.poster_path;
        this.releaseDate = movieData.release_date;
        this.voteAverage = movieData.vote_average || 0;
        this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    }

    getPosterUrl() {
        return this.posterPath 
            ? `${this.imageBaseUrl}${this.posterPath}` 
            : 'https://via.placeholder.com/500x750?text=No+Poster';
    }

    getReleaseYear() {
        return this.releaseDate ? this.releaseDate.substring(0, 4) : 'N/A';
    }

    getFormattedRating() {
        return this.voteAverage.toFixed(1);
    }

    createSearchCard() {
        const card = document.createElement('div');
        card.className = 'search-movie-card';
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <img src="${this.getPosterUrl()}" alt="${this.title}">
            <div class="search-movie-info">
                <h4>${this.title} (${this.getReleaseYear()})</h4>
                <p>${this.overview}</p>
                <span>⭐ რეიტინგი: ${this.getFormattedRating()}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `moviedetail.html?id=${this.id}`;
        });

        return card;
    }

    createTopMovieCard() {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.cursor = 'pointer';

        const posterUrl = this.posterPath 
            ? `${this.imageBaseUrl}${this.posterPath}` 
            : 'https://via.placeholder.com/500x200?text=No+Image';

        card.innerHTML = `
            <img src="${posterUrl}" alt="${this.title}" class="movie-img">
            <div class="movie-info">
                <h3 class="movie-title" title="${this.title}">${this.title}</h3>
                <span class="movie-rating">⭐ ${this.getFormattedRating()}</span>
                <p class="movie-desc">${this.overview}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `moviedetail.html?id=${this.id}`;
        });

        return card;
    }

    static createFromAPI(movieData) {
        return new Movie(movieData);
    }

    static createMultipleFromAPI(moviesData) {
        return moviesData.map(movieData => Movie.createFromAPI(movieData));
    }
}

