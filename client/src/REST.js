import { writable } from 'svelte/store';

export const authorized = writable(false);

export async function fetchREST(method, url, json) {
  let base_url = 'http://localhost:8000';
  let options = {
    method: method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  if (json) options.body = JSON.stringify(json);
  let res = await fetch(base_url + url, options);
  if (res.status == 401) authorized.set(false);
  return await res.json();
}
