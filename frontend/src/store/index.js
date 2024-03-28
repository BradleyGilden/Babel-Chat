/**
 * The app's store for all global reactive values
 */
import { writable } from "svelte/store";

const userData = writable(null);

export { userData };
