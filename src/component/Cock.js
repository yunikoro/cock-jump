import * as BABYLON from 'babylonjs'

export default class Cock extends BABYLON.AbstractMesh {
    constructor(name, resource, scene) {
        super(name, scene)
        const { game, asset: { mesh, animation } } = resource
        this.game = game
        this.meshes = mesh
        this.animation = animation
        mesh.forEach(mesh => {
            mesh.setEnabled(true)
            mesh.parent = this
        })
        this.setEnabled(false)
    }
    init() {
        this.rotation.y = - Math.PI / 2
        this.setEnabled(true)
    }
    idle() {
        this.animation.start(true, 0.5, 6.25 * 1/150, 6.25 * 30/150)
    }
    walk() {
        this.animation.start(true, 1, 6.25 * 31/150, 6.25 * 60/150)
    }
    fly() {
        this.animation.start(true, 1, 6.25 * 61/150, 6.25 * 90/150)
    }
    jump() {
        this.animation.start(false, 3, 6.25 * 91/150, 6.25 * 120/150)
    }
    dead() {
        this.animation.start(false, 1.25, 6.25 * 121/150, 6.25 * 150/150)
    }
}