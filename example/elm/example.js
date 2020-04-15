import { Elm } from "./Example.elm";
import resources from "../common/resources.js";

Elm.Example.init({
  node: document.getElementById("root"),
  flags: resources,
});
