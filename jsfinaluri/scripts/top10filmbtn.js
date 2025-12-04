import Movie from './classes/movie.js';
import MovieAPI from './classes/movieAPI.js';

class TopMoviesLoader {
    constructor(buttonElement, containerElement, apiClient) {
        this.button = buttonElement;
        this.container = containerElement;
        this.apiClient = apiClient;
        this.isLoaded = false;
    }

    clearMovies() {
        this.container.innerHTML = '';
        this.isLoaded = false;
        this.updateButtonText();
    }

    setLoading(isLoading) {
        this.button.disabled = isLoading;
        this.button.textContent = isLoading ? "იტვირთება..." : "სიის გაქრობა";
    }

    updateButtonText() {
        this.button.textContent = this.isLoaded ? "სიის გაქრობა" : "ტოპ 10 ფილმის ნახვა";
    }

    displayMovies(movies) {
        this.container.innerHTML = '';
        const movieObjects = Movie.createMultipleFromAPI(movies);
        movieObjects.forEach(movie => {
            const card = movie.createTopMovieCard();
            this.container.appendChild(card);
        });
    }

    async loadTopMovies() {
        if (this.isLoaded) {
            this.clearMovies();
            return;
        }

        this.setLoading(true);

        try {
            const data = await this.apiClient.getTopRatedMovies();
            const top10Movies = data.results.slice(0, 10);
            this.displayMovies(top10Movies);
            this.isLoaded = true;
            this.updateButtonText();
        } catch (error) {
            console.error("დაფიქსირდა შეცდომა:", error);
            alert("ვერ მოხერხდა მონაცემების წამოღება. შეცდომა: " + error.message);
            this.button.textContent = "სცადეთ თავიდან";
        } finally {
            this.button.disabled = false;
        }
    }

    init() {
        if (this.button && this.container) {
            this.button.addEventListener('click', () => this.loadTopMovies());
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('loadBtn');
    const container = document.getElementById('moviesContainer');

    if (button && container) {
        const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODQxYmFkYzViNDRlNTAzMjhlYTg0MmI4OWY2YzFiZSIsIm5iZiI6MTc2NDA3NDM5NC41ODQsInN1YiI6IjY5MjVhMzlhZmU5MmRiYzlhN2VhOTliZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u1DVZMfps8BMH4__1OoWQOUxfTD0k-uFp7zdrLAzXGo";
        const movieAPI = new MovieAPI(null, accessToken);
        const topMoviesLoader = new TopMoviesLoader(button, container, movieAPI);
        topMoviesLoader.init();
    }
});