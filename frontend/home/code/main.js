// insert username into the account

function reset_login() {
    document.querySelector(".topbar").style.display = "none";
    document.querySelector(".sign_in_up").style.display = "inline";
}

async function checkLogin() {
    reset_login();
    const token = localStorage.getItem("access_token");

    if (!token) {
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/user", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.ok) {
        const data = await response.json();

        document.getElementById("username").innerText = data.username;
        document.querySelector(".topbar").style.display = "flex";
        document.querySelector(".sign_in_up").style.display = "none";

    } else {
        localStorage.clear();
    }
}

checkLogin();

// log out
const userInfo = document.getElementById("user-info");
const dropdown = document.getElementById("dropdown");
const signOutBtn = document.getElementById("signOutBtn");

console.log(userInfo)

userInfo.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
});

document.addEventListener("click", () => {
    dropdown.classList.remove("show");
});

signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    window.location.reload();
});

// find anime

let sb_input = document.querySelector(".search-bar input");
let sb_button = document.querySelector(".search-bar button");

sb_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sb_button.click();
    }
});

sb_button.addEventListener("click" , find_name);

function find_name(){
    reset_anime();
    var search_name = sb_input.value.toLowerCase();
    var anime_name = document.querySelectorAll(".anime")
    for (var i = 0 ; i < anime_name.length ; i++){
        if(!compare(anime_name[i].id , search_name)) {
            anime_name[i].className = "hidden"
        }
    }
}

function reset_anime() {
    var anime_name = document.querySelectorAll(".hidden")
    for (var i = 0 ; i < anime_name.length ; i++){
        anime_name[i].className = "anime"
    }
}

function compare(anime_name, search_name) {
    if (anime_name.includes(search_name)) {
        return 1;
    }
    return 0;
}