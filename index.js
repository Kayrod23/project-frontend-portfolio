const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api/games"
const platform = "?platform="

const article = document.querySelector("article");
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
            const articles2 =  document.querySelectorAll("article")
            for (let i=0; i<articles2.length; i++){ // removes articles on load
                articles2[i].style.display = "none";
            }
            const userInput = document.querySelector("input").value;
            getGamesByID(results, userInput);
            form.reset();
        })
    })
	.catch(err => console.error(err));


// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const userInput = document.querySelector("input").value;
//     getGamesByID(results, userInput);
//     form.reset();
// })

// function loadRecentGame(){ // fetches info from api
//     fetch(`${BASE_URL}`)
//     .then((response) => response.json())
//     .then((results) => {
//         createRecentGames(results);
//         // previousSearches(result, userInput);
//     })
//     .catch((error) => console.log(error));
//     }

function createRecentGames(results){
    for (let i=0; i<articles.length; i++){
        articles[i].style.backgroundImage = "url("+results[i].thumbnail+")";
        articles[i].addEventListener("click", (event) => {
            userInput = event.target
            // getGamesByID(results, userInput);
// takes you to another html page with more details on the game
            const p = document.createElement("p");
            p.innerHTML = "here"
            main.append(p)
            })
    }
}

function getGamesByID(results, userInput){ // finds games based on userinput and turns it into an article
    for(const result of results){
      if(result.title.toLowerCase().includes(userInput.toLowerCase()) || result.genre.toLowerCase().includes(userInput.toLowerCase())) {
        const article = document.createElement("article");
        article.style.backgroundImage = "url("+result.thumbnail+")";
        main.append(article)
      }
    }   
}
// loadRecentGame()