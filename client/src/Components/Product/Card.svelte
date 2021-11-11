<script>
  import Clipboard from 'svelte-clipboard';
  import { to_currency } from '$src/utils.js';
  let button_clicked = false;
  let price_clicked = false;
  export let users_amount;
  export let title;
  export let price;
  const price_single = to_currency(price / users_amount);
  export let note;
  export let emoji;
  export let buyer;
  export let paid = [];
</script>

<div class="product">
  <div class="bar">
    <h1>{emoji}</h1>
    <h3 class="title">{title}</h3>
  </div>
  <div class="content">
    <div class="icon price">
      <img src="/icons/price.svg" alt="price" />{price}
    </div>
    <div class="icon buyer">
      <img src="/icons/person.svg" alt="buyer" />{buyer.first_name}
      {buyer.last_name}
    </div>
    {#if note}
      <div class="note">
        <small>Notatka</small>
        <p>{note}</p>
      </div>
    {/if}
    <div class="buttons">
      <Clipboard
        text={buyer.phone}
        let:copy
        on:copy={() => {
          button_clicked = true;
          setTimeout(() => {
            button_clicked = false;
          }, 2000);
        }}
      >
        <button on:click={copy}>
          {#if button_clicked}
            <img src="/icons/copy.svg" alt="copied" />
          {:else}
            <img src="/icons/payment.svg" alt="payment" />{buyer.phone}
          {/if}
        </button>
      </Clipboard>
      <Clipboard
        text={price_single}
        let:copy
        on:copy={() => {
          price_clicked = true;
          setTimeout(() => {
            price_clicked = false;
          }, 2000);
        }}
      >
        <button class="charge" on:click={copy}>
          {#if price_clicked}
            <img src="/icons/copy.svg" alt="copied" />
          {:else}
            <img src="/icons/money.svg" alt="money" />{price_single}
          {/if}
        </button>
      </Clipboard>
    </div>
  </div>
</div>

<style>
  .product {
    border: solid 3px var(--grey-2);
    margin-bottom: 20px;
  }

  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 10px;
    background-color: var(--grey-1);
    padding: 10px 20px;
  }
  .title {
    display: flex;
    align-items: center;
  }

  .content {
    padding: 20px;
  }

  .icon {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .icon > img {
    border-radius: 50%;
    margin-right: 10px;
    padding: 3px;
    width: 25px;
    height: 25px;
    background-color: var(--grey-1);
  }

  .note {
    margin-bottom: 10px;
  }
  .note small {
    font-weight: bold;
    font-size: 0.75em;
  }
  .note p {
    font-size: 0.9em;
    line-height: 1.2;
  }

  .buttons {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5px;
    margin-top: 20px;
  }

  button.charge {
    background-color: var(--red-0);
  }
</style>
