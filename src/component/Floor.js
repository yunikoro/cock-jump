import * as BABYLON from 'babylonjs'
import { arrPicker } from '../util'

export default class Floor extends BABYLON.AbstractMesh {
    constructor(name, resource, scene) {
        const { game } = resource
        super(name, scene)
        this.game = game
        this.barrierManager = this.game.barrierManager
        
        this.plantNumArr = [2, 3, 3, 4]
        this.alterAxesXArr = []
        this.leftFirstAxes = -5
        for(let i = 0; i < 8; i++) {
            this.alterAxesXArr.push(this.leftFirstAxes += (i == 0 ? 0 : 1.5))
        }

        this.floor = this.game.assets['floor'].mesh.clone()
        this.floor.setEnabled(true)
        this.floor.parent = this
    }
    loadBarrier(index) {
        if(index == 0) {
            return
        }
        const plantNum = arrPicker(this.plantNumArr, 1)[0]
        const pickedAxesXArr = arrPicker(this.alterAxesXArr, plantNum)
        for (let i = 0; i < pickedAxesXArr.length; i++) {
            this.barrierManager.plant(this.position, pickedAxesXArr[i]).parent = this   
        }
    }
}
