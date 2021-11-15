<script>
  import { onMount } from 'svelte';
  import { fetchREST } from '$src/REST.js';
  import { error } from '$src/error.js';
  import { panel } from '$src/menu.js';
  import { users } from '$src/users.js';
  import { _id, phone, firstName, lastName } from '$src/me.js';
  import Header from './Header/Header.svelte';
  import Receipts from './Panels/Receipts/Receipts.svelte';
  import { receipts } from './Panels/Receipts/receipts.js';
  import Requests from './Panels/Requests/Requests.svelte';
  import { requests } from './Panels/Requests/requests.js';
  import AddButton from './Add/Button.svelte';
  import AddForm from './Add/Form.svelte';
  import { close, title, emoji, price, note } from './Add/form.js';
  import UsersList from './UsersList.svelte';
  import { usersList, close as closeUsersList } from './usersList.js';
  import Menu from './Menu.svelte';

  let saveError;

  function exit() {
    saveError = null;
  }

  async function save() {
    try {
      let json = await fetchREST('POST', '/receipt', {
        title: $title,
        emoji: $emoji,
        price: $price,
        note: $note,
        usersList: $usersList,
        // usersPaid: $usersPaid,
      });
      let err = json.error;
      if (err) {
        console.log(err);
        saveError = '';
        if (err.errors.title) saveError += 'Podaj tytuł! ';
        if (err.errors.price) saveError += 'Podaj cenę!';
      } else {
        saveError = null;
        refreshReceipts();
        close();
      }
    } catch (err) {
      $error = err;
    }
  }

  async function refreshReceipts() {
    $receipts = await fetchREST('GET', '/receipt');
    $receipts.forEach(receipt => {
      const id = receipt.createdBy;
      const author = $users.find(user => user._id == id);
      receipt.createdBy = author;
    });
  }

  async function refreshRequests() {
    $requests = await fetchREST('GET', '/request');
  }

  onMount(async () => {
    const me = await fetchREST('GET', '/auth/me');
    $_id = me._id;
    $phone = me.phone;
    $firstName = me.firstName;
    $lastName = me.lastName;
    $users = await fetchREST('GET', '/user');
    refreshReceipts();
    refreshRequests();
    // await fetchREST('DELETE', '/receipt/6191175dd3592db237d33d61');
  });
</script>

<Header />

<main>
  {#if $panel == 0}
    <Receipts />
  {:else if $panel == 1}
    <Requests />
  {/if}
</main>

<AddButton on:save={save} on:exit={exit} on:closeUsersList={closeUsersList} />

<AddForm error={saveError} />
<UsersList />

<Menu />

<style>
  main {
    padding-top: var(--header-size);
    margin-bottom: var(--button-size);
  }
</style>
