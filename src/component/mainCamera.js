import * as BABYLON from 'babylonjs'

export default class MainCamera extends BABYLON.ArcRotateCamera {
    constructor(scene) {
        const name = 'mainCamera'
        const alpha = 3 * Math.PI / 2
        const beta = Math.PI / 3
        const radius = 25
        const target = new BABYLON.Vector3(0, 14.1, 0.3)
        super(name, alpha, beta, radius, target, scene)
        this.targetPos = new BABYLON.Vector3(0, 14.1, 0.3)
    }
    targetRefresh(targetPos) {
        const _targetPos = targetPos.clone()
        _targetPos.y += 14.1
        _targetPos.z += 0.3
        this.targetPos = _targetPos 
    }
    // 30   balanceY = 0.0025, balanceZ = 0.0034
    followLoop(avgSpeed) {
        if(this.target.y >= this.targetPos.y || this.target.z >= this.targetPos.z) {
            this.target.y = this.targetPos.y
            this.target.z = this.targetPos.z
        } else {
            this.target.y += avgSpeed.y
            this.target.z += avgSpeed.z
        }
    }
} 