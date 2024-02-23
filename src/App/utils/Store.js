//this file is using zustand to manage global variables

import { createStore } from "zustand/vanilla";

export const sizesStore = createStore(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}))