
const APIURL = "https://api.themoviedb.org/3/trending/movie/week?api_key=375c8c121cf7604f1952ab083309ea24"
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=375c8c121cf7604f1952ab083309ea24&query="
const formElem = document.getElementById("form");
const searchEl = document.getElementById("search");
const main = document.getElementById("main");


getMovies(APIURL);
async function getMovies(url){
    const resp =await fetch(url);
    const responseData = await resp.json();
    const movies = responseData.results;
    showMovies(movies);
   
   
    
}

function showMovies(moviesElem){
    main.innerHTML =''
    moviesElem.forEach((movie) =>{
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML =`
            <img src="${IMGPATH+movie.poster_path}" alt="${movie.original_title}" />
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${movie.overview}
            </div
        `;
    main.appendChild(movieEl);}
    );
}



function getClassByRate(rating){
    if (rating >=8 ){
        return 'green';
    }else if (rating <8 || rating >=6 ){
        return 'orange'
    }else{
        return 'red'
    }
}

formElem.addEventListener('submit',(e) =>{
    e.preventDefault();

    const searchTest = searchEl.value;
    console.log(searchTest);
    if (searchTest){
        getMovies(SEARCHAPI+searchTest);
        searchEl.value = '';
    }
    
})

