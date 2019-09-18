import * as BABYLON from 'babylonjs'
import cockGltf from '../assets/cock.glb'

export default class JumpAssetsManager extends BABYLON.AssetsManager {
    constructor(scene) {
        super(scene)
        this.addMeshTask('cock', '', '', cockGltf)
    }
    load() {
        super.load()
        console.log('load')    
    }
}