const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api/games"

const articles = document.querySelectorAll("article");
const main = document.querySelector("main");
const form = document.querySelector("form"); 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c48005b3demshc585357590941dfp18ead2jsnba6e48e92bac',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

fetch(BASE_URL, options) // calls a fetch on website load to show images of games
	.then(response => response.json())
	.then((results) => {
        createRecentGames(results);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const articles2 =  document.querySelectorAll("article");
            for (let i=0; i<articles2.length; i++){ // removes articles on load
                articles2[i].style.display = "none";
            }
            const userInput = document.querySelector("input").value;
            getGamesBySearch(results, userInput);
            form.reset();
        })
    })
	.catch(err => console.error(err));

function createRecentGames(results){
    for (let i=0; i<articles.length; i++){
        articles[i].style.backgroundImage = "url("+results[i].thumbnail+")";
        articles[i].addEventListener("click", (event) => {
        sessionStorage.setItem("articleClicked", event.target.style.backgroundImage);
        location.replace("Game.html");
        })
    }
}

function getGamesBySearch(results, userInput){ // finds games based on userinput and turns it into an article
    for(const result of results){
      if(result.title.toLowerCase().includes(userInput.toLowerCase()) || result.genre.toLowerCase().includes(userInput.toLowerCase())) {
        const article = document.createElement("article");
        article.style.backgroundImage = "url("+result.thumbnail+")";
        article.addEventListener("click", (event) => {
            sessionStorage.setItem("articleClicked", event.target.style.backgroundImage);
            location.replace("Game.html");
        })
        main.append(article);
      }
    }   
}

const logo = document.querySelector("img");
logo.addEventListener("click", () => {
    location.replace("index.html");
})

if(localStorage.length > 0){
    let listOfFavGames = localStorage.getItem("string").split(",")
    for (let i=0; i<listOfFavGames.length; i++){
        // const a = document.createElement("a")
        const li = document.createElement("li");
        const ul = document.querySelector("aside ul");
        // li.append(a)
        ul.append(li)
        li.innerHTML = listOfFavGames[i]
        // a.setAttribute("href", ) = listOfFavGames[i]
    }
}

