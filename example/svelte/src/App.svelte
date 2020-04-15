<script>
  import { onMount } from "svelte";

  export let resources;

  let currentLocale = "en-US";
  const locales = resources.map(([locale]) => locale);
  let resource = [];

  function setCurrentResource() {
    resource = resources.find(
      ([locale]) => currentLocale === locale
    ) || [];
  }

  const today = new Date();
  let personName = "Carl";
  const fruits = ["apple", "orange", "lemon"];
  let favoriteFruit = "apple";

  onMount(() => {
    setCurrentResource();
  });
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <label>
    Active Locale
    <select
      value={currentLocale}
      on:change={event => {
        currentLocale = event.target.value;
        setCurrentResource();
      }}>
      {#each locales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
  </label>
  <br />
  <br />
  Basic key-value:
  <br />
  <fluent-text messageId="hello-no-name" {resource} />
  <br />
  <br />
  Styled key-value:
  <br />
  <fluent-text messageId="sign-in-or-cancel" {resource} />
  <br />
  <br />
  Today’s Date:
  <br />
  <fluent-text messageId="today-date" args={{ date: today }} {resource} />
  <br />
  <br />
  Message with argument:
  <br />
  <input type="text" bind:value={personName} />
  <br />
  <fluent-text messageId="hello" args={{ userName: personName }} {resource} />
  <br />
  <br />
  Input localized:
  <br />
  <fluent-element messageId="type-name" {resource}>
    <input type="text" />
  </fluent-element>
  <br />
  <br />
  Select with localized options:
  <br />
  <label>
    <fluent-text messageId="favorite-fruit" {resource} />
    <select
      value={favoriteFruit}
      on:change={event => (favoriteFruit = event.target.value)}>
      {#each fruits as fruit}
        <option value={fruit}>
          <fluent-text messageId={`fruit-${fruit}`} {resource} />
        </option>
      {/each}
    </select>
  </label>
</main>
