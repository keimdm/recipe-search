// DEPENDENCIES
var cocktailList = $("#cocktail-list");
var searchInput = $("#ing-search");
var searchButEl = $("#search");
var todayCocktail = $("#today-cocktail");
var addIngredientButton = $("#add-ingredient");
var ingredient;
var displayList = $("#display-list");
var dialog = $("#dialog");

// DATA
// add NYC latitude and longitude
var ingredientList = [];
var tempWord;
var latNYC = "40.7129";
var lonNYC = "-74.0060";
var hotIngredients = [
  "mint",
  "lime",
  "lemon",
  "orange",
  "coconut",
  "pineapple",
  "watermelon",
  "mango",
  "cucumber",
  "grapefruit",
];
var coldIngredients = [
  "chocolate",
  "maple",
  "cranberry",
  "coffee",
  "honey",
  "port",
  "cream",
  "apple",
  "pear",
];
var springIngredients = [
  "strawberry",
  "lemon",
  "lime",
  "pineapple",
  "cherries",
  "peach",
  "kiwi",
  "oranges",
  "apricot",
  "melon",
];
var summerIngredients = [
  "bananas",
  "blackberries",
  "blueberries",
  "raspberries",
  "tomato",
  "watermelon",
  "lemon",
  "lime",
  "mango",
];
var fallIngredients = ["apple", "cider", "caramel", "cinnamon", "ginger"];
var winterIngredients = [
  "pear",
  "orange",
  "cream",
  "lemon",
  "pomegranate",
  "port",
];
var commonIngredientsDict = [
  ["pear", 1],
  ["orange", 2],
  ["cream", 1],
  ["lemon", 2],
  ["port", 1],
  ["banana", 3],
  ["blackberries", 3],
  ["blackberry", 3],
  ["blueberries", 3],
  ["blueberry", 3],
  ["raspberries", 3],
  ["raspberry", 3],
  ["tomato", 3],
  ["lemon", 2],
  ["lime", 1],
  ["mango", 2],
  ["apple", 2],
  ["cider", 2],
  ["caramel", 3],
  ["cinnamon", 3],
  ["ginger", 2],
  ["strawberry", 3],
  ["lemon", 2],
  ["lime", 1],
  ["pineapple", 3],
  ["cherries", 2],
  ["cherry", 2],
  ["peach", 1],
  ["kiwi", 2],
  ["oranges", 3],
  ["apricot", 3],
  ["melon", 2],
  ["mint", 1],
  ["lime", 1],
  ["lemon", 2],
  ["orange", 2],
  ["coconut", 3],
  ["pineapple", 3],
  ["mango", 2],
  ["cucumber", 3],
  ["grapefruit", 2],
  ["chocolate", 3],
  ["maple", 2],
  ["cranberry", 3],
  ["coffee", 2],
  ["honey", 2],
  ["port", 1],
  ["cream", 1],
  ["apple", 2],
  ["pear", 1],
  ["gin", 1],
  ["rye", 1],
  ["whiskey", 2],
  ["whisky", 2],
  ["scotch", 1],
  ["rum", 1],
  ["vodka", 2],
  ["wine", 1],
  ["vermouth", 2],
  ["water", 2],
  ["syrup", 2],
  ["bitters", 2],
  ["sherry", 2],
  ["absinthe", 2],
  ["brandy", 2],
  ["soda", 2],
  ["tonic", 2],
  ["seltzer", 2],
  ["grenadine", 3],
  ["zest", 1],
  ["cognac", 2],
  ["creme", 1],
  ["pineapple", 3],
  ["tequila", 3],
  ["mezcal", 2],
];
var monthsDict = [
  ["January", 5],
  ["February", 5],
  ["March", 2],
  ["April", 3],
  ["May", 2],
  ["June", 2],
  ["July", 3],
  ["August", 3],
  ["September", 4],
  ["October", 4],
  ["November", 4],
  ["December", 4],
];
var commonIngredients = [];
var months = [];
var tempThreshold = 283;
var haikuWords = [];
var haikuDictionary = [];
var haikuStructure = [
  (firstLine = {
    words: [],
    syllables: 0,
    max: 5,
  }),
  (secondLine = {
    words: [],
    syllables: 0,
    max: 7,
  }),
  (thirdLine = {
    words: [],
    syllables: 0,
    max: 5,
  }),
];
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cb37aed766msh4422bf0302f36fbp1aa0dejsn1b793f56d67c",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

// FUNCTIONS
function checkLocation() {
  var lat;
  var lon;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log("allowed");
        getWeather(lat, lon);
      },
      function () {
        lat = latNYC;
        lon = lonNYC;
        console.log("blocked");
        getWeather(lat, lon);
      }
    );
  } else {
  }
}

function getWeather(latitude, longitude) {
  console.log(latitude);
  console.log(longitude);
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=f53b5109b06704799e5260e2dda10bda"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      getCocktails(data.main.temp);
    });
}

function getCocktails(temperature) {
  var ingredientA;
  var ingredientB;
  if (Number(temperature) > tempThreshold) {
    var randHot = Math.floor(Math.random() * hotIngredients.length);
    ingredientA = hotIngredients[randHot];
    tempWord = "warm";
  } else {
    var randCold = Math.floor(Math.random() * coldIngredients.length);
    ingredientA = coldIngredients[randCold];
    tempWord = "cold";
  }
  var currentMonth = dayjs().month();
  if (currentMonth === 0 || currentMonth === 1 || currentMonth === 2) {
    var randWinter = Math.floor(Math.random() * winterIngredients.length);
    ingredientB = winterIngredients[randWinter];
  } else if (currentMonth === 3 || currentMonth === 4 || currentMonth === 5) {
    var randSpring = Math.floor(Math.random() * springIngredients.length);
    ingredientB = springIngredients[randSpring];
  } else if (currentMonth === 6 || currentMonth === 7 || currentMonth === 8) {
    var randSummer = Math.floor(Math.random() * summerIngredients.length);
    ingredientB = summerIngredients[randSummer];
  } else {
    var randFall = Math.floor(Math.random() * fallIngredients.length);
    ingredientB = fallIngredients[randFall];
  }
  var searchString = ingredientA + ", " + ingredientB;
  haikuWords.push(dayjs().format("MMMM"));
  addEntry(dayjs().format("MMMM"));
  haikuWords.push(ingredientA);
  addEntry(ingredientA);
  console.log(searchString);
  $.ajax({
    method: "GET",
    //Only cocktails containing all listed ingredients will be returned.
    url: "https://api.api-ninjas.com/v1/cocktail?ingredients=" + searchString,
    headers: { "X-Api-Key": "FY5H8mVkxpSV+RQ0ub8Cbg==HmezQ5tZdVLtj20h" },
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      //if no cocktail is found combining the two ingredients, search again with only one ingredient
      if (result.length === 0) {
        $.ajax({
          method: "GET",
          url:
            "https://api.api-ninjas.com/v1/cocktail?ingredients=" + ingredientA,
          headers: { "X-Api-Key": "FY5H8mVkxpSV+RQ0ub8Cbg==HmezQ5tZdVLtj20h" },
          contentType: "application/json",
          success: function (result2) {
            console.log(result2);
            displayCocktailDay(result2);
          },
          error: function ajaxError(jqXHR) {
            console.error("Error: ", jqXHR.responseText);
          },
        });
      } else {
        haikuWords.push(ingredientB);
        addEntry(ingredientB);
        displayCocktailDay(result);
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}
//Function the have the user save their favorite cocktail reciepe
function saveUserFav(data) {
  console.log(data);
  var favoritesList = localStorage.getItem("favoritesList");
  if (!favoritesList) {
    favoritesList = [];
  } else {
    favoritesList = JSON.parse(favoritesList);
  }

  favoritesList.push(data);

  localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  // event.preventDefault();
  // insert your fav cocktail
  //     var cocktail= cocktailInput.value;
  //    localStorage.setItem('cocktail', cocktail);

  //     window.location.reload();
}

function displayCocktailDay(data) {
  var cocktailRand = Math.floor(Math.random() * data.length);
  var cocktailSelected = data[cocktailRand];
  todayCocktail.children().eq(3).text(cocktailSelected.name);
  todayCocktail.children().eq(4).empty();
  for (i = 0; i < cocktailSelected.ingredients.length; i++) {
    var newLI = $(document.createElement("li"));
    newLI.text(cocktailSelected.ingredients[i]);
    todayCocktail.children().eq(4).append(newLI);
  }
  todayCocktail.children().eq(5).text(cocktailSelected.instructions);
  makeHaikuList(cocktailSelected);
}

function addEntry(word) {
  console.log(word);
  var syllables = 0;
  var type = "";
  try {
    syllables = commonIngredientsDict[commonIngredients.indexOf(word)][1];
    type = "noun";
  } catch {
    syllables = monthsDict[months.indexOf(word)][1];
    type = "month";
  }
  var newEntry = {
    haikuWord: word,
    wordSyllables: syllables,
    wordType: type,
  };
  haikuDictionary.push(newEntry);
}

function setUpLists() {
  for (i = 0; i < commonIngredientsDict.length; i++) {
    commonIngredients.push(commonIngredientsDict[i][0]);
  }
  for (i = 0; i < monthsDict.length; i++) {
    months.push(monthsDict[i][0]);
  }
  console.log(commonIngredients);
  console.log(months);
}

function makeHaikuList(data) {
  for (i = 0; i < data.ingredients.length; i++) {
    var ingredientLine = data.ingredients[i].split(" ");
    for (j = 0; j < ingredientLine.length; j++) {
      var word = ingredientLine[j].toLowerCase();
      if (commonIngredients.includes(word) && haikuWords.length < 8) {
        haikuWords.push(word);
        addEntry(word);
      }
      if (
        commonIngredients.includes(word.slice(0, word.length - 1)) &&
        haikuWords.length < 8
      ) {
        haikuWords.push(word.slice(0, word.length - 1));
        addEntry(word.slice(0, word.length - 1));
      }
    }
  }
  while (haikuWords.length < 8) {
    for (k = 0; k < haikuWords.length; k++) {
      if (!months.includes(haikuWords[k]) && haikuWords.length < 8) {
        haikuWords.push(haikuWords[k]);
      }
    }
  }
  console.log(haikuWords);
  console.log(haikuDictionary);
  makeHaiku();
}

function makeHaiku() {
  testDone = false;
  while (testDone === false) {
    for (i = 0; i < haikuDictionary.length; i++) {
      randLine = Math.floor(Math.random() * haikuStructure.length);
      if (
        Number(haikuStructure[randLine].syllables) +
          haikuDictionary[i].wordSyllables <=
        haikuStructure[randLine].max
      ) {
        haikuStructure[randLine].words.push(haikuDictionary[i].haikuWord);
        haikuStructure[randLine].syllables =
          haikuStructure[randLine].syllables + haikuDictionary[i].wordSyllables;
        if (months.includes(haikuDictionary[i].haikuWord)) {
          haikuDictionary.splice(i, 1);
        }
      }
    }
    testDone = true;
    for (i = 0; i < haikuStructure.length; i++) {
      if (Number(haikuStructure[i].syllables) + 3 < haikuStructure[i].max) {
        testDone = false;
      }
    }
  }
  console.log(haikuStructure);
  for (i = 0; i < haikuStructure.length; i++) {
    var monthCheck = false;
    var monthIndex = -1;
    for (j = 0; j < haikuStructure[i].words.length; j++) {
      if (months.includes(haikuStructure[i].words[j])) {
        monthCheck = true;
        monthIndex = j;
      }
    }
    if (monthCheck) {
      var placeholder =
        haikuStructure[i].words[haikuStructure[i].words.length - 1];
      haikuStructure[i].words[haikuStructure[i].words.length - 1] =
        haikuStructure[i].words[monthIndex];
      haikuStructure[i].words[monthIndex] = placeholder;
      var difference = haikuStructure[i].max - haikuStructure[i].syllables;
      if (difference === 0) {
        haikuStructure[i].words.splice(
          haikuStructure[i].words.length - 1,
          0,
          "in"
        );
      }
      if (difference === 1) {
        haikuStructure[i].words.splice(
          haikuStructure[i].words.length - 1,
          0,
          "in " + tempWord
        );
      }
      if (difference === 2) {
        haikuStructure[i].words.splice(
          haikuStructure[i].words.length - 1,
          0,
          "in this " + tempWord
        );
      }
    } else {
      var difference2 = haikuStructure[i].max - haikuStructure[i].syllables;
      if (difference2 === 1) {
        if (haikuStructure[i].words.length === 1) {
          haikuStructure[i].words.splice(
            haikuStructure[i].words.length - 1,
            0,
            "some"
          );
        } else {
          haikuStructure[i].words.splice(
            haikuStructure[i].words.length - 1,
            0,
            "and"
          );
        }
      }
      if (difference2 === 2) {
        if (haikuStructure[i].words.length === 1) {
          haikuStructure[i].words.splice(
            haikuStructure[i].words.length - 1,
            0,
            "some " + tempWord
          );
        } else {
          haikuStructure[i].words.splice(
            haikuStructure[i].words.length - 1,
            0,
            "and"
          );
          haikuStructure[i].words.unshift("some");
        }
      }
      if (difference2 === 3) {
        if (haikuStructure[i].words.length === 1) {
          haikuStructure[i].words.splice(
            haikuStructure[i].words.length - 1,
            0,
            "some " + tempWord + ", " + tempWord
          );
        } else {
          haikuStructure[i].words.splice(
            haikuStructure[i].words.length - 1,
            0,
            "and some"
          );
          haikuStructure[i].words.unshift("some");
        }
      }
    }
  }
  var finishedPoem = ["", "", ""];
  for (i = 0; i < haikuStructure.length; i++) {
    for (j = 0; j < haikuStructure[i].words.length; j++) {
      var nextWord = haikuStructure[i].words[j];
      if (
        commonIngredients.includes(nextWord) &&
        j !== haikuStructure[i].words.length - 1
      ) {
        nextWord = nextWord + ",";
      }
      finishedPoem[i] = finishedPoem[i] + " " + nextWord;
    }
    if (i !== 2) {
      finishedPoem[i] = finishedPoem[i] + ",";
    }
  }
  console.log(finishedPoem);
  displayHaiku(finishedPoem);
}

function displayHaiku(text) {
  for (i = 0; i < text.length; i++) {
    var newP = $(document.createElement("p"));
    newP.text(text[i]);
    newP.addClass("newP");
    dialog.append(newP);
  }
}

function displayResults(data) {
  console.log("hello from displayResults");
  // loop through all entries in cocktail data
  for (i = 0; i < data.length; i++) {
    // create elements needed for cocktail recipe display
    var newCard = $(document.createElement("article"));
    var newTitle = $(document.createElement("h1"));
    var newIngredients = $(document.createElement("ul"));
    var newInstructions = $(document.createElement("p"));
    var saveButton = $(document.createElement("button"));

    // set element properties
    newTitle.text(data[i].name);
    newCard.addClass("result");
    saveButton.text("add to favorites +");
    saveButton.addClass("cardButtons");
    saveButton.click(function (event) {
      saveUserFav(data);
    });

    // loop through all ingredient entries and add them to new Ingredients list
    for (j = 0; j < data[i].ingredients.length; j++) {
      newItem = $(document.createElement("li"));
      newItem.text(data[i].ingredients[j]);
      newIngredients.append(newItem);
    }
    newInstructions.text(data[i].instructions);
    // append elements onto card
    newCard.append(newTitle);
    newCard.append(newIngredients);
    newCard.append(newInstructions);
    newCard.append(saveButton);
    // append card onto cocktail list
    todayCocktail.hide();
    cocktailList.append(newCard);
  }
}

function searchCocktails(ingInput) {
  console.log("search");
  $.ajax({
    method: "GET",
    //Only cocktails containing all listed ingredients will be returned.
    url: "https://api.api-ninjas.com/v1/cocktail?ingredients=" + ingInput,
    headers: { "X-Api-Key": "FY5H8mVkxpSV+RQ0ub8Cbg==HmezQ5tZdVLtj20h" },
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      cocktailList.empty();
      displayResults(result);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

// USER INTERACTIONS
$("#search").on("click", function (event) {
  event.preventDefault();
  ingredient = searchInput.val();
  for (let i = 0; i < ingredientList.length; i++) {
    if (ingredient === "") {
      ingredient = ingredientList[i];
    } else {
      ingredient = ingredient + ", " + ingredientList[i];
    }
  }
  console.log(ingredient);
  if (ingredient !== "") {
    searchCocktails(ingredient);
  }
});

$("#search-form").on("submit", function (event) {
  event.preventDefault();
  ingredient = searchInput.val();

  for (let i = 0; i < ingredientList.length; i++) {
    if (ingredient === "") {
      ingredient = ingredientList[i];
    } else {
      ingredient = ingredient + ", " + ingredientList[i];
    }
  }
  console.log(ingredient);
  if (ingredient !== "") {
    searchCocktails(ingredient);
  }
});

addIngredientButton.on("click", function (event) {
  event.preventDefault();
  ingredient = searchInput.val();
  addIngredient(ingredient);
  searchInput.val("");
  var ingredientListItem = $(document.createElement("li"));
  ingredientListItem.text(ingredient);
  displayList.append(ingredientListItem);
});

function addIngredient(ingredient) {
  ingredientList.push(ingredient);

  console.log(ingredientList);
}

$("#clear").on("click", function () {
  console.log("clear");
  ingredientList = [];
  displayList.empty();
});

// INITIALIZATIONS
setUpLists();
checkLocation();

//Pop-Up-Message
$(function () {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "explode",
      duration: 1000,
    },
  });

  $("#opener").on("click", function () {
    $("#dialog").dialog("open");
  });
});
