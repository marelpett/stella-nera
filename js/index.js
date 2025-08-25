import { fetchAllMealTitles } from "./menu.js";

let CATEGORIES = ['starters', 'mains', 'desserts']

function createMenuItem(title){
  
  // Skapar div-element
  let menu_item = document.createElement('div');
  menu_item.classList.add('menu-item');

  let price_item = document.createElement('div');
  price_item.classList.add('menu-price');

  // Skapar h4-element för titel och p-element pris
  let food_title = document.createElement('h4');
  food_title.innerText = title;

  let price = document.createElement('p');
  price.innerText = "135:-";

  // Lägger in food_title och price som barn till price_item
  price_item.appendChild(food_title);
  price_item.appendChild(price);

  // Lägger in price_item som barn till menu_item
  menu_item.appendChild(price_item);

  // Skapar p-element för beskrivning
  let description = document.createElement('p');
  description.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  menu_item.appendChild(description);

  return menu_item;
}

export async function renderFoodTitles(){
  // Anropar fetchAllMealTitles och sparar datan i menuData
  const menuData = await fetchAllMealTitles();
  let renderedTitles = 0;
  
  
  //console.log('Data:', menuData);

  // Loopar igenom varje kategori
  CATEGORIES.forEach(category => {
    let MENU_CATEGORY = document.querySelector(`#${category}`);

    // Hämta måltiderna för denna kategori
    const meals = menuData[category] || [];
    
    if(meals.length>0) {
    // Skapa och lägg till varje måltid
      meals.forEach(mealTitle => {
        let food_item = createMenuItem(mealTitle);
        MENU_CATEGORY.appendChild(food_item);
      });
      renderedTitles+=meals.lenght;
    }

    if(renderedTitles === 0){
      let mainMenu = document.querySelector("#main-menu");
      mainMenu.innerHTML = "<p>Menyn är för nuvarande inte tillgänglig.</p>"
    }

  });
}

renderFoodTitles();
