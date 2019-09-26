import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

import { getRandomInt, arrPicker } from '../util'

import PanAxesUpdater from './PanAxesUpdater'
import AxesHelper from '../helper/AxesHelper'
import JumpAssetsManager from './JumpAssetsManager'
import Cock from './Cock'
import BarrierManager from './BarrierManager'
import Stairs from './Stairs'

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
        // const alpha = 3 * Math.PI / 2
        // const beta = 11 * Math.PI / 20
        // const radius = 15
        // this.mainCamera = new BABYLON.ArcRotateCamera('main_camera', alpha, beta, radius, new BABYLON.Vector3(0, 8, -15), this.scene)

        // for test
        const camPos = new BABYLON.Vector3(0, 8, -8)
        this.mainCamera = new BABYLON.UniversalCamera('camera', camPos, this.scene)
        this.mainCamera.setTarget(new BABYLON.Vector3(0, 8, 0))
        

        this.mainCamera.attachControl(this.canvas, true)
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
            
            this.cock = new Cock('cock', {
                game: this,
                asset: this.assets.cock
            }, this.scene)
            this.cock.position.y = 2.1
            
            this.cock.init()
            this.cock.jump()

            this.barrierManager = new BarrierManager('barrier_manager', {
                game: this
            }, this.scene)

            this.stairs = new Stairs('stairs', {
                game: this,
            }, this.scene)
            this.stairs.init(10)
        } catch (e) {
            throw e
        }
    }
    run() {
        for (let i = 0; i < 30; i++) {
            this.stairs.ascent()
            console.log(this.stairs.currFloorPos.position)
            console.log(this.stairs.nextFloorPos.position)
        }
        // this.panAxes = new PanAxesUpdater(this.canvas)
        // this.panAxes.updater(glAxes => {
        //     // console.log(glAxes)
        //     this.cockAcce = glAxes
        //     this.cock.position.x += this.cockAcce.x * 8
        //     // this.cock.position.y += this.cockAcce.y * 8
        // })
        this.scene.onBeforeRenderObservable.add(() => {
            // console.log(getRandomInt(0, 5))
        })
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
}