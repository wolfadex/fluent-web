import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import resources from "../common/resources.js";

const supportedLocales = Object.keys(resources);

function getCurrentLocales(desiredLocales) {
  return negotiateLanguages(
        desiredLocales,
        supportedLocales,
        { defaultLocale: 'en-US' }
    )
}

function getBundles(desiredLocales) {
    const currentLocales = getCurrentLocales(desiredLocales);
    const bundles = [];

    for (const locale of currentLocales) {
        const bundle = new FluentBundle(locale);
        bundle.addResource(resources[locale]);
        bundles.push(bundle)
    }

    return bundles;
}

const elLocaleSelector = document.getElementById("locale-selector");
let currentLocale = getCurrentLocales(navigator.languages)[0];

supportedLocales.map((locale) => {
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
  const bundles = getBundles([currentLocale]);

  personName = event.target.value;
  elHelloName.bundles = bundles;
  elHelloName.args = {
    userName: personName,
  };
});

const elHelloName = document.getElementById("helloName");
const elTypeName = document.getElementById("typeName");

elTypeName.attributeWhitelist = ["placeholder"];

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
  const bundles = getBundles([currentLocale]);

  favoriteFruit = event.target.value;
  elFruitList.map((el) => (el.bundles = bundles));
});

function updateLocalization() {
  const bundles = getBundles([currentLocale]);

  elHelloNoName.bundles = bundles;

  elSignInOrCancel.bundles = bundles;

  elTodayDate.bundles = bundles;
  elTodayDate.args = { date: new Date() };

  elHelloName.bundles = bundles;
  elHelloName.args = {
    userName: personName,
  };

  elTypeName.bundles = bundles;

  elFavoriteFruitLabel.bundles = bundles;
  elFruitList.map((el) => (el.bundles = bundles));
}

updateLocalization();
