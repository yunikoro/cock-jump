import * as BABYLON from 'babylonjs'

export default class MainCamera extends BABYLON.ArcFollowCamera {
    constructor(name, alpha, beta, radius, target, scene) {
        super(name, alpha, beta, radius, target, scene)
        
    }
}