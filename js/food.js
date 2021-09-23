const foods = items => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
        .then(res => res.json())
        .then(data => displayFoods(data.meals))
}


const displayFoods = items => {
    // console.log(items)
    const foodItems = document.getElementById('food-items')
    foodItems.textContent = '';

    for (const item of items) { 
        // console.log(item);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card text-center h-100">
            <img src="${item.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title text-">${item.strMeal}</h4>
              <p class="card-text bg-secondary text-white">Origin: ${item.strArea}, Category: ${item.strCategory}</p>
              <p class="card-text">${item.strInstructions.slice(0, 150)}</p>
              <a href="#" class="btn btn-secondary text-light">Buy Now</a>

              
              <button id="detail-btn" onclick="mealDetail(${item.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Product Detail
              </button>
              
            </div>
          </div>
        ` 
        foodItems.appendChild(div);

        // console.log(item);
    }
}


foods()


document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    // console.log(searchValue);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(res => res.json())
        .then(data => displayFoods(data.meals))
    searchInput.value = '';
})


const mealDetail = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        // console.log(mealId)
        .then(res => res.json())
        .then(data => singleItem(data.meals))
}

const singleItem = item => {
    // console.log(item[0]);
    const singleFood = document.getElementById('single-food');
    singleFood.textContent = '';
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
            <div class="modal-header">
                    <h3 class="modal-title" id="staticBackdropLabel">${item[0].strMeal}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <img src="${item[0].strMealThumb}" class="card-img-top" alt="...">
                ${item[0].strInstructions}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
            </div>
    `
    singleFood.appendChild(div);
}





