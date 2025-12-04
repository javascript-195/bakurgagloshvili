import MovieAPI from './classes/movieAPI.js';

const TMDb_API_KEY = "a841badc5b44e50328ea842b89f6c1be";

class MovieDetailPage {
    constructor() {
        this.container = document.getElementById('movieDetailContainer');
        this.movieAPI = new MovieAPI(TMDb_API_KEY);
        this.movieId = this.getMovieIdFromURL();
        this.init();
    }

    getMovieIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async init() {
        if (!this.movieId) {
            this.showError('ფილმის ID არ მოიძებნა.');
            return;
        }

        try {
            await this.loadMovieDetails();
        } catch (error) {
            this.showError('ფილმის დეტალების ჩატვირთვა ვერ მოხერხდა.');
            console.error(error);
        }
    }

    async loadMovieDetails() {
        this.showLoading();
        
        try {
            const movieData = await this.movieAPI.getMovieDetails(this.movieId);
            this.displayMovieDetails(movieData);
        } catch (error) {
            throw error;
        }
    }

    displayMovieDetails(movieData) {
        const posterUrl = movieData.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Poster';
        
        const backdropUrl = movieData.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`
            : '';

        const releaseYear = movieData.release_date ? movieData.release_date.substring(0, 4) : 'N/A';
        const rating = movieData.vote_average ? movieData.vote_average.toFixed(1) : '0.0';
        const genres = movieData.genres ? movieData.genres.map(g => g.name).join(', ') : 'N/A';
        const runtime = movieData.runtime ? `${movieData.runtime} წუთი` : 'N/A';
        const overview = movieData.overview || 'აღწერა არ არის მოწოდებული.';

        this.container.innerHTML = `
            <div class="movie-detail-hero" style="background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${backdropUrl}')">
                <div class="movie-detail-content">
                    <div class="movie-detail-poster">
                        <img src="${posterUrl}" alt="${movieData.title}">
                    </div>
                    <div class="movie-detail-info">
                        <h1 class="movie-detail-title">${movieData.title}</h1>
                        <div class="movie-detail-meta">
                            <span class="movie-detail-year">${releaseYear}</span>
                            <span class="movie-detail-rating">⭐ ${rating}</span>
                            <span class="movie-detail-runtime">⏱ ${runtime}</span>
                        </div>
                        <div class="movie-detail-genres">
                            <strong>ჟანრები:</strong> ${genres}
                        </div>
                        <div class="movie-detail-overview">
                            <h3>აღწერა</h3>
                            <p>${overview}</p>
                        </div>
                        <a href="index.html" class="back-to-home-btn">
                            <i class="fas fa-arrow-left"></i> მთავარ გვერდზე დაბრუნება
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    showLoading() {
        this.container.innerHTML = '<div class="loading-message">იტვირთება...</div>';
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <a href="index.html" class="back-to-home-btn">მთავარ გვერდზე დაბრუნება</a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MovieDetailPage();
});

