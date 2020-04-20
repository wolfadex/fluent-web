# fluent-web

A web component that uses [Fluent](https://projectfluent.org/) for localization.

[Interactive example](https://wolfadex.github.io/fluent-web/).

| Locale en-US                                            | Locale pl                                         |
| ------------------------------------------------------- | ------------------------------------------------- |
| ![example result locale en-US](https://raw.githubusercontent.com/wolfadex/fluent-web/master/screen_shot_en-us.png) | ![example result locale pl](https://raw.githubusercontent.com/wolfadex/fluent-web/master/screen_shot_pl.png) |

## Basic Usage:

`yarn add @wolfadex/fluent-web` or `npm install @wolfadex@fluent-web`


```js
import "@wolfadex/fluent-web"
import { FluentResource, FluentBundle } from "@fluent/bundle";

const resource = new FluentResource(`
hello = Hello, Fluent!
`);
const bundle = new FluentBundle("en-US");
bundles.addResource(resource);

const textEl = document.getElementById("my-text-element");

textEl.bundles = [bundle];
```

HTML:

```html
<fluent-text id="my-text-element" messageId="hello"></fluent-text>
```

Result:

```
Hello, Fluent!
```

For how to build messages, see the [Fluent docs](https://github.com/projectfluent/fluent/wiki).

## Examples:

- [Elm](https://github.com/wolfadex/fluent-web/tree/master/example/elm), this is used for the interactive demo
- [Svelte](https://github.com/wolfadex/fluent-web/tree/master/example/svelte)
- [Vanilla HTML & JS](https://github.com/wolfadex/fluent-web/tree/master/example/vanillajs)

## Docs:

See the [Docs](https://github.com/wolfadex/fluent-web/blob/master/docs/index.md) for more details.
