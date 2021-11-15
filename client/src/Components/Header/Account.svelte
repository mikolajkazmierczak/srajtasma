<script>
  import { fade, fly } from 'svelte/transition';
  import { authorized, fetchREST } from '$src/REST.js';
  import { showMe, close, phone, firstName, lastName } from '$src/me.js';

  async function logout() {
    await fetchREST('GET', '/auth/logout');
    close();
    $authorized = false;
  }
</script>

{#if $showMe}
  <div class="wrapper">
    <div class="bg" on:click={close} transition:fade={{ duration: 200 }} />
    <div class="panel" transition:fly={{ y: -50, duration: 200 }}>
      <h2>Zalogowano</h2>
      <p>{$firstName} {$lastName}</p>
      <p>{$phone}</p>
      <button on:click={logout}>Wyloguj</button>
    </div>
  </div>
{/if}

<style>
  .wrapper {
    position: fixed;
    top: var(--header-size);
    left: 0;
    width: 100vw;
    height: calc(100vh - var(--header-size));
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000aa;
  }
  .panel {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 20px;
    width: calc(100% - 20px);
    background-color: var(--grey-1);
  }
  button {
    margin-top: 10px;
  }
</style>
