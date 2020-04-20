# Basics

Under the hood, fluent-web uses the libraries provided by the Fluent team for doing the actual localization. All you need to do is provide the component with an array of bundles. See the [Fluent docs](https://projectfluent.org/fluent.js/bundle/) for how to build a bundle of resources.

Once you have 1 or more bundles, you can send the one(s) you want to the web component as a property

```html
<!-- index.html -->
<fluent-text messageId="hello" id="helloEl"></fluent-text>
```

```js
// index.js
document.getElementById("helloEl").bundles = yourBundles;
```

Results in

```
Witaj, FLuent!
```

# Complex Text

Fluent also supports passing arguments, please see [their docs](https://projectfluent.org/) for more information about how arguments work.

Once you have a bundle with arguments setup, they're easy to use.

```html
<!-- index.html -->
<fluent-text messageId="hello-name" id="helloPersonEl"></fluent-text>
```

```js
// index.js
import "@wolfadex/fluent-web";
import { FluentResource, FluentBundle } from "@fluent/bundle";

const enUSResource = new FluentResource(`
hello-name = Hello, { $name }!
`);
const enUSBundle = new FluentBundle("en-US");
enUSBundle.addResource(enUSResource);

const helloEl = document.getElementById("helloPersonEl");

helloEl.args = { name: "Wolfgang" };
helloEl.bundles = [enUSBundle];
```

Results in

```
Hello, Wolfgang!
```

# Localization with Properties

Another feature of Fluent is support for localized properties. For example, you may want `placeholder` text on your input like so

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
import "@wolfadex/fluent-web";
import { FluentResource, FluentBundle } from "@fluent/bundle";

const enUSResource = new FluentResource(`
name =
  .placeholder = Your name
`);
const enUSBundle = new FluentBundle("en-US");
enUSBundle.addResource(enUSResource);

const nameInput = document.getElementById("nameInput");

nameInput.attributeWhitelist = ["placeholder"];
nameInput.enUSBundle = [enUSBundle];
```

***Note:*** Don't forget to whitelist the attributes you want localized!

Results in a text input with placeholder text of `Your Name`.

# Errors

If there are any errors encountered while localizing, a event named `fluent-web-error` is dispatched. If the error arises while running Fluent's `bundle.formatPattern()`, the `event.detail` will look like

```js
{
  messageId, // The message id passed in
  args, // Any args passed in, or null
  message, // The message object returned by Fluent
  errors, // A list of errors populated by Fluent
}
```

If the error is due to the message not being found, you'll get

```js
{
  messageId, // The message id passed in
  args, // Any args passed in, or null
  errors: [new Error("Message object not found")],
}
```

# Framework Support

The great thing about fluent-web being a web component is that we can use it in any front end framework or language that supports web components. The [demo](https://wolfadex.github.io/fluent-web/) is written in [Elm](https://elm-lang.org/), and there are additional [examples](https://github.com/wolfadex/fluent-web/tree/master/example) built in [Svelte](https://svelte.dev/) and vanilla html & javascript.

I hope that this project can help to reduce the amount of time spent re-implementing localization across every front end framework.

# Known Issues

- Users of React should look at using [@fluent/react](https://github.com/projectfluent/fluent.js/tree/master/fluent-react) as React has some compatability issues with web components. In this case the issue is that React isn't able to set properties on web components. Another option would be to wrap fluent-web in a specialized React component. I do not have experience in this so I won't be making any recommendations.
- Chromium (Chrome, Brave, Edge, etc.) and Safari browsers don't update the current value of a `select` element when the translation changes. They do update as soon as you interact with the `select`, such as changing its focus. FireFox updates as expected.
