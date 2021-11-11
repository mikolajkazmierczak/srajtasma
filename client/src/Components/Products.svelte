<script>
  import { onMount } from 'svelte';
  import { to_currency } from '$src/utils.js';
  import Card from './Product/Card.svelte';

  let gif; // 'https://media.giphy.com/media/3o7abIileRivlGr8Nq/giphy.gif';
  onMount(async () => {
    if (products == []) {
      let q = 'celebration';
      let id;
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
        id = '3o7abIileRivlGr8Nq';
      }
      gif = `https://media.giphy.com/media/${id}/giphy.gif`;
    }
  });

  const products = [
    {
      title: 'Papier toaletowy aksamitny do dupy',
      price: to_currency(11.89),
      note: 'Cena była twarda, ale dupsko będzie miękkie',
      emoji: '🧻',
      buyer: {
        first_name: 'Mikołaj',
        last_name: 'Kaźmierczak',
        phone: 728266518,
      },
    },
    {
      title: 'Mydło',
      price: to_currency(8.99),
      emoji: '🧼',
      buyer: {
        first_name: 'Zuzia',
        last_name: 'Kaźmierczak',
        phone: 123456789,
      },
    },
  ];
</script>

<div class="wrapper">
  {#if products == []}
    <div class="empty">
      <p>Pusto</p>
      <img src={gif} alt="celebration" />
    </div>
  {:else}
    <h2>Taśmy</h2>
    {#each products as product}
      <Card {...product} users_amount="4" />
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
