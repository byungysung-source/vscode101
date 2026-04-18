document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeDescriptionInput = document.getElementById('recipe-description');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Sample recipes
    if (recipes.length === 0) {
        recipes = [
            { name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.' },
            { name: 'Chicken Stir-Fry', description: 'Quick and easy stir-fry with chicken, vegetables, and soy sauce.' },
            { name: 'Chocolate Chip Cookies', description: 'Chewy cookies loaded with chocolate chips and vanilla.' }
        ];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    function displayRecipes() {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            recipeList.appendChild(li);
        });
    }

    function addRecipe(name, description) {
        recipes.push({ name, description });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    function deleteRecipe(index) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = recipeNameInput.value.trim();
        const description = recipeDescriptionInput.value.trim();
        if (name && description) {
            addRecipe(name, description);
            recipeNameInput.value = '';
            recipeDescriptionInput.value = '';
        }
    });

    recipeList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteRecipe(index);
        }
    });

    displayRecipes();
});