import { writable } from 'svelte/store';

export const showForm = writable(false);
export function open() {
  showForm.set(true);
}
export function close() {
  showForm.set(false);
}

export const title = writable(null);
export const price = writable(null);
export const note = writable(null);
export const emoji = writable('🧻');
export const users = writable([]);
