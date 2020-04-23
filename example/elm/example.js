import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { Elm } from "./Example.elm";
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

// Log translation errors
window.addEventListener("fluent-web-error", function(event) {
  console.error(event);
})

const app = Elm.Example.init({
  node: document.getElementById("root"),
  flags: {
  	bundles: getBundles(navigator.languages,),
  	initialLocale: getCurrentLocales(navigator.languages)[0],
  }
});


app.ports.changeDesirecLocale.subscribe(function(locales) {
	app.ports.gotBundles.send(getBundles(locales))
})
