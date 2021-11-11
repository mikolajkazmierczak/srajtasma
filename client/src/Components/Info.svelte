<script>
  import { to_currency } from '../utils.js';
  let users = [
    {
      first_name: 'Mikołaj',
      last_name: 'Kaźmierczak',
      balance: to_currency(-25.6),
    },
    {
      first_name: 'Zuzia',
      last_name: 'Kaźmierczak',
      balance: to_currency(30.46),
    },
    {
      first_name: 'Jędrzej',
      last_name: 'Jamnicki',
      balance: to_currency(-15.25),
    },
    {
      first_name: 'Martyna',
      last_name: 'Jeziorna',
      balance: to_currency(10.39),
    },
  ];
  function sort_users() {
    users = users.filter(a => a.balance < 0);
    users.sort((a, b) => parseFloat(a.balance) - parseFloat(b.balance));
  }
  sort_users();
</script>

{#if users.length != []}
  <div class="wrapper">
    <h2>Tablica wstydu</h2>
    {#each users as { first_name, last_name, balance }}
      <p>
        <span>{first_name} {last_name}</span>
        <span class="price {balance > 0 ? '' : 'red'}">{balance}</span>
      </p>
    {/each}
  </div>
{/if}

<style>
  .wrapper {
    padding: 20px;
    background-color: var(--grey-1);
  }

  h2 {
    margin-bottom: 10px;
  }
  p {
    display: flex;
    justify-content: space-between;
  }

  .red {
    color: var(--red-0);
  }
</style>
