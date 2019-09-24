import * as BABYLON from 'babylonjs'

export default class Floor extends BABYLON.AbstractMesh {
    constructor(name, resource, scene) {
        const { game } = resource
        super(name, scene)
        this.game = game
        // this.floor = scene.getNodeByName('floor').clone()
        this.floor = this.game.assets['floor'].mesh.clone()
        this.floor.setEnabled(true)
        this.floor.parent = this
    }
    loadBarrier() {

    }
}