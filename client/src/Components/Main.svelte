<script>
  import { fetchREST } from '$src/REST.js';
  import { error } from '$src/error.js';
  import { close, title, emoji, price, note } from '$c/Product/product.js';
  import Info from './Info.svelte';
  import Products from './Products.svelte';
  import Account from './Account.svelte';
  import ProductPanel from './Product/Panel.svelte';
  import ProductButton from './Product/Button.svelte';
  import Menu from './Menu.svelte';

  let saveError;

  async function saveProduct() {
    try {
      let json = await fetchREST('POST', '/product', {
        title: $title,
        emoji: $emoji,
        price: $price,
        note: $note,
      });
      let err = json.error;
      if (err) {
        console.log(err);
        saveError = '';
        if (err.errors.title) saveError += 'Podaj tytuł! ';
        if (err.errors.price) saveError += 'Podaj cenę!';
      } else {
        saveError = null;
        close();
      }
    } catch (err) {
      $error = err;
    }
  }
</script>

<header>
  <h1>🧻 Srajtaśma</h1>
  <Account />
</header>

<main>
  <ProductPanel error={saveError} />
  <Info />
  <Products />
</main>

<ProductButton on:save={saveProduct} />

<Menu />

<style>
  header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: var(--header-size);
    width: 100%;
    background-color: var(--main-1);
  }
  header h1 {
    color: var(--grey-0);
  }

  main {
    padding-top: var(--header-size);
    margin-bottom: var(--button-size);
  }
</style>
