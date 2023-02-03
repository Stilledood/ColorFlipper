const searchBtn = document.getElementById("search");
const mealInfoElement = document.getElementById("meal-info")
const mealPopup = document.getElementById("meal-popup");
const closePopupBtn = document.getElementById('close-popup');
const searchBar = document.getElementById("search-term");
const favoriteCOntainer = document.getElementById("fav-meals");
const mealsEl = document.getElementById("meals");


fetchRandomMeal();


async function getMealById(id) {
     const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
     const responseData = await resp.json();
     const meal = responseData.meals[0];
     return meal;
}

async function getMealsBySearch(name) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+name);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;

}

async function fetchRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const responseDate = await resp.json();
    const mealRecipe = responseDate.meals[0];
    addMeal(mealRecipe,true);
}

function addMeal(mealData,random=false){
    const meal = document.createElement("div");
    meal.classList.add("meal");
    meal.innerHTML =`
        <div class="meal-header">
            ${random ?`<span class="random">Random Recipe</span>`:""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class ="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    

    const favBtn = meal.querySelector(".meal-body .fav-btn");
    console.log(favBtn);
   
    favBtn.addEventListener("click",function() {
        if (favBtn.classList.contains('active')){
            removeMealLS(mealData.idMeal);
            favBtn.classList.remove('active');
        }else{
            addMealLS(mealData.idMeal);
            favBtn.classList.add('active')
        }
        fetchFavMeals();
    });

    meal.addEventListener('click',() =>{
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}
    
function addMealLS(mealId){
    const mealIds = getMealLS();
    localStorage.setItem("mealIds",JSON.stringify([...mealIds,mealId]));
}

function getMealLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? []:mealIds
}



closePopupBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
})

getMealsBySearch("Pizza");



