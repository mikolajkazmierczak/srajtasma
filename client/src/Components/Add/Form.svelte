<script>
  import { fade, fly } from 'svelte/transition';
  import emojiRegex from 'emoji-regex';
  import { showForm, close, title, emoji, price, note } from './form.js';
  import { open, amount } from '../usersList.js';

  export let error;
  let emojiError;

  const emojiMatch = emojiRegex();
  let emoji_current;
  $: {
    try {
      let emojis = $emoji.match(emojiMatch);
      if (emojis && !emojis.length) {
        // fallback if there are no emojis in the string
        $emoji = '🧻';
      } else if (emojis.length > 1 && emojis[0] == emoji_current) {
        // if the current emoji is the same as the first one in the input string
        // set the LAST emoji from the input string
        $emoji = emojis[emojis.length - 1];
      } else {
        // set the FIRST emoji from the input string
        $emoji = emojis[0];
      }
      emoji_current = $emoji;
    } catch (err) {
      emojiError = err;
    }
  }
</script>

{#if $showForm}
  <div class="wrapper">
    <div class="bg" transition:fade={{ duration: 200 }} on:click={close} />
    <div class="panel" transition:fly={{ y: 150, duration: 200 }}>
      {#if emojiError}{emojiError}<br />{/if}
      {#if error}{@html error}<br />{/if}
      <div class="title-wrapper">
        <label class="emoji">
          <span>Emoji</span>
          <input type="text" bind:value={$emoji} />
        </label>
        <label class="title">
          <span>Produkt</span>
          <input type="text" bind:value={$title} />
        </label>
      </div>
      <div class="price-wrapper">
        <label class="users">
          <span>Kto</span>
          <button on:click={open}>{$amount}</button>
        </label>
        <label class="price">
          <span>Cena</span>
          <input type="number" step="0.01" min="0.00" bind:value={$price} />
        </label>
      </div>
      <label class="note">
        <span>Notatka</span>
        <textarea rows="2" bind:value={$note} />
      </label>
    </div>
  </div>
{/if}

<style>
  .wrapper {
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .bg {
    width: 100%;
    height: 100%;
    background-color: #000000aa;
  }
  .panel {
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    max-height: 100%;
    width: 100%;
    padding: 20px 20px calc(20px + var(--button-size) + 20px) 20px;
    background-image: url('/imgs/dot_grid.png');
  }
  textarea {
    width: 100%;
    height: auto;
    resize: none;
  }

  .title-wrapper,
  .price-wrapper {
    display: grid;
    grid-template-columns: 60px 1fr;
    column-gap: 20px;
  }

  .emoji > input {
    text-align: center;
  }
</style>
