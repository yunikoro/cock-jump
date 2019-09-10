import * as BABYLON from 'babylonjs'
import AxesHelper from '../helper/AxesHelper'

// const canvas = document.querySelector('#c')

export default class Game {
    constructor({ canvas }) {
        const antialias = true
        const ngOptions = null
        const adaptDeviceRatio = true

        this.engine = new BABYLON.Engine(canvas, antialias, ngOptions, adaptDeviceRatio)
        this.scene = new BABYLON.Scene(this.engine)
        window.onresize = () => {
            this.engine.resize()
        }
    }
    init() {
        const alpha = 3 * Math.PI / 2
        const beta = 11 * Math.PI / 20
        const radius = 15
        this.mainCamera = new BABYLON.ArcRotateCamera('main_camera', alpha, beta, radius, new BABYLON.Vector3(1, 6, -2), this.scene)
        this.mainCamera.attachControl(window)
        this.mainLight = new BABYLON.HemisphericLight('main_Light', new BABYLON.Vector3(0, 2, 0), this.scene)
        new AxesHelper('helper', {
            size: 3
        }, this.scene)
    }
    run() {
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
}