const editBtn = document.getElementById("edit-profile");
const profileName = document.getElementById("profile-name");
const profileAvatar = document.getElementById("profile-avatar");
const avatarOptions = document.querySelectorAll(".avatar-option");

// Load saved username
const savedName = localStorage.getItem("username");
if (savedName) {
    profileName.textContent = savedName;
}

// Load saved avatar path
const savedAvatar = localStorage.getItem("profileAvatar");
if (savedAvatar) {
    profileAvatar.src = savedAvatar;
}

// Name change edit prompt interaction
editBtn.addEventListener("click", () => {
    const newName = prompt("Enter your name:");
    if (newName && newName.trim() !== "") {
        profileName.textContent = newName;
        localStorage.setItem("username", newName);
    }
});

// Grid avatar custom collection choices selection loop
avatarOptions.forEach(avatar => {
    avatar.addEventListener("click", () => {
        avatarOptions.forEach(a => a.classList.remove("selected"));
        avatar.classList.add("selected");
        
        profileAvatar.src = avatar.src;
        localStorage.setItem("profileAvatar", avatar.src);
    });
});

const watchlistMovies = document.getElementById("watchlist-movies");
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVkYmRiYmNjODU5OTUyZGUzZDY3NDY5NjJlMzg1MyIsIm5iZiI6MTc4MDU2NTQxNi41NTIsInN1YiI6IjZhMjE0NWE4YjliNDk1MDhhYmQ0MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnOfB5QvWWRainss92hI7mChAgZF2D46bWEKjXjcln8"
    }
};

if (watchlist.length === 0) {
    watchlistMovies.innerHTML = "<p>No movies in watchlist</p>";
} else {
    Promise.all(
        watchlist.map(id =>
            fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, OPTIONS)
                .then(res => res.json())
        )
    )
    .then(movies => {
        watchlistMovies.innerHTML = movies.map(movie => {
            // FIXED: Added a protective fallback check for null poster images
            const poster = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster+Available';

            return `
                <div class="watchlist-card">
                    <img src="${poster}" alt="${movie.title || 'Movie Poster'}">
                    <div class="watchlist-info">
                        <h4>${movie.title}</h4>
                    </div>
                </div>
            `;
        }).join("");
    })
    .catch(error => {
        console.error("Watchlist loading error:", error);
        watchlistMovies.innerHTML = "<p>Failed to load watchlist details.</p>";
    });
}

const recentTrailers = JSON.parse(localStorage.getItem("recentTrailers")) || [];
const recentContainer = document.getElementById("recent-trailers");

if (recentTrailers.length === 0) {
    recentContainer.innerHTML = "<p>No trailers watched yet</p>";
} else {
    recentContainer.innerHTML = recentTrailers.map(movie => `
        <div class="watchlist-card">
            <img src="${movie.poster}" alt="Trailer Poster">
            <div class="watchlist-info">
                <h4>${movie.id}</h4>
                <a href="${movie.trailer}" target="_blank" class="watch-again-btn">
                    ▶ Watch Again
                </a>
            </div>
        </div>
    `).join("");
}