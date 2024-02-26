import * as THREE from 'three'
import App from '../App.js'

export default class Physics {
    constructor() {
        this.app = new App()
        this.scene = this.app.scene

        import('@dimforge/rapier3d').then((RAPIER) => {
            const gravity = {x:0, y:-9.81, z:0}
            this.world = new RAPIER.World(gravity)

            // Three JS
            const geometry = new THREE.BoxGeometry(1,1,1)
            const material = new THREE.MeshStandardMaterial({color: 'blue'})
            this.cubeMesh = new THREE.Mesh(geometry, material)
            this.cubeMesh.position.y = 10
            this.scene.add(this.cubeMesh)
            
            const groundGeometry = new THREE.BoxGeometry(10, 1, 10)
            const groundMaterial = new THREE.MeshStandardMaterial({color: 'turquoise'})
            this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
            this.scene.add(this.groundMesh)

            //Rapier
            const rigidBodyType = RAPIER.RigidBodyDesc.dynamic()
            this.rigidBody = this.world.createRigidBody(rigidBodyType)
            this.rigidBody.setTranslation(this.cubeMesh.position)
            this.rigidBody.setRotation(this.cubeMesh.quaternion)

            const colliderType = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
            this.world.createCollider(colliderType, this.rigidBody)

            const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed()
            this.groundRigidBodyType = this.world.createRigidBody(groundRigidBodyType)

            const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5)
            this.world.createCollider(groundColliderType, this.groundRigidBodyType)

            this.rapierLoaded = true

        })
    }

    loop() {
        if(!this.rapierLoaded) return

        this.world.step()

        const position = this.rigidBody.translation()
        const rotation = this.rigidBody.rotation()

        this.cubeMesh.position.set(position.x, position.y, position.z)
        this.cubeMesh.quaternion.copy(rotation)

    }
}