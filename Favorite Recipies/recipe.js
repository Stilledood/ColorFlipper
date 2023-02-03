const searchBtn = document.getElementById("search");
const mealInfoElement = document.getElementById("meal-info")
const mealPopup = document.getElementById("meal-popup");
const closePopupBtn = document.getElementById('close-popup');
const searchBar = document.getElementById("search-term");
const favoriteContainer = document.getElementById("fav-meals");
const mealsEl = document.getElementById("meals");


fetchRandomMeal();
fetchFavMeals();


async function getMealById(id) {
     const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
     const responseData = await resp.json();
     const mealRecipe = responseData.meals[0];
    

     return mealRecipe;
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

function removeMealLS(mealId){
    const mealIds = getMealLS();
    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

async function fetchFavMeals() {
    favoriteContainer.innerHTML='';
    const mealIds = getMealLS();
    
    for (let i = 0;i<mealIds.length;i++){
        const mealId = mealIds[i];
        meal =await getMealById(mealId);
        console.log(meal);
        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement("li");
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        <span>${mealData.strMeal}</span>
        <button class="clear">
            <i class="fas fa-window-close"></i>
        </button>
    `;
    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click",() =>{
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.addEventListener("click",()=>{
        showMealInfo(mealData);
    });
    favoriteContainer.appendChild(favMeal);

}

function showMealInfo(mealData){
    mealInfoElement.innerHTML ="";
    const mealEl =document.createElement("div");
    const ingredients =[];
    for (let i = 1;i<20;i++){
        if (mealData["strIngredient"+i]){
            ingredients.push(
                `${mealData["strIngredient"+i]} - ${mealData["strMesure"+i]}`
                
            );
        }else{
            break;
        }
    }
    mealEl.innerHTML=`
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map((item)=>`<li>${item}</li>`).join("")}
        </ul>
    `;
    mealInfoElement.appendChild(mealEl);
    mealPopup.classList.remove('hidden');

}



searchBtn.addEventListener("click", async() => {
    mealsEl.innerHTML='';
    const search = searchBar.value;
    const meals = await getMealsBySearch(search);
    if (meals){
        meals.forEach((meal) =>{
            addMeal(meal);
        });
    }


});

closePopupBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
})

getMealsBySearch("Pizza");



