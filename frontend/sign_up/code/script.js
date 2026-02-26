let username_input = document.querySelector(".username-input");
let email_input = document.querySelector(".email-input");
let password_input = document.querySelector(".password-input");
let cf_password_input = document.querySelector(".confirm_password-input");
let sign_up_button = document.querySelector(".sign_up-button");

username_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sign_up_button.click();
    }
});

email_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sign_up_button.click();
    }
});

password_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sign_up_button.click();
    }
});

cf_password_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sign_up_button.click();
    }
});

sign_up_button.addEventListener("click" , sign_up);

async function sign_up() {
    try {
        // retrieve user credentials
        var username_val = username_input.value;
        var email_val = email_input.value;
        var password_val = password_input.value;
        var cf_password_val = cf_password_input.value;

        // check matching password
        if (cf_password_val !== password_val) {
            alert("sign_up failed: unmatched password");
            return;
        }

        // request sign_up
        const response = await fetch("http://127.0.0.1:8000/sign_up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_val,
                email: email_val,
                password: password_val
            })
        });

        // check sign_up failing
        if (!response.ok) {
            const errorData = await response.json();
            alert("sign_up failed: " + errorData.detail);
            return;
        }

        // success sign_up
        const data_sign_up = await response.json();
        console.log("sign_up success:", data_sign_up);

        alert("sign_up successful!");

        // automatic login
        login(username_val, password_val);
    } 
    catch (error) {
        // check network error
        console.error("Network error:", error);
    }
}

function go_to_home() {
    let logo = document.querySelector(".sign_up-logo");
    logo.click();
}

async function login(username_data, password_data) {
    const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username_data,
                password: password_data
            })
        });

    // check login failing
    if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: " + errorData.detail);
        return;
    }

    // success login
    const data_sign_in = await response.json();
    console.log("Login success:", data_sign_in);

    // store token
    localStorage.setItem("access_token", data_sign_in.access_token);
    localStorage.setItem("username", username_data);

    // go home
    go_to_home();
}