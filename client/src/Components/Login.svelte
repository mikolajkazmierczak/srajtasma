<script>
  import { authorized, fetchREST } from '../REST.js';

  let phone = '';
  let password = '';
  let rememberme = false;

  let text = 'Zaloguj';
  let error;

  async function login() {
    text = '...';
    const json = await fetchREST('POST', '/auth/login', {
      phone: phone,
      password: password,
      rememberme: rememberme,
    });
    if (json.error) {
      text = 'Zaloguj';
      error = json.error;
    } else {
      $authorized = true;
      error = null;
    }
  }
</script>

<div class="wrapper">
  <div class="login">
    <div class="circle">🧻</div>
    <form>
      <label class="phone">
        <span>Telefon</span>
        <input type="tel" bind:value={phone} />
      </label>
      <label class="password">
        <span>Hasło</span>
        <input type="password" bind:value={password} />
      </label>
      <label class="checkbox">
        <input type="checkbox" bind:checked={rememberme} />
        <span>Pamiętaj mnie</span>
      </label>
      <br />
      <button type="submit" on:click|preventDefault={login}>{text}</button>
      {#if error}<br />{error}{/if}
    </form>
  </div>
</div>

<style>
  .wrapper {
    height: 100vh;
    display: grid;
    place-items: center;
    /* background-color: var(--grey-1); */
    background-image: url('/imgs/dot_grid.png');
  }

  .login {
    position: relative;
    box-shadow: var(--shadow);
    padding: 30px 40px;
    width: 280px;
    background-color: var(--grey-0);
  }

  .circle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
    border: solid 2px var(--main-1);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: var(--grey-0);
    font-size: 1.2em;
  }

  form {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  label {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: start;
  }
  label.checkbox {
    flex-flow: row;
    justify-content: start;
    align-items: center;
  }

  span {
    display: block;
    padding: 5px 7px;
  }

  input {
    border-radius: 0;
    border: var(--border);
    padding: 5px 7px;
    width: 100%;
  }
  input[type='checkbox'] {
    cursor: pointer;
    margin: 0;
    width: 16px;
    height: 16px;
    border: none;
    accent-color: var(--main-1);
  }
</style>
