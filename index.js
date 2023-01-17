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
        createStartingGames(results);
        form.addEventListener("submit", (event) => { // 
            event.preventDefault();
            const removeArticles =  document.querySelectorAll("article");
            for (let i=0; i<removeArticles.length; i++){ // removes articles on search
                removeArticles[i].style.display = "none";
            }
            const userInput = document.querySelector("input").value;
            getGamesBySearch(results, userInput);
            form.reset();
        })
    })
	.catch(err => console.error(err));

function createStartingGames(results){ // 
    for (let i=0; i<articles.length; i++){
        articles[i].style.backgroundImage = "url("+results[i].thumbnail+")";
        articles[i].addEventListener("click", (event) => {
        sessionStorage.setItem("articleClicked", event.target.style.backgroundImage);
        location.replace("Game.html");
        })
    }
}

function getGamesBySearch(results, userInput){ // finds games based on userinput and turns it into an article
    let searchUpdater = false;
    for(const result of results){
      if(result.title.toLowerCase().includes(userInput.toLowerCase()) || result.genre.toLowerCase().includes(userInput.toLowerCase())) {
        const article = document.createElement("article");
        article.style.backgroundImage = "url("+result.thumbnail+")";
        article.addEventListener("click", (event) => {
            sessionStorage.setItem("articleClicked", event.target.style.backgroundImage);
            location.replace("Game.html");
        })
        searchUpdater = true;
        main.append(article);
      }
    }   
    searchFail(searchUpdater);
}

const logo = document.querySelector("img"); // When logo is clicked it takes you index.html
logo.addEventListener("click", () => {
    location.replace("index.html");
})

if(localStorage.length > 0){ // Creates a list of the games you have favorited
    let listOfFavGames = localStorage.getItem("string").split(",")
    for (let i=0; i<listOfFavGames.length; i++){
        const li = document.createElement("li");
        const ul = document.querySelector("aside ul");
        ul.append(li)
        li.innerHTML = listOfFavGames[i]
    }
}

const h1 = document.createElement("h1");
function searchFail(searchUpdater){ // Checks if the searchUpadter was updated and runs an error message to the screen
    if(!searchUpdater){
        console.log("404 🥲 Nothing Here")
        h1.innerHTML = "404 🥲 Nothing Here"
        main.append(h1)
    }
}

const aboutThisProject = document.querySelector(".info")
aboutThisProject.addEventListener("click", () => {
    location.replace("aboutThisProject.html")
})