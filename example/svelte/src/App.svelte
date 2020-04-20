<script>
  export let resources;
  import { negotiateLanguages } from '@fluent/langneg';
  import { FluentBundle, FluentResource } from '@fluent/bundle';

  const supportedLocales = Object.keys(resources);

  function getCurrentLocales(desiredLocales) {
    return negotiateLanguages(
          desiredLocales,
          supportedLocales,
          { defaultLocale: 'en-US' }
      )
  }

  function getBundles(desiredLocales) {
      const currentLocales = getCurrentLocales(desiredLocales);
      const bundles = [];

      for (const locale of currentLocales) {
          const bundle = new FluentBundle(locale);
          bundle.addResource(resources[locale]);
          bundles.push(bundle)
      }

      return bundles;
  }

  let currentBundles = getBundles(navigator.languages);
  let currentLocale = getCurrentLocales(navigator.languages)[0];

  function setCurrentBundles() {
    currentBundles = getBundles([currentLocale]);
  }

  const today = new Date();
  let personName = "Carl";
  const fruits = ["apple", "orange", "lemon"];
  let favoriteFruit = "apple";
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
        setCurrentBundles();
      }}>
      {#each supportedLocales as locale}
        <option value={locale}>{locale}</option>
      {/each}
    </select>
  </label>
  <br />
  <br />
  Basic key-value:
  <br />
  <fluent-text messageId="hello-no-name" bundles={currentBundles} />
  <br />
  <br />
  Styled key-value:
  <br />
  <fluent-text messageId="sign-in-or-cancel" bundles={currentBundles} />
  <br />
  <br />
  Today’s Date:
  <br />
  <fluent-text messageId="today-date" args={{ date: today }} bundles={currentBundles} />
  <br />
  <br />
  Message with argument:
  <br />
  <input type="text" bind:value={personName} />
  <br />
  <fluent-text messageId="hello" args={{ userName: personName }} bundles={currentBundles} />
  <br />
  <br />
  Input localized:
  <br />
  <fluent-element messageId="type-name" bundles={currentBundles} attributeWhitelist={["placeholder"]}>
    <input type="text" />
  </fluent-element>
  <br />
  <br />
  Select with localized options:
  <br />
  <label>
    <fluent-text messageId="favorite-fruit" bundles={currentBundles} />
    <select
      value={favoriteFruit}
      on:change={event => (favoriteFruit = event.target.value)}>
      {#each fruits as fruit}
        <option value={fruit}>
          <fluent-text messageId={`fruit-${fruit}`} bundles={currentBundles} />
        </option>
      {/each}
    </select>
  </label>
  <br />
  <br />
  Provider-based messages:
  <br />
  <fluent-provider bundles={currentBundles}>
    <fluent-text messageId="hello-no-name"></fluent-text>
    <br />
    <fluent-text messageId="sign-in-or-cancel"></fluent-text>
  </fluent-provider>
</main>
