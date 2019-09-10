import * as BABYLON from 'babylonjs'
export default class AxesHelper extends BABYLON.AbstractMesh {
    constructor(name, options, scene) {
        const { size } = options
        super(name, scene)
        const pilotLocalAxisX = BABYLON.Mesh.CreateLines('pilot_local_axisX', [
            new BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(size, 0, 0),
            new BABYLON.Vector3(size * 0.95, 0.03 * size, 0),
            new BABYLON.Vector3(size, 0, 0),
            new BABYLON.Vector3(size * 0.95, - 0.03 * size, 0)
        ])
        pilotLocalAxisX.parent = this
        pilotLocalAxisX.color = new BABYLON.Color3(1, 0, 0)
        
        const pilotLocalAxisY = BABYLON.Mesh.CreateLines('pilot_local_axisY', [
            new BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, size, 0),
            new BABYLON.Vector3(0, size * 0.95, size * 0.03),
            new BABYLON.Vector3(0, size, 0),
            new BABYLON.Vector3(0, size * 0.95, - size * 0.03),
        ])
        pilotLocalAxisY.parent = this
        pilotLocalAxisY.color = new BABYLON.Color3(0, 1, 0)

        const pilotLocalAxisZ = BABYLON.Mesh.CreateLines('poilt_local_axisZ', [
            new BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, 0, size),
            new BABYLON.Vector3(size * 0.03, 0 , size * 0.95),
            new BABYLON.Vector3(0, 0, size),
            new BABYLON.Vector3(- size * 0.03, 0 , size * 0.95),
        ])
        pilotLocalAxisZ.parent = this
        pilotLocalAxisZ.color = new BABYLON.Color3(0, 0, 1)
    }
}