# Basics

Under the hood, fluent-web uses the libraries provided by the Fluent team for doing the actual localization. All you need to do is provide the component with an array of `( locale, localizationText )` tuples.

How these values get to your app is up to you. The Fluent team provides a handy function for writing the localizations inline in your JavaScript code, excellent for testing during development

```js
import flt from "@fluent/dedent";

const localization = flt`
  hello = Hello, Fluent!
  `;
```

See [their docs](https://github.com/projectfluent/fluent.js/tree/master/fluent-dedent) for more information on how to use this tool.

Another option is to write `.flt` files and load them over a web request.

Once you have your localization text, pair it up with a locale like so

```js
const enUSLocalization = flt`
  hello = Hello, Fluent!
  `;
const plLocalization = flt`
  hello = Witaj, FLuent!
  `;

const enUS = ["en-US", enUSLocalization];
const pl = ["pl", plLocalization];
```

Now that we have the localization pairs, we can send the one we want to use to our web component as a property

```html
<!-- index.html -->
<fluent-text messageId="hello" id="helloEl"></fluent-text>
```

```js
// index.js
const pl = ["pl", plLocalization];
document.getElementById("helloEl").setProperty("messages", pl);
```

Results in

```
Witaj, FLuent!
```

# Complex Text

Fluent also supports passing arguments, please see [their docs](https://projectfluent.org/) for more information about how arguments work.

Once you have a localization file with arguments setup, their easy to use.

```html
<!-- index.html -->
<fluent-text messageId="hello-name" id="helloPersonEl"></fluent-text>
```

```js
// index.js
import flt from "@fluent/dedent";

const enUSLocalization = flt`
  hello-name = Hello, { $name }!
  `;
const enUS = ["en-US", enUSLocalization];
const helloEl = document.getElementById("helloPersonEl");

helloEl.setProperty("args", { name: "Wolfgang" });
helloEl.setProperty("messages", enUS);
```

Results in

```
Hello, Wolfgang!
```

# Localization with Properties

Another feature of Fluent localization is support for localized properties. For example, you may want `placeholder` text on your text input like so

```html
<input type="text" placeholder="Your Name" />
```

Since this is more than just text, it's also an element, you'll need to specify the child element which you want the attributes applied to. This looks like

```html
<!-- index.html -->
<fluent-element messageId="name" id="nameInput">
  <input type="text" />
</fluent-element>
```

```js
// index.js
import flt from "@fluent/dedent";

const enUSLocalization = flt`
  name =
    .placeholder = Your name
  `;
const enUS = ["en-US", enUSLocalization];
const nameInput = document.getElementById("nameInput");

nameInput.setProperty("messages", enUS);
```

Results in a text input with placeholder text of `Your Name`.

Any attributes or properties that aren't part of the fluent-web API are given directly to element you specify.

# Framework Support

The great thing about fluent-web being a web component is that we can use it in any front end framework or language that supports web components. The [demo](https://wolfadex.github.io/fluent-web/) is written in [Elm](https://elm-lang.org/), though anything from [Svelte](https://svelte.dev/) to [Vue](https://vuejs.org/) or [Ember](https://emberjs.com/) would work just the same.

I hope that this project can help to reduce the amount of time spent re-implementing localization across every front end tool.

# Known Issues

- Users of React should look at using [@fluent/react](https://github.com/projectfluent/fluent.js/tree/master/fluent-react) as React has some compatability issues with web components. In this case the issue is that React isn't able to set properties on web components. Another option would be to wrap the fluent-web in a specialized React component. I do not have experience in this so I won't be making any recommendations.
- Chromium (Chrome, Brave, Edge, etc.) and Safari browsers don't update the current value of a `select` element when the translation changes. They do update as soon as you interact with the `select`, such as changing its focus. FireFox updates as expected.
