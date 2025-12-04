import Movie from './classes/movie.js';
import MovieAPI from './classes/movieAPI.js';

const TMDb_API_KEY = "a841badc5b44e50328ea842b89f6c1be";
const apiSearchInput = document.getElementById('apiSearchInput');
const searchResultsContainer = document.getElementById('searchResultsContainer');

class MovieSearchUI {
    constructor(inputElement, containerElement, apiClient) {
        this.searchInput = inputElement;
        this.resultsContainer = containerElement;
        this.apiClient = apiClient;
        this.errorMessageElement = null;
        this.createErrorMessageElement();
    }

    createErrorMessageElement() {
        if (this.searchInput && this.searchInput.parentElement) {
            this.errorMessageElement = document.createElement('p');
            this.errorMessageElement.id = 'searchErrorMessage';
            this.errorMessageElement.style.color = 'red';
            this.errorMessageElement.style.marginTop = '5px';
            this.errorMessageElement.style.display = 'none';
            this.searchInput.parentElement.appendChild(this.errorMessageElement);
        }
    }

    containsRestrictedWord(query) {
        return /porn/i.test(query);
    }

    showRestrictedMessage() {
        if (this.errorMessageElement) {
            this.errorMessageElement.textContent = 'raebs serchav dzma';
            this.errorMessageElement.style.display = 'block';
        }
    }

    hideRestrictedMessage() {
        if (this.errorMessageElement) {
            this.errorMessageElement.style.display = 'none';
        }
    }

    showLoading() {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = '<p style="text-align: center; color: #ffd700;">იტვირთება შედეგები...</p>';
        }
    }

    showError(error) {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = `<p style="text-align: center; color: red;">❌ შეცდომა: ${error.message}</p>`;
        }
    }

    clearResults() {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = '';
        }
    }

    displayResults(movies) {
        this.clearResults();

        if (movies.length === 0) {
            this.resultsContainer.innerHTML = '<p style="text-align: center; color: #ccc;">მოცემული სათაურით ფილმი ვერ მოიძებნა.</p>';
            return;
        }

        const movieObjects = Movie.createMultipleFromAPI(movies);
        movieObjects.forEach(movie => {
            const card = movie.createSearchCard();
            this.resultsContainer.appendChild(card);
        });
    }

    async searchMovies(query) {
        if (!query || query.trim().length === 0) {
            this.clearResults();
            this.hideRestrictedMessage();
            return;
        }

        if (this.containsRestrictedWord(query)) {
            this.showRestrictedMessage();
            this.clearResults();
            return;
        }

        this.hideRestrictedMessage();
        this.showLoading();

        try {
            const data = await this.apiClient.searchMovies(query);
            this.displayResults(data.results);
        } catch (error) {
            console.error("API ძებნის შეცდომა:", error);
            this.showError(error);
        }
    }

    handleInput(event) {
        const query = event.target.value.trim();
        
        if (this.containsRestrictedWord(query)) {
            this.showRestrictedMessage();
            this.clearResults();
        } else {
            this.hideRestrictedMessage();
            this.searchMovies(query);
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            const query = event.target.value.trim();
            
            if (this.containsRestrictedWord(query)) {
                this.showRestrictedMessage();
                this.clearResults();
                event.preventDefault();
            } else {
                this.hideRestrictedMessage();
                this.searchMovies(query);
            }
        }
    }

    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleInput(e));
            this.searchInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (apiSearchInput && searchResultsContainer) {
        const movieAPI = new MovieAPI(TMDb_API_KEY);
        const movieSearchUI = new MovieSearchUI(apiSearchInput, searchResultsContainer, movieAPI);
        movieSearchUI.init();
    }
});