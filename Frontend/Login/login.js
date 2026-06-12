const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Quick frontend validation so we don't hit the network needlessly
    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch("https://moviehub-z5xt.onrender.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        // Handle error responses from the backend
        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText || "Invalid credentials");
            return;
        }

        // Read response safely
        const text = await response.text();
        let data = {};
        
        // Only parse if there is actually data returned
        if (text) {
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.warn("Response was not JSON, treating as plain text");
            }
        }

        // Save session items (Fallback to text token if backend sent plain text)
        const token = data.token || text; 
        
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            
            alert("Login Successful");
            // Redirects beautifully based on your folder structure
            window.location.href = "../MovieDashboard/movie.html";
        } else {
            alert("Login succeeded, but no authorization token was received.");
        }

    } catch (error) {
        console.error("Network or parsing error:", error);
        alert("Cannot connect to backend server. Please try again later.");
    }
});