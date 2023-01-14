const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api/games"
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c48005b3demshc585357590941dfp18ead2jsnba6e48e92bac',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

const innerP = document.querySelectorAll("p");
const a = document.querySelector("a")
const button = document.querySelector("button")

fetch(BASE_URL, options) // calls a fetch on website load to show images of games
    .then(response => response.json())
    .then((results) => {
        getGameInfo(results)
    })
    .catch(err => console.error(err));

let clickedArticle = sessionStorage.getItem("articleClicked");
const logo = document.querySelector("img");
logo.addEventListener("click", () => {
    location.replace("index.html");
})

const article = document.querySelector("article");
article.style.background = clickedArticle;

function getGameInfo(results) {
    for (let i = 0; i < innerP.length + 1; i++) {
        for (let k = 0; k < results.length; k++) {
            if (i === 0 && results[k].thumbnail === article.style.background.slice(5, 51) || i === 0 && results[k].thumbnail === article.style.background.slice(5, 50) || i === 0 && results[k].thumbnail === article.style.background.slice(5, 49)) {
                innerP[i].innerHTML = results[k].title
            } else if (i === 1 && results[k].title === innerP[0].innerHTML) {
                innerP[i].innerHTML = results[k].short_description
            } else if (i === 2 && results[k].title === innerP[0].innerHTML) {
                innerP[i].innerHTML = results[k].genre
            } else if (i === 3 && results[k].title === innerP[0].innerHTML) {
                innerP[i].innerHTML = results[k].platform
            } else if (i === 4 && results[k].title === innerP[0].innerHTML) {
                innerP[i].innerHTML = results[k].publisher
            } else if (i === 5 && results[k].title === innerP[0].innerHTML) {
                innerP[i].innerHTML = results[k].developer
            } else if (i === 6 && results[k].title === innerP[0].innerHTML) {
                innerP[i].innerHTML = results[k].release_date
            } else if (i === 7 && results[k].title === innerP[0].innerHTML) {
                a.setAttribute("href", results[k].game_url)
            }
        }
    }
}


button.addEventListener("click", () => {
    let favoriteGames = []

    //favoriteGames.push(innerP[0].innerHTML)
    localStorage.setItem("arr", JSON.stringify(favoriteGames))

    location.replace("index.html");
})


