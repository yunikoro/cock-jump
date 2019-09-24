import * as BABYLON from 'babylonjs'
import Floor from './Floor'

export default class Stairs {
    constructor(name, resource, scene) {
        const { game } = resource
        this.name = name
        this.scene = scene
        this.game = game
         
        this.stairs = []
         
        this.currFloorPos = {
            position: new BABYLON.Vector3.Zero(),
            index: 0,
        }
    }
    init(stepNum = 20) {
        for(let i = 0; i < stepNum; i++) {
            const floor = new Floor('floor', {
                game: this.game
            }, this.scene)
            floor.position.y += 2 * i
            floor.position.z += 3 * i
            if(i == 0) {
                this.currFloorPos = {
                    position: floor.position,
                    index: i,
                }
            }
        }
    }  
} 