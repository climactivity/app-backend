import {Writable, writable} from 'svelte/store';
import type Aspect from "./AspectTypes";

export const selectedAspect : Writable<Aspect> = writable(null);