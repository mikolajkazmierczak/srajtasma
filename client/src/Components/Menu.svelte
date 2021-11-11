<script>
  import { panel } from '$src/menu.js';
</script>

<nav>
  <button
    class:active={$panel == 0}
    on:click={() => {
      $panel = 0;
    }}><img src="/icons/receipt.svg" alt="receipts" />Taśmy</button
  >
  <button
    class:active={$panel == 1}
    on:click={() => {
      $panel = 1;
    }}><img src="/icons/bell.svg" alt="requests" />Braki</button
  >
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: calc(var(--button-size) + 10px);
    padding: 10px 10px;
    width: 100%;
    height: calc(var(--button-size) / 2 + 20px);
    background-color: var(--grey-1);
  }
  button {
    padding: 0;
    background-color: var(--main-0);
    font-weight: bold;
    border-radius: calc(var(--button-size) / 2 - 20px);
  }
  button.active {
    background-color: var(--main-1);
  }
</style>
