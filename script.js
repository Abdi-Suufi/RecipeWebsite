const appId = "AppID-HERE"; // get app id from "https://developer.edamam.com/edamam-recipes-api"
const apiKey = "API-KEY-HERE"; // get api key from "https://developer.edamam.com/edamam-recipes-api"

async function searchRecipes() {
  const query = document.getElementById("query").value;
  const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.hits);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  recipes.forEach((recipeData) => {
    const recipe = recipeData.recipe;
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("col-md-4", "mb-4");

    recipeCard.innerHTML = `
            <div class="card recipe-card">
                <img src="${recipe.image}" class="card-img-top" alt="${
      recipe.label
    }">
                <div class="card-body">
                    <h5 class="card-title">${recipe.label}</h5>
                    <p class="card-text">Calories: ${Math.round(
                      recipe.calories
                    )}</p>
                    <a href="${
                      recipe.url
                    }" target="_blank" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;

    recipesContainer.appendChild(recipeCard);
  });
}
