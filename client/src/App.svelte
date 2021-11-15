<script>
  import { onMount } from 'svelte';
  import { authorized, fetchREST } from './REST.js';
  import { error } from './error.js';
  import Error from '$c/Error.svelte';
  import Main from '$c/Main.svelte';
  import Login from '$c/Login.svelte';

  onMount(async () => {
    let me = await fetchREST('GET', '/auth/me');
    if (!me.error) $authorized = true;
  });
</script>

{#if $error}<Error />{/if}

{#if $authorized}
  <Main />
{:else}
  <Login />
{/if}
