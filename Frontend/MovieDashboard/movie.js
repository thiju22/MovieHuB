const moviesContainer = document.getElementById("movies");
const sectionTitle = document.getElementById("section-title");
const logo = document.getElementById("logo");
const genreButtons = document.querySelectorAll(".genre-btn");
const genresContainer = document.getElementById("genres");
const trendingNav = document.getElementById("trending-nav");
const moviesNav = document.getElementById("movies-nav");
const tvNav = document.getElementById("tv-nav");
const moviePopup = document.getElementById("movie-popup");
const popupPoster = document.getElementById("popup-poster");
const popupTitle = document.getElementById("popup-title");
const popupTagline = document.getElementById("popup-tagline");
const popupRating = document.getElementById("popup-rating");
const popupOverview = document.getElementById("popup-overview");
const closePopup = document.getElementById("close-popup");
const popupCast = document.getElementById("popup-cast");
const watchTrailerBtn = document.getElementById("watch-trailer-btn");
const favoritesNav = document.getElementById("favorites-nav");
const watchlistNav = document.getElementById("watchlist-nav");
const backBtn = document.getElementById("back-btn");
const bannerImage =document.getElementById("banner-image");
const bannerTitle = document.getElementById("banner-title");
const bannerRating =document.getElementById("banner-rating");
const heroBanner =document.getElementById("hero-banner");
let bannerMovies = [];
let currentBanner = 0;
let trailerUrl = "";
let favorites =JSON.parse(localStorage.getItem("favorites")) || [];
let watchlist =
JSON.parse(localStorage.getItem("watchlist")) || [];
const loginBtn = document.getElementById("login-btn");
const token = localStorage.getItem("token");
const providersList =document.getElementById("providers-list");
const newsNav =
    document.getElementById("news-nav");

const newsContainer =
    document.getElementById("news-container");

if(token){
    loginBtn.textContent = "Logout";
}else{
    loginBtn.textContent = "Login";
}
        // Your provided token configuration
        const OPTIONS = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVkYmRiYmNjODU5OTUyZGUzZDY3NDY5NjJlMzg1MyIsIm5iZiI6MTc4MDU2NTQxNi41NTIsInN1YiI6IjZhMjE0NWE4YjliNDk1MDhhYmQ0MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnOfB5QvWWRainss92hI7mChAgZF2D46bWEKjXjcln8"
            }
        };

        // TMDB Endpoint URLs
        const TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
        const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?language=en-US&query=";
        const DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=";
        const MOVIES_URL ="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        const TV_URL ="https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
        const MOVIE_DETAILS_URL ="https://api.themoviedb.org/3/movie/";
        const MOVIE_CREDITS_URL ="https://api.themoviedb.org/3/movie/";
        const MOVIE_VIDEOS_URL ="https://api.themoviedb.org/3/movie/";
        const NEWS_URL ="https://gnews.io/api/v4/search?q=movies&lang=en&max=10&apikey=32edbdbbcc859952de3d6746962e3853";

        // Fetch movies from API
    function fetchMovies(url) {
            moviesContainer.innerHTML = "<p>Loading movies...</p>";
            
            fetch(url, OPTIONS)
                .then(response => response.json())
                .then(data => {
                    bannerMovies = data.results.slice(0, 5);
                    if (!data.results || data.results.length === 0) {
                        moviesContainer.innerHTML = "<p>No movies found matching your criteria.</p>";
                        return;
                    }
                   if(data.results.length > 0){
                    updateBanner(
                        bannerMovies[0]);} 

                    renderMovies(data.results);})
                .catch(error => {
                    console.error("API Fetch Error:", error);
                    moviesContainer.innerHTML = "<p>Failed to load data. Please verify your connection.</p>";
                });
        }
function updateBanner(movie){

    bannerImage.style.opacity = 0;

    setTimeout(() => {

        bannerImage.src =
            `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

        bannerTitle.textContent =
            movie.title || movie.name;

        bannerRating.textContent =
            `⭐ ${movie.vote_average.toFixed(1)}`;

        bannerImage.style.opacity = 1;

    }, 400);
}
function showSavedMovies(movieIds, title) {
    backBtn.style.display = "block";
    sectionTitle.textContent = title;

    genresContainer.style.display = "none";
    

    if(movieIds.length === 0){
        moviesContainer.innerHTML =
            "<h2>No movies saved</h2>";
        return;
    }

    Promise.all(
        movieIds.map(id =>
            fetch(
                `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                OPTIONS
            ).then(res => res.json())
        )
    )
    
   .then(movies => {

    const validMovies = movies.filter(
        movie => movie && movie.id
    );

    renderMovies(validMovies);

});
}

        // Render movie list cleanly to the screen
function renderMovies(movies) {
            moviesContainer.innerHTML = movies.map(movie => {
                const poster = movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                    : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
                
                const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
                const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Unknown';
                const isFavorite =favorites.includes(String(movie.id));
                const isWatchlist = watchlist.includes(String(movie.id));

                return `
                      <div class="movie-card"
                           data-id="${movie.id}"
                           data-title="${movie.title || movie.name}"
                           data-release="${movie.release_date || movie.first_air_date || ''}"
                           data-rating="${rating}"
                           data-overview="${movie.overview}"
                           data-poster="${poster}">
                        <div class="card-actions">
                         <button class="watchlist-btn ${isWatchlist ? 'active' : ''}">
                            <i class="far fa-bookmark"></i>
                          </button>
                          <button class="favorite-btn ${isFavorite ? 'active' : ''}">
                         <i class="fas fa-heart"></i>
                          </button>
                        </div>

                    <img src="${poster}" alt="${movie.title}" loading="lazy">

                        <div class="movie-info">
                            <h3 title="${movie.title}">${movie.title}</h3>
                            <div class="meta-data">
                                <span class="rating">⭐ ${rating}</span>
                                <span>${releaseYear}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
document.querySelectorAll(".movie-card").forEach(card => {

    card.addEventListener("click", (e) => {

        if (
            e.target.closest(".favorite-btn") ||
            e.target.closest(".watchlist-btn")
        ) {
            return;
        }

        popupPoster.src = card.dataset.poster;

        // rest of your code...
        popupPoster.src = card.dataset.poster;
        const year = card.dataset.release
    ? card.dataset.release.split("-")[0]
    : "Unknown";

        popupTitle.textContent =
            `${card.dataset.title} (${year})`;
            popupRating.textContent = `⭐ ${card.dataset.rating}`;
            popupOverview.textContent = card.dataset.overview;
            fetch(`${"https://api.themoviedb.org/3/movie/"}${card.dataset.id}?language=en-US`, OPTIONS)
    .then(response => response.json())
    .then(data => {

        popupTagline.textContent =
            data.tagline || "No tagline available";
            fetch(
    `https://api.themoviedb.org/3/movie/${card.dataset.id}/watch/providers`,
    OPTIONS
)
.then(response => response.json())
.then(providerData => {

    const providers =
        providerData.results?.IN?.flatrate || [];

    if(providers.length > 0){

      const providerLinks = {
    "Amazon Prime Video": "https://www.primevideo.com",
    "Amazon Prime Video with Ads": "https://www.primevideo.com",
    "Netflix": "https://www.netflix.com",
    "JioHotstar": "https://www.hotstar.com",
    "Apple TV": "https://tv.apple.com",
    "Sony LIV": "https://www.sonyliv.com",
    "ZEE5": "https://www.zee5.com"
};

providersList.innerHTML =
    providers.map(provider => `
        <a
            href="${providerLinks[provider.provider_name] || '#'}"
            target="_blank"
            class="provider"
        >
            <img
                src="https://image.tmdb.org/t/p/w92${provider.logo_path}"
                alt="${provider.provider_name}"
                title="${provider.provider_name}"
            >
            <span>${provider.provider_name}</span>
        </a>
    `).join('');
    } else {

providersList.innerHTML =
    "<p>Currently unavailable in India 🇮🇳</p>";
    }
});
            fetch(`${MOVIE_VIDEOS_URL}${card.dataset.id}/videos?language=en-US`, OPTIONS)
    .then(response => response.json())
    .then(videoData => {

        const trailer = videoData.results.find(
            video =>
                video.type === "Trailer" &&
                video.site === "YouTube"
        );

        if (trailer) {
            trailerUrl =
                `https://www.youtube.com/watch?v=${trailer.key}`;
        } else {
            trailerUrl = "";
        }

    });

             fetch(`${MOVIE_CREDITS_URL}${card.dataset.id}/credits`, OPTIONS)
        .then(response => response.json())
        .then(castData => {

            popupCast.innerHTML = castData.cast
    .slice(0, 6)
    .map(actor => {

        const photo = actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : 'https://via.placeholder.com/120x180?text=No+Photo';

        return `
            <div class="cast-member">
                <img src="${photo}" alt="${actor.name}">
                <span>${actor.name}</span>
            </div>
        `;
    })
    .join('');

        });

    })
    .catch(error => {
        console.error(error);
        popupTagline.textContent = "";
    });

        moviePopup.style.display = "flex";
    });

});
        }


   

        // Logic for Genre Filter Selection
        genreButtons.forEach(button => {
            button.addEventListener("click", () => {
                console.log(button.textContent);
                clearGenreSelection();
                
                button.classList.add("active");
                const genreId = button.getAttribute("data-id");

                if (genreId === "all") {
                    resetToTrending();
                } else {
                    sectionTitle.textContent = `${button.textContent} Movies`;
                    fetchMovies(`${DISCOVER_URL}${genreId}`);
                }
            });
        });

        // Helper functions to manage active states
function clearGenreSelection() {
            genreButtons.forEach(btn => btn.classList.remove("active"));
        }

function resetToTrending() {

    genresContainer.style.display = "none";

    sectionTitle.textContent = "TRENDING TODAY";

    fetchMovies(TRENDING_URL);

    document.querySelectorAll(".nav-item")
        .forEach(item => item.classList.remove("active"));

    trendingNav.classList.add("active");
}

        // Logo Click Actions
        logo.addEventListener("click", () => {
            searchInput.value = "";
            clearGenreSelection();
            resetToTrending();
        });

        // Run app on page startup
        resetToTrending();

moviesNav.addEventListener("click", () => {

    genresContainer.style.display = "flex";

    sectionTitle.textContent = "DISCOVER MOVIES";

    document.querySelectorAll(".nav-item")
        .forEach(item => item.classList.remove("active"));

    fetchMovies("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1");

    moviesNav.classList.add("active");
});


tvNav.addEventListener("click", () => {

    genresContainer.style.display = "flex";

    sectionTitle.textContent = "DISCOVER TV SERIES";

    document.querySelectorAll(".nav-item")
        .forEach(item => item.classList.remove("active"));
        fetchMovies("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1");

    tvNav.classList.add("active");
});


trendingNav.addEventListener("click", () => {
    resetToTrending();
});

const searchNav = document.getElementById("search-nav");
const searchPopup = document.getElementById("search-popup");
const popupSearch = document.getElementById("popup-search");
const closeSearch = document.getElementById("close-search");

searchNav.addEventListener("click", () => {
    searchPopup.style.display = "flex";
    popupSearch.focus();
});

closeSearch.addEventListener("click", () => {
    searchPopup.style.display = "none";
});

popupSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {

        const query = popupSearch.value.trim();

        if(query){
            sectionTitle.textContent = `Search Results for "${query}"`;

            fetchMovies(
                `${SEARCH_URL}${encodeURIComponent(query)}`
            );

            searchPopup.style.display = "none";
        }
    }
});
closePopup.addEventListener("click", () => {
    moviePopup.style.display = "none";
});
watchTrailerBtn.addEventListener("click", () => {

    if (trailerUrl) {

        let recentTrailers =
            JSON.parse(localStorage.getItem("recentTrailers")) || [];

        const movieData = {
            id: popupTitle.textContent,
            poster: popupPoster.src,
            trailer: trailerUrl
        };

        recentTrailers = recentTrailers.filter(
            movie => movie.id !== movieData.id
        );

        recentTrailers.unshift(movieData);

        recentTrailers = recentTrailers.slice(0, 10);

        localStorage.setItem(
            "recentTrailers",
            JSON.stringify(recentTrailers)
        );

        window.open(trailerUrl, "_blank");

    } else {
        alert("Trailer not available");
    }

});
document.addEventListener("click", (e) => {

    const favoriteBtn = e.target.closest(".favorite-btn");

    if (favoriteBtn) {
         const token = localStorage.getItem("token");

    if(!token){
        alert("Please Login First");
        window.location.href = "login.html";
        return;
    }

        e.preventDefault();
        e.stopPropagation();

        const movieCard = favoriteBtn.closest(".movie-card");
        const movieId = movieCard.dataset.id;

favoriteBtn.classList.toggle("active");

if (favoriteBtn.classList.contains("active")) {

    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        const email =
    localStorage.getItem("email");

fetch(
    "http://localhost:8080/favorites/add",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            movieId: Number(movieId)
        })
    }
);
    }

} else {

    favorites = favorites.filter(id => id !== movieId);

}

localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
);

        return;
    }

});

document.addEventListener("click", (e) => {

    const watchlistBtn = e.target.closest(".watchlist-btn");

    if (watchlistBtn) {

        e.preventDefault();
        e.stopPropagation();

        const movieCard = watchlistBtn.closest(".movie-card");
const movieId = movieCard.dataset.id;

watchlistBtn.classList.toggle("active");

if (watchlistBtn.classList.contains("active")) {

    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
    }

} else {

    watchlist = watchlist.filter(id => id !== movieId);

}

localStorage.setItem(
    "watchlist",
    JSON.stringify(watchlist)
);

        return;
    }

});
favoritesNav.addEventListener("click", () => {
    heroBanner.style.display = "none";
    backBtn.style.display = "block";

    document
        .querySelectorAll(".top-icons i")
        .forEach(icon => icon.classList.remove("active"));

    favoritesNav.classList.add("active");

    showSavedMovies(
        favorites,
        "FAVORITES"
    );
});
watchlistNav.addEventListener("click", () => {
    heroBanner.style.display = "none";
    backBtn.style.display = "block";

    document
        .querySelectorAll(".top-icons i")
        .forEach(icon => icon.classList.remove("active"));

    watchlistNav.classList.add("active");

    showSavedMovies(
        watchlist,
        "watchlist"
    );
});
backBtn.addEventListener("click", () => {
    newsContainer.style.display = "none";

    moviesContainer.style.display = "grid";

    heroBanner.style.display = "block";

    backBtn.style.display = "none";

    document
        .querySelectorAll(".top-icons i")
        .forEach(icon => icon.classList.remove("active"));

    resetToTrending();
});

const navAvatar =
    document.getElementById("nav-avatar");

const savedAvatar =
    localStorage.getItem("profileAvatar");

if(savedAvatar){

    navAvatar.src = savedAvatar;

}
navAvatar.addEventListener("click", () => {

    window.location.href = "profile.html";

});
setInterval(() => {

    if(bannerMovies.length === 0) return;

    currentBanner++;

    if(currentBanner >= bannerMovies.length){
        currentBanner = 0;
    }

    updateBanner(
        bannerMovies[currentBanner]
    );

}, 5000);
loginBtn.addEventListener("click", () => {

    const token = localStorage.getItem("token");

    if(token){

        localStorage.removeItem("token");

        alert("Logged Out Successfully");

        window.location.href = "login.html";

    }else{

        window.location.href = "login.html";
    }

});
function fetchNews() {

    newsContainer.style.display = "grid";
    moviesContainer.style.display = "none";

    fetch(NEWS_URL)
        .then(response => response.json())
        .then(data => {

            newsContainer.innerHTML =
                data.articles.map(article => `

                <div class="news-card">

                    <img
                        src="${article.image}"
                        alt="news">

                    <h3>${article.title}</h3>

                    <p>${article.description}</p>

                    <a
                       href="${article.url}"
                       target="_blank">

                       Read More
                    </a>

                </div>

            `).join('');
        });
}
newsNav.addEventListener("click", () => {

    heroBanner.style.display = "none";

    backBtn.style.display = "block";

    sectionTitle.textContent =
        "ENTERTAINMENT NEWS";

    fetchNews();
});


