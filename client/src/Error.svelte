<script>
  import { error } from './error.js';
</script>

<div class="wrapper">
  <div
    class="exit"
    on:click={() => {
      $error = null;
    }}
  >
    <img src="/icons/no.svg" alt="exit" />
  </div>
  <h4>💩 Whoops</h4>
  <p>Coś poszło bardzo nie tak. Ale nie panikuj!</p>
  <p>
    Możesz dalej używać apki, za wyjątkiem funkcjonalności która właśnie padła
    XD
  </p>
  <p>
    Podeślij mi screen żebym mógł to naprawić!<br />A najlepiej przeklej ten
    czerwony tekst.
  </p>
  <p class="error">{JSON.stringify($error)}</p>
</div>

<style>
  .wrapper {
    overflow-y: auto;
    z-index: 1000;
    position: fixed;
    top: 15px;
    left: 15px;
    padding: 5px;
    padding-bottom: 80px;
    width: calc(100vw - 30px);
    height: calc(100vh - 30px);
    background-color: var(--grey-1);
  }

  .exit {
    z-index: 1000;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    background-color: var(--red-0);
    border-radius: 50%;
  }
  .exit img {
    width: 60%;
  }

  h4,
  p {
    margin-bottom: 5px;
    font-size: 0.8rem;
  }
  .error {
    color: var(--red-1);
    word-break: break-all;
  }
</style>
