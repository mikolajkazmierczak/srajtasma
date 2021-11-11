<script>
  import { onMount } from 'svelte';
  import { authorized, fetchREST } from './REST.js';
  import { error } from './error.js';
  import Error from './Error.svelte';
  import Main from '$c/Main.svelte';
  import Login from '$c/Login.svelte';

  onMount(async () => {
    let json = await fetchREST('GET', '/auth/me');
    if (!json.error) $authorized = true;
  });
</script>

{#if $error}<Error />{/if}

{#if $authorized}
  <Main />
{:else}
  <Login />
{/if}
