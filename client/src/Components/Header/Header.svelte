<script>
  import Account from './Account.svelte';
  import { toggle } from '$src/me.js';
</script>

<header>
  <h1>🧻 Srajtaśma</h1>
  <img
    class="account-icon"
    src="/icons/account.svg"
    alt="show account"
    on:click={toggle}
  />
  <Account />
</header>

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

  .account-icon {
    height: 30px;
    width: 30px;
  }
</style>
