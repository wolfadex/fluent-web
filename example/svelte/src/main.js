import "../../../src/index.js";
import App from "./App.svelte";
import localizations from "../../common/localizations.js";

const app = new App({
  target: document.body,
  props: {
    localizations,
  },
});

export default app;
