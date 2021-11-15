import { writable, get } from 'svelte/store';

export const showMe = writable(false);
export function open() {
  showMe.set(true);
}
export function close() {
  showMe.set(false);
}
export function toggle() {
  showMe.set(!get(showMe));
}

export const _id = writable(null);
export const phone = writable(null);
export const firstName = writable(null);
export const lastName = writable(null);
