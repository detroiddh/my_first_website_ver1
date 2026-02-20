let sb_input = document.querySelector(".search-bar input");
let sb_button = document.querySelector(".search-bar button");

sb_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sb_button.click();
    }
});

sb_button.addEventListener("click" , find_name);

function find_name(){
    reset();
    var search_name = sb_input.value.toLowerCase();
    var anime_name = document.querySelectorAll(".anime")
    for (var i = 0 ; i < anime_name.length ; i++){
        if(!compare(anime_name[i].id , search_name)) {
            anime_name[i].className = "hidden"
        }
    }
}

function reset() {
    var anime_name = document.querySelectorAll(".hidden")
    for (var i = 0 ; i < anime_name.length ; i++){
        anime_name[i].className = "anime"
    }
}

function compare(anime_name, search_name) {
    for (var i = 0 ; i < search_name.length ; i++)
        if(anime_name[i] !== search_name[i]) {
            return 0;
        }
    return 1;
}
