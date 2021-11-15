import { writable } from 'svelte/store';

export const showUsersList = writable(false);
export function open() {
  showUsersList.set(true);
}
export function close() {
  showUsersList.set(false);
}

export const amount = writable(null);
export const usersList = writable([]);
