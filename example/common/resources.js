import { FluentResource } from "@fluent/bundle";

const enUS = new FluentResource(`
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

favorite-fruit = Favorite Fruit
fruit-apple = Apple
fruit-orange = Orange
fruit-lemon = Lemon
`);

const pl = new FluentResource(`
hello = Cześć { $userName }!
# hello-no-name = Witaj nieznajomy!
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

favorite-fruit = Ulubiony owoc
fruit-apple = Jabłko
fruit-orange = Pomarańczowy
fruit-lemon = Cytrynowy
`);

const cs = new FluentResource(`
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

favorite-fruit = Oblíbené ovoce
fruit-apple = Jablko
fruit-orange = Pomeranč
fruit-lemon = Citrón
`);

const thTH = new FluentResource(`
hello = สวัสดีค่ะ คุณ{ $userName }
hello-no-name = สวัสดีค่ะ
type-name =
    .placeholder = ชื่อของคุณ

# $date (Date) - Current date, formatted as month and day.
today-date = วันนี้เป็น { DATETIME($date) }
# $date (Date) - Current date, formatted as weekday.
today-weekday = มันคือ {$date}

sign-in-or-cancel = <b>เข้าสู่ระบบ</b> หรือ <em>ยกเลิก</em>
clicked-sign-in = เรียบร้อย
clicked-cancel = ไม่เป็นไร

favorite-fruit = ผลไม้ที่ชอบ
fruit-apple = แอปเปิ้ล
fruit-orange = ส้ม
fruit-lemon = มะนาว
`);

const eo = new FluentResource(`
hello = Saluton, { $userName }!
hello-no-name = Saluton, fremdulo!
type-name =
    .placeholder = Via nomo

# $date (Date) - Current date, formatted as month and day.
today-date = Hodiaŭ estas { DATETIME($date) }.
# $date (Date) - Current date, formatted as weekday.
today-weekday = Estas {$date}.

sign-in-or-cancel = <b>Ensaluti</b> aŭ <em>nuligi</em>.
clicked-sign-in = Vi estas nun ensalutina.
clicked-cancel = Bone, ne gravas.

favorite-fruit = Preferata Frukto
fruit-apple = Pomo
fruit-orange = Oranĝo
fruit-lemon = Citrono
`);

export default {
  "en-US": enUS,
  "pl": pl,
  "cs": cs,
  "th-TH": thTH,
  "eo": eo,
};
