import { writable } from 'svelte/store';

export const showPanel = writable(false);
export function open() {
  showPanel.set(true);
}
export function close() {
  showPanel.set(false);
}

export const title = writable(null);
export const price = writable(null);
export const note = writable(null);
export const emoji = writable('🧻');
