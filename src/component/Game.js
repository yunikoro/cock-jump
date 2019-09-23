import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import PanAxesUpdater from './PanAxesUpdater'

import AxesHelper from '../helper/AxesHelper'
import JumpAssetsManager from './JumpAssetsManager'
import Cock from './Cock'
import Floor from './Floor'

import skyPic from '../assets/sky.jpg'

// const canvas = document.querySelector('#c')

export default class Game {
    constructor({ canvas }) {
        const antialias = true
        const ngOptions = null
        const adaptDeviceRatio = true

        this.canvas = canvas
        this.engine = new BABYLON.Engine(canvas, antialias, ngOptions, adaptDeviceRatio)
        this.scene = new BABYLON.Scene(this.engine)
        window.onresize = () => {
            this.engine.resize()
        }
        this.assets = null

        this.cockAcce = new BABYLON.Vector2.Zero()
    }
    async init() {
        const alpha = 3 * Math.PI / 2
        const beta = 11 * Math.PI / 20
        const radius = 15
        this.mainCamera = new BABYLON.ArcRotateCamera('main_camera', alpha, beta, radius, new BABYLON.Vector3(0, 8, -15), this.scene)
        // this.mainCamera.attachControl(this.canvas, true)
        this.mainLight = new BABYLON.HemisphericLight('main_Light', new BABYLON.Vector3(0, 2, 0), this.scene)
        new AxesHelper('helper', {
            size: 3
        }, this.scene)
        
        const isBackground = true
        const sky = new BABYLON.Layer('sky', skyPic, this.scene, isBackground)
        try {
            const jumpAssetsManager = new JumpAssetsManager(this.scene)
            const { assets } = await jumpAssetsManager.load()
            this.assets = assets
        } catch (e) {
            throw e
        }
    }
    run() {
        this.cock = new Cock('cock', {
            game: this,
            asset: this.assets.cock
        }, this.scene)
        this.cock.init()
        this.cock.jump()
        
        this.floor = new Floor('floor', {
            game: this,
        }, this.scene)

        this.panAxes = new PanAxesUpdater(this.canvas)
        this.panAxes.updater(glAxes => {
            // console.log(glAxes)
            this.cockAcce = glAxes
            this.cock.position.x += this.cockAcce.x * 8
            // this.cock.position.y += this.cockAcce.y * 8
        })
        this.scene.onBeforeRenderObservable.add(() => {
            
        })
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
}