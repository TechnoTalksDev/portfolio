import { writable } from 'svelte/store';

export const currentSection = writable<string>('hey');
