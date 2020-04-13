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
  today-weekday = It’s {$date}.

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

const cs = flt`
  hello = Ahoj, { $userName }!
  hello-no-name = Vítej cizinče!
  type-name =
      .placeholder = Tvé jméno

  # $date (Date) - Current date, formatted as month and day.
  today-date = Dnes je { DATETIME($date) }.
  # $date (Date) - Current date, formatted as weekday.
  today-weekday = Je {$date}.

  sign-in-or-cancel = <b>Přihlásit</b> nebo <em>zrušit</em>.
  clicked-sign-in = Nyní jsi přihlášen.
  clicked-cancel = Ok, nevadí.
  `;

const thTH = flt`
  hello = สวัสดีค่ะ คุณ{ $userName }
  hello-no-name = สวัสดีค่ะ
  type-name =
      .placeholder = ชื่อของคุณ

  # $date (Date) - Current date, formatted as month and day.
  today-date = วันนี้เป็น { DATETIME($date) }
  # $date (Date) - Current date, formatted as weekday.
  today-weekday = มันคือ {$date}

  sign-in-or-cancel = <b>เข้าสู่ระบบ</b> หรือ <em>ยกเลิก</em>.
  clicked-sign-in = เรียบร้อย.
  clicked-cancel = ไม่เป็นไร
  `;


Elm.Example.init({
  node: document.getElementById("root"),
  flags: [
    ["en-US", enUS],
    ["pl", pl],
    ["cs", cs],
    ["th-TH", thTH],
  ],
});
