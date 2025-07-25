function toggleMenu() {
  const menu = document.getElementById('dropdownMenu');
  if (menu) menu.classList.toggle('hidden');
}

if (document.getElementById('recipeForm')) {
  document.getElementById('recipeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const ingredients = document.getElementById('ingredients').value.trim();
    const method = document.getElementById('method').value.trim();
    const category = document.getElementById('category').value;
    const photoInput = document.getElementById('photo');
    const reader = new FileReader();

    reader.onload = function () {
      const photo = reader.result || '';
      const recipe = { name, ingredients, method, category, photo };

      let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));

      window.location.href = 'index.html';
    };

    if (photoInput.files[0]) {
      reader.readAsDataURL(photoInput.files[0]);
    } else {
      reader.onload();
    }
  });
}

if (document.getElementById('recipeList')) {
  const list = document.getElementById('recipeList');
  let allRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');

  function display(recipesToShow) {
    list.innerHTML = '';
    if (recipesToShow.length === 0) {
      list.innerHTML = "<p>No recipes found in this category.</p>";
      return;
    }

    recipesToShow.forEach(recipe => {
      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Category:</strong> ${recipe.category}</p>
        ${recipe.photo ? `<img src="${recipe.photo}" alt="${recipe.name}" />` : ''}
        <p><strong>Ingredients:</strong><br>${recipe.ingredients.replace(/\n/g, "<br>")}</p>
        <p><strong>Method:</strong><br>${recipe.method.replace(/\n/g, "<br>")}</p>
      `;
      list.appendChild(div);
    });
  }

  display(allRecipes);

  window.filterCategory = function (category) {
    if (category === 'all') {
      display(allRecipes);
    } else {
      const filtered = allRecipes.filter(r => r.category === category);
      display(filtered);
    }
  };
}
