import localizations from "../common/localizations.js";

const locales = localizations.map(([locale]) => locale);
const elLocaleSelector = document.getElementById("locale-selector");
let currentLocale = locales[0];

locales.map((locale) => {
  const option = document.createElement("option");
  option.value = locale;
  option.innerText = locale;
  elLocaleSelector.appendChild(option);
});
elLocaleSelector.value = currentLocale;
elLocaleSelector.addEventListener("change", (event) => {
  currentLocale = event.target.value;
  updateLocalization();
});

const elHelloNoName = document.getElementById("helloNoName");

const elSignInOrCancel = document.getElementById("signInOrCancel");
const elTodayDate = document.getElementById("todayDate");
const elPersonNameInput = document.getElementById("personNameInput");
let personName = "Carl";

elPersonNameInput.value = "Carl";
elPersonNameInput.addEventListener("input", (event) => {
  const messages = filteredLocales();

  personName = event.target.value;
  elHelloName.messages = messages;
  elHelloName.args = {
    userName: personName,
  };
});

const elHelloName = document.getElementById("helloName");
const elTypeName = document.getElementById("typeName");
const elFavoriteFruitLabel = document.getElementById("favoriteFruitLabel");
const fruits = ["apple", "orange", "lemon"];
let favoriteFruit = fruits[0];
const elFavoriteFruitSelect = document.getElementById("favoriteFruitSelect");
const elFruitList = [];

fruits.map((fruit) => {
  const optionText = document.createElement("fluent-text");
  const option = document.createElement("option");

  optionText.setAttribute("messageId", `fruit-${fruit}`);
  elFruitList.push(optionText);
  option.value = fruit;
  option.appendChild(optionText);
  elFavoriteFruitSelect.appendChild(option);
});
elFavoriteFruitSelect.value = favoriteFruit;
elFavoriteFruitSelect.addEventListener("change", (event) => {
  const messages = filteredLocales();

  favoriteFruit = event.target.value;
  elFruitList.map((el) => (el.messages = messages));
});

function updateLocalization() {
  const messages = filteredLocales();

  elHelloNoName.messages = messages;

  elSignInOrCancel.messages = messages;

  elTodayDate.messages = messages;
  elTodayDate.args = { date: new Date() };

  elHelloName.messages = messages;
  elHelloName.args = {
    userName: personName,
  };

  elTypeName.messages = messages;

  elFavoriteFruitLabel.messages = messages;
  elFruitList.map((el) => (el.messages = messages));
}

function filteredLocales() {
  return localizations.filter(([locale]) => locale === currentLocale);
}

updateLocalization();
