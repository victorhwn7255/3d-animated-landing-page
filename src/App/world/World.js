import * as THREE from "three";
import App from "../App";

export default class World {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
  }
}