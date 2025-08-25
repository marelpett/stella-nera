// Antal av varje rätt jag vill hämta
const starters = 3;
const mains = 5;
const desserts = 3;

// API:n har starters och desserts som kategorier men inte mains.
// Lagrar kategorier för mains för att hämta ut varmrätter.

const MAIN_CATEGORIES = ['Chicken', 'Pasta', 'Pork', 'Goat', 'Lamb'];

async function fetchByCategory(category){
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;

  } catch(error){
    console.error(error.message);
    return null;
  }
}

// Funktion för att hämta förrätter
async function fetchStarters() {
  const data = await fetchByCategory('Starter');
  if (data && data.meals) {

    // Tar de första 3 rätterna i listan
    return data.meals.slice(0, starters).map(meal => meal.strMeal);
  }
  return [];
}

// Funktion för att hämta desserter
async function fetchDesserts() {
  const data = await fetchByCategory('Dessert');
  if (data && data.meals) {
    return data.meals.slice(0, desserts).map(meal => meal.strMeal);
  }
  return [];
}

// Funktion för att hämta varmrätter från olika kategorier
async function fetchMains() {
  const allMains = [];
  
  for (const category of MAIN_CATEGORIES) {
    const data = await fetchByCategory(category);
    if (data && data.meals) {
      allMains.push(...data.meals);
    }
  }
  
  // Shufflar listan och tar ut önskat antal
  const shuffled = allMains.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, mains).map(meal => meal.strMeal);
}

// Huvudfunktion
export async function fetchAllMealTitles() {
  try {
    //console.log('Hämtar måltidstitlar...');
    
    const [starterTitles, mainTitles, dessertTitles] = await Promise.all([
      fetchStarters(),
      fetchMains(),
      fetchDesserts()
    ]);
    
    const menuData = {
      starters: starterTitles,
      mains: mainTitles,
      desserts: dessertTitles
    };
    
    //console.log('Hämtade måltidstitlar:', menuData);
    return menuData;
    
  } catch (error) {
    console.error('Errov vid hämtning:', error);
    return {
      starters: [],
      mains: [],
      desserts: []
    };
  }
}