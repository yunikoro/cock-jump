export default class BarrierManager {
    constructor(name, resource, scene){
        const { game } = resource
        this.name = name
        this.game = game
        this.scene = scene
        this.assets = this.game.assets
        
        this.barrierList = []
    }
    plant(floorPos, axesX) {
        const tree = this.assets['tree'].mesh.clone()
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
                tree.dispose()
                this.barrierList.splice(index, 1)
            }
        })
    }
}