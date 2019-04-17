console.log('script is running...')
const container = document.querySelector('#container');
const button = document.querySelector('.getFood');

foodFactory = (foodItem) => {
    return `
        <div class="food-item">
            <h2>${foodItem.name}</h2>
            
            <p>Ingredients: ${foodItem.ingredients}</p>
            <p>Country of Origin: ${foodItem.country}</p>
            <p>Calories per serving: ${foodItem.calories}</p>
            <p>Fat per serving: ${foodItem.fat}</p>
            <p>Sugar per serving: ${foodItem.sugar}</p>
        </div>`
}

addFoodToDom = (foodAsHTML) => {
    container.innerHTML += foodAsHTML;
}

function getData() {
    container.innerHTML = '';

    fetch("http://localhost:8088/food")
        .then(response => response.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {
                console.log(food.barcode)

                fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                    .then(response => response.json())
                    .then(productInfo => {
                        // console.log(productInfo.product.ingredients)
                        food.ingredients = productInfo.product.ingredients_text;
                        food.country = productInfo.product.countries;
                        food.calories = productInfo.product.nutriments.energy;
                        food.fat = productInfo.product.nutriments.fat_serving;
                        food.sugar = productInfo.product.nutriments.sugars_serving;

                        const foodAsHTML = foodFactory(food)
                        addFoodToDom(foodAsHTML);
                    })
            })
        })
}

button.addEventListener('click', () => {
    getData();
    // button.style="display:none";
});


