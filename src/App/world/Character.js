import * as THREE from "three";
import assetStore from "../Utils/AssetStore.js";

import App from "../App.js";
export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.assetStore = assetStore.getState()
    this.avatar = this.assetStore.loadedAssets.avatar

    // create character and add to scene
    const geometry = new THREE.BoxGeometry(2, 6, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.instance = new THREE.Mesh(geometry, material);
    this.instance.position.set(0, 3.9, 0);
    this.scene.add(this.instance);

    const avatar = this.avatar.scene
    avatar.rotation.y = Math.PI
    avatar.position.y = -3
    avatar.scale.setScalar(3)
    this.instance.add(avatar)
  }
}
