export default class MovieAPI {
    constructor(apiKey = null, accessToken = null) {
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.apiKey = apiKey;
        this.accessToken = accessToken;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json;charset=utf-8',
            ...options.headers
        };

        if (this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`კავშირის შეცდომა: ${response.status}. გთხოვთ შეამოწმოთ API Key.`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async searchMovies(query) {
        const endpoint = `/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
        return this.request(endpoint, { method: 'GET' });
    }

    async getTopRatedMovies() {
        const endpoint = '/movie/top_rated?language=en-US&page=1';
        return this.request(endpoint, { method: 'GET' });
    }

    async getMovieDetails(movieId) {
        const endpoint = `/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
        return this.request(endpoint, { method: 'GET' });
    }
}

