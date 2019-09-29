import * as BABYLON from 'babylonjs'

export default class MainCamera extends BABYLON.ArcRotateCamera {
    constructor(scene) {
        const name = 'mainCamera'
        const alpha = 3 * Math.PI / 2
        const beta = Math.PI / 3
        const radius = 25
        const target = new BABYLON.Vector3(0, 14.1, 0.3)
        super(name, alpha, beta, radius, target, scene)
    }
    // 30   balanceY = 0.0025, balanceZ = 0.0034
    // 
    followLoop(avgSpeed, balanceY = 0.0027, balanceZ = 0.0034) {
        this.target.y += avgSpeed.y - balanceY
        this.target.z += avgSpeed.z - balanceZ
    }
} 