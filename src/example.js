import flt from "@fluent/dedent";
import { Elm } from "./Example.elm";

const enUS = flt`
  hello = Hello, { $userName }!
  hello-no-name = Hello, stranger!
  type-name =
      .placeholder = Your name

  # $date (Date) - Current date, formatted as month and day.
  today-date = Today is { DATETIME($date) }.
  # $date (Date) - Current date, formatted as weekday.
  today-weekday = It's {$date}.

  sign-in-or-cancel = <b>Sign in</b> or <em>cancel</em>.
  clicked-sign-in = You are now signed in.
  clicked-cancel = OK, nevermind.
  `;
const pl = flt`
  hello = Cześć { $userName }!
  hello-no-name = Witaj nieznajomy!
  type-name =
      .placeholder = Twoje imię

  # $date (Date) - Current date, formatted as month and day.
  today-date = Dziś jest {DATETIME($date)}.

  # Commented out to demonstrate fallback.
  # $date (Date) - Current date, formatted as weekday.
  # today-weekday = Jest {$date}.

  sign-in-or-cancel = <b>Zaloguj</b> albo <em>anuluj</em>.
  clicked-sign-in = Brawo!
  clicked-cancel = OK, nieważne.
  `;

Elm.Example.init({
  node: document.getElementById("root"),
  flags: [
    ["en-US", enUS],
    ["pl", pl],
  ],
});
