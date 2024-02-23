import * as THREE from "three";
import App from "./App";
import { sizesStore } from "./utils/Store";

export default class Renderer {
  constructor() {
    this.app = new App()
    this.canvas = this.app.canvas
    this.camera = this.app.camera
    this.scene = this.app.scene

    this.sizesStore = sizesStore
    this.sizes = this.sizesStore.getState()

    this.setInstance()
    this.setResizeListener()

  }

  //initialize the Renderer (instance = renderer)
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  loop() {
    this.instance.render(this.scene, this.camera.instance)
  }

  setResizeListener() {
    this.sizesStore.subscribe((newSizes) => {
      this.instance.setSize(newSizes.width, newSizes.height)
      this.instance.setPixelRatio(newSizes.pixelRatio)
    })
  }

}