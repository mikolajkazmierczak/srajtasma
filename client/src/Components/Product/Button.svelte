<script>
  import { createEventDispatcher } from 'svelte';
  import { showPanel, open, close } from './product.js';

  const dispatch = createEventDispatcher();
</script>

<div class="button {$showPanel ? 'left' : 'center'} cancel" on:click={close}>
  <img src="/icons/no.svg" alt="cancel" />
</div>

<div
  class="button {$showPanel ? 'right' : 'center'}"
  on:click={() => {
    if ($showPanel) {
      dispatch('save');
    } else {
      open();
    }
  }}
>
  {#if $showPanel}
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
