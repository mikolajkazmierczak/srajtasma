<script>
  import { onMount } from 'svelte';
  import { receipts } from './receipts.js';
  import Card from './Card.svelte';

  let gif;

  onMount(async () => {
    if ($receipts.length == 0) {
      let q = 'celebration';
      let id = '3o7abIileRivlGr8Nq';
      try {
        let res = await fetch(
          `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=Nu5LdrLbx9Dn6UpIhrY2nPO9nLjUNvCq`
        );
        let json = await res.json();
        let amount = json.data.length;
        let randomId = Math.floor(Math.random() * amount);
        id = json.data[randomId].id;
      } catch (err) {
        console.log(`ERROR: Could not dowload GIF!\n ${err}`);
      }
      gif = `https://media.giphy.com/media/${id}/giphy.gif`;
    }
  });
</script>

<div class="wrapper">
  <h2>Taśmy</h2>
  {#if $receipts.length == 0}
    <div class="empty">
      <p>Pusto</p>
      <img src={gif} alt="celebration" />
    </div>
  {:else}
    {#each $receipts as receipt}
      <Card {...receipt} />
    {/each}
  {/if}
</div>

<style>
  .wrapper {
    padding: 20px;
  }
  h2 {
    margin-bottom: 10px;
  }

  .empty p {
    font-size: 2em;
  }
  .empty img {
    width: 100%;
  }
</style>
