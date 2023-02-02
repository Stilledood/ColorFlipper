const searchBtn = document.getElementById("search");
const mealInfoElement = document.getElementById("meal-info")
const mealPopup = document.getElementById("meal-popup");
const closePopupBtn = document.getElementById('close-popup');

async function fetchRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const responseDate = await resp.json();
    const mealRecipe = responseDate.meals[0];
    console.log(mealRecipe);
    mealInfoElement.innerHTML = "";
    
    const ingredients = [];

    for (let i=1;i<20;i++){
        if (mealRecipe['strIngredient'+i]){
            ingredients.push(mealRecipe['strIngredient'+i])
        }
    }

    console.log(ingredients);
    const mealEl = document.createElement("div");
    mealEl.innerHTML = `
        <h1>${mealRecipe['strMeal']}</h1>`;
    mealInfoElement.appendChild(mealEl);
    mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click',fetchRandomMeal());
closePopupBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
})