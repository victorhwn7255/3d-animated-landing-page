import * as THREE from "three";

import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = this.app.gui.pane;

    this.assetStore = assetStore.getState()
    this.environment = this.assetStore.loadedAssets.environment

    this.loadEnvironment();
    this.addLights();
  }

  loadEnvironment() {
    // load environment here
    const environmentScene = this.environment.scene
    this.scene.add(environmentScene)

    environmentScene.position.set(-4.8, 0, -7.5)
    environmentScene.rotation.set(0, -0.60, 0)
    environmentScene.scale.setScalar(1.5)

    environmentScene.traverse((obj) => {
      if(obj.isMesh) {
        this.physics.add(obj, "fixed", "cuboid")
      }
    })
  }


  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

}
