import resources from "../common/resources.js";

const locales = resources.map(([locale]) => locale);
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
  const resource = getCurrentResource();

  personName = event.target.value;
  elHelloName.resource = resource;
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
  const resource = getCurrentResource();

  favoriteFruit = event.target.value;
  elFruitList.map((el) => (el.resource = resource));
});

function updateLocalization() {
  const resource = getCurrentResource();

  elHelloNoName.resource = resource;

  elSignInOrCancel.resource = resource;

  elTodayDate.resource = resource;
  elTodayDate.args = { date: new Date() };

  elHelloName.resource = resource;
  elHelloName.args = {
    userName: personName,
  };

  elTypeName.resource = resource;

  elFavoriteFruitLabel.resource = resource;
  elFruitList.map((el) => (el.resource = resource));
}

function getCurrentResource() {
  return resources.find(([locale]) => locale === currentLocale) || [];
}

updateLocalization();
