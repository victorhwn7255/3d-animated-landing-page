import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./utils/Loop";
import World from "./world/World";
import Resize from "./utils/Resize";

let instance = null

export default class App {
  constructor() {
    if(instance) {
      return instance
    }

    instance = this

    this.canvas = document.querySelector("canvas.threejs")
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    this.loop = new Loop()
    this.resize = new Resize()

  }
}