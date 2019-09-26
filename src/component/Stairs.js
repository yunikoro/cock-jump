import * as BABYLON from 'babylonjs'
import Floor from './Floor'

export default class Stairs {
    constructor(name, resource, scene) {
        const { game } = resource
        this.name = name
        this.scene = scene
        this.game = game
         
        this.stairs = []
         
        this.currFloorPos = {}
        this.nextFloorPos = {}
        this.topFloorPos = {}

    }
    init(stepNum = 20) {
        for(let i = 0; i < stepNum; i++) {
            const floor = new Floor('floor', {
                game: this.game
            }, this.scene)
            floor.position.y += 2 * i
            floor.position.z += 3 * i
            floor.loadBarrier(i)
            if (i == 0) {
                this.currFloorPos = {
                    position: floor.position,
                    index: i,
                }
                
            }
            if (i == 1) {
                this.nextFloorPos = {
                    position: floor.position,
                    index: i,
                }
            }
            if (i == stepNum - 1) {
                this.topFloorPos = {
                    position: floor.position,
                    index: i,
                }
            }
            this.stairs.push(floor)
        }
    }
    ascent() {
        const { index, position } = this.nextFloorPos
        this.currFloorPos = this.nextFloorPos
        if (index !== this.stairs.length - 1) {
            this.nextFloorPos = {
                position: this.stairs[index + 1].position,
                index: index + 1,
            }
        } else {
            this.nextFloorPos = {
                position: this.stairs[0].position,
                index: 0,
            }
        }
    } 
} 