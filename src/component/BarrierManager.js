import * as BABYLON from 'babylonjs'

export default class BarrierManager {
    constructor(name, resource, scene){
        const { game } = resource
        this.name = name
        this.game = game
        this.scene = scene
        this.assets = this.game.assets
        
        this.barrierList = []
        this.avaliBarrier = []
    }
    init(size = 80) {
        for (let i = 0; i < size; i++) {
            const tree = this.assets['tree'].mesh.clone()
            tree.position.x = 20
            tree.position.y = 0
            this.avaliBarrier.push(tree)
        }
    }
    pick() {
        const tree = this.avaliBarrier.splice(0, 1)[0]
        return tree
    }
    recycle(tree) {
        tree.position.set(20, 2, 0)
        this.avaliBarrier.push(tree)
    }
    plant(floorPos, axesX) {
        const tree = this.pick()
        tree.position.x = axesX
        tree.position.y = 2.0
        this.barrierList.push({
            tree,
            floorPos,
        })
        return tree
    }
    disposeLoop(currPos) {
        this.barrierList.forEach((barrier, index) => {
            const { floorPos, tree } = barrier
            if(floorPos.y - currPos.position.y <= -6) {
                this.recycle(tree)
                this.barrierList.splice(index, 1)
            }
        })
    }
}