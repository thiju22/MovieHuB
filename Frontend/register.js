const registerBtn =
    document.getElementById("register-btn");

registerBtn.addEventListener("click", async () => {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:8080/auth/register",
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

        const message =
            await response.text();

        alert(message);

        if(response.ok){

            window.location.href =
                "login.html";
        }

    } catch(error){

        console.error(error);

        alert("Cannot connect to backend");
    }

});