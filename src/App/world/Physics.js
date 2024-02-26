import * as THREE from 'three'
import App from '../App.js'
import { appStateStore } from '../Utils/Store.js'

export default class Physics {
    constructor() {
        this.app = new App()
        this.scene = this.app.scene
        this.meshMap = new Map()

        import('@dimforge/rapier3d').then((RAPIER) => {
            const gravity = {x:0, y:-9.81, z:0}
            this.world = new RAPIER.World(gravity)
            this.rapier = RAPIER

            // Three JS
            const groundGeometry = new THREE.BoxGeometry(10, 1, 10)
            const groundMaterial = new THREE.MeshStandardMaterial({color: 'turquoise'})
            this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
            this.scene.add(this.groundMesh)

            //Rapier
            const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed()
            this.groundRigidBodyType = this.world.createRigidBody(groundRigidBodyType)

            const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5)
            this.world.createCollider(groundColliderType, this.groundRigidBodyType)

            this.rapierLoaded = true
            appStateStore.setState({physicsReady: true})

        })
    }

    add(mesh) {
        const rigidBodyType = this.rapier.RigidBodyDesc.dynamic()
        this.rigidBody = this.world.createRigidBody(rigidBodyType)
        this.rigidBody.setTranslation(mesh.position)
        this.rigidBody.setRotation(mesh.quaternion)

        const colliderType = this.rapier.ColliderDesc.cuboid(0.5, 0.5, 0.5)
        this.world.createCollider(colliderType, this.rigidBody)

        this.meshMap.set(mesh, this.rigidBody)

    }

    loop() {
        if(!this.rapierLoaded) return

        this.world.step()

        this.meshMap.forEach((rigidBody, mesh) => {
            const position = rigidBody.translation()
            const rotation = rigidBody.rotation()
    
            mesh.position.copy(position)
            mesh.quaternion.copy(rotation)
        })

    }
}