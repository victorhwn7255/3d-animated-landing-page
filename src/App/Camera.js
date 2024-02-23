import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sizesStore } from "./utils/Store";

import App from "./App";

export default class Camera {
  constructor() {
    this.app = new App()
    this.canvas = this.app.canvas

    this.sizes = sizesStore.getState()

    this.setInstance()
    this.setControls()
  }

  //set the Camera (instance = camera)
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    );
    this.instance.position.z = 5;
  }

  //set the Orbit Controls
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true;
  }

  loop() {
    this.controls.update()
  }

}