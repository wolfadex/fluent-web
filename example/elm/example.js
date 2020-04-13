import { Elm } from "./Example.elm";
import localizations from "../common/localizations.js";

Elm.Example.init({
  node: document.getElementById("root"),
  flags: localizations,
});
