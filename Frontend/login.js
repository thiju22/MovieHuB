const loginBtn =document.getElementById("login-btn");

loginBtn.addEventListener("click", async () => {
  const email =document.getElementById("email").value;
  const password =document.getElementById("password").value;
  try {
    const response = await fetch(
            "http://localhost:8080/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if (!response.ok) {

            const errorText =await response.text();

            alert(errorText);

            return;
        }

        const data =await response.json();

        localStorage.setItem(
            "token",
            data.token
        );
        localStorage.setItem(
    "email",
    email
);

        alert("Login Successful");
        window.location.href ="movie.html";
    } 
    catch (error) {
        console.error(error);

        alert(
            "Cannot connect to backend"
        );
    }

});