import "../../../src/index.js";
import App from "./App.svelte";
import resources from "../../common/resources.js";

const app = new App({
  target: document.body,
  props: {
    resources,
  },
});

export default app;
