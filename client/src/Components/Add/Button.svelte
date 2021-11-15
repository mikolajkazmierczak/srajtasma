<script>
  import { createEventDispatcher } from 'svelte';
  import { showForm, open, close } from './form.js';
  import { showUsersList, usersList } from '$c/usersList.js';
  import { users } from '$src/users.js';

  const dispatch = createEventDispatcher();
  $: centered = !$showForm || $showUsersList;
</script>

<div
  class="button {centered ? 'center' : 'left'} cancel"
  on:click={() => {
    dispatch('exit');
    close();
  }}
>
  <img src="/icons/no.svg" alt="cancel" />
</div>

<div
  class="button {centered ? 'center' : 'right'}"
  on:click={() => {
    if ($showUsersList) {
      dispatch('closeUsersList');
    } else if ($showForm) {
      dispatch('save');
    } else {
      $usersList = $users.map(user => user._id);
      open();
    }
  }}
>
  {#if $showForm}
    <img src="/icons/yes.svg" alt="save item" />
  {:else}
    <img src="/icons/plus.svg" alt="add item" />
  {/if}
</div>

<style>
  .button {
    z-index: 100;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    place-items: center;
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--main-0);
    border-radius: 50%;
    transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .left,
  .right {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .left {
    transform: translateX(calc(-100% - 10px));
  }
  .right {
    transform: translateX(calc(0% + 10px));
  }
  div img {
    height: 60%;
  }
  .cancel {
    background-color: var(--red-0);
    width: calc(var(--button-size) - 3vh);
    height: calc(var(--button-size) - 3vh);
    bottom: calc(20px + (3vh / 2));
  }
</style>
