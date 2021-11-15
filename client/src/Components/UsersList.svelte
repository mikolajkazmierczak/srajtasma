<script>
  import { showUsersList, usersList, amount, close } from '$c/usersList.js';
  import { users } from '$src/users.js';
  $: $amount = $usersList.length;
</script>

{#if $showUsersList}
  <div class="wrapper">
    <div class="bg" on:click={close} />
    <div class="panel">
      {#each $users as user}
        <label>
          <input type="checkbox" bind:group={$usersList} value={user._id} />
          {user.firstName}
          {user.lastName}
        </label>
      {/each}
    </div>
  </div>
{/if}

<style>
  .wrapper {
    z-index: 99;
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
    position: absolute;
    display: grid;
    grid-template-rows: repeat(auto-fit, auto);
    row-gap: 20px;
    bottom: calc(20px + var(--button-size) + 20px);
    left: 20px;
    padding: 20px;
    width: calc(100% - 40px);
    background-color: var(--grey-0);
  }

  label {
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
  }
  input {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
</style>
