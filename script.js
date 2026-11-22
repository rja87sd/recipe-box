// Week 5 Day 4 — Recipe Finder: show a few fields, and handle what goes wrong
// The recipes come from DummyJSON, a free practice API: https://dummyjson.com/docs/recipes
// Open index.html with Live Server, type a number, click the button.

const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function loadRecipe() {
  try {
    if (input.value === "") {
      statusText.textContent = "Please enter a number between 1 and 50.";
      return;
    }

    const url = `https://dummyjson.com/recipes/${input.value}`;

    recipeArea.textContent = ""; // clear the old recipe first

    // ---------- Step 2 goes here (loading message) ----------
    statusText.textContent = "Loading...";

    const response = await fetch(url);

    // ---------- Step 3 goes here (no recipe with that number) ----------
    if (!response.ok) {
      statusText.textContent =
        "No recipe with that number. Try entering a number between 1 and 50.";
      return;
    }

    const recipe = await response.json();
    console.log(recipe); // look at ALL the fields in the console, then pick a few
    statusText.textContent = "";

    // ---------- Step 1: show a few fields ----------
    // EXAMPLE: a card with the recipe's name. Same 4 moves as Week 4.
    const card = document.createElement("div");
    card.className = "card p-3";

    const title = document.createElement("h2");
    title.className = "h4";
    title.textContent = recipe.name;
    card.appendChild(title);

    recipeArea.appendChild(card);

    // YOUR TURN: add 2 more fields to the card, under the title. For example:
    //   a <p> with the cuisine:           "Cuisine: Italian"
    //   a <p> with the prep time:         "Ready in 20 minutes"   (recipe.prepTimeMinutes)
    // Each one: createElement, textContent, card.appendChild.
    const cuisine = document.createElement("h2");
    cuisine.className = "fs-3 h4";
    cuisine.textContent = `Cuisine: ${recipe.cuisine}`;
    card.appendChild(cuisine);

    const ready = document.createElement("h2");
    ready.className = "fs-3 h4";
    ready.textContent = `Ready in ${recipe.cookTimeMinutes} Minutes`;
    card.appendChild(ready);

    const recipeIngredients = document.createElement("h2");
    recipeIngredients.className = "fs-2";
    recipeIngredients.textContent = "Recipe Ingredients";
    card.appendChild(recipeIngredients);

    const list = document.createElement("ul");
    const ingredients = recipe.ingredients;
    ingredients.forEach(function (ingredient) {
      const item = document.createElement("li");
      item.textContent = ingredient;
      list.appendChild(item);
    });

    card.appendChild(list);

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.className = "img-fluid mb-2 rounded-2";
    card.prepend(img);

    recipeArea.appendChild(card);
  } catch (error) {
    statusText.textContent =
      "Server cannot be reached. Check Internet connection.";
  }

  input.value = "";
}

button.addEventListener("click", loadRecipe);

const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function addDish() {
  savedArea.textContent = "";
  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dishInput.value }),
  });

  const newDish = await response.json();
  console.log(newDish);

  const message = document.createElement("p");
  message.className = "alert alert-success";
  message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
  savedArea.appendChild(message);
  dishInput.value = "";
}

postButton.addEventListener("click", addDish);
