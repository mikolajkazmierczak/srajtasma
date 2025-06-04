<script>
  import { toCurrency } from '$src/utils.js';
  let users = [
    {
      firstName: 'Jan',
      lastName: 'Kowalski',
      balance: toCurrency(-25.6),
    },
    {
      firstName: 'Edytor',
      lastName: 'Tekstu',
      balance: toCurrency(30.46),
    },
    {
      firstName: 'Kuba',
      lastName: 'Rozpruwacz',
      balance: toCurrency(-15.25),
    },
    {
      firstName: 'Paweł',
      lastName: 'Drugi',
      balance: toCurrency(10.39),
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
    {#each users as { firstName, lastName, balance }}
      <p>
        <span>{firstName} {lastName}</span>
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
