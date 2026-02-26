let username_input = document.querySelector(".username-input");
let password_input = document.querySelector(".password-input");
let sign_in_button = document.querySelector(".sign_in-button");

username_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sign_in_button.click();
    }
});

password_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sign_in_button.click();
    }
});

sign_in_button.addEventListener("click" , login);

async function login() {
    try {
        // retrieve user credentials
        var username_val = username_input.value;
        var password_val = password_input.value;

        // request login
        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_val,
                password: password_val
            })
        });

        // check login failing
        if (!response.ok) {
            const errorData = await response.json();
            alert("Login failed: " + errorData.detail);
            return;
        }

        // success login
        const data = await response.json();
        console.log("Login success:", data);

        // store token
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", username_val);

        alert("Login successful!");

        go_to_home();
    } 
    catch (error) {
        // check network error
        console.error("Network error:", error);
    }
}

function go_to_home() {
    let logo = document.querySelector(".login-logo");
    logo.click();
}