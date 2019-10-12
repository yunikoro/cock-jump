import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

import { getRandomInt, arrPicker } from '../util'

import MainCamera from './MainCamera'
import PanAxesUpdater from './PanAxesUpdater'
import AxesHelper from '../helper/AxesHelper'
import JumpAssetsManager from './JumpAssetsManager'
import Cock from './Cock'
import BarrierManager from './BarrierManager'
import Stairs from './Stairs'
import JumpCurveManager from './JumpCurveManager'

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

        this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR
        this.scene.fogStart = 39.0
        this.scene.fogEnd = 50.0
        this.scene.fogDensity = 0.1
        this.scene.fogColor = BABYLON.Color3.FromHexString('#4675DD')

        window.onresize = () => {
            this.engine.resize()
        }
        this.assets = null

        this.cockAcce = new BABYLON.Vector2.Zero()
        this.posX = 0
        this.dead = false
        this.started = true

        this.exposeHandler = () => {}
    }
    static get EDAG() {
        return 5
    }
    async init() {
        this.mainCamera = new MainCamera(this.scene)

        // for test
        // const camPos = new BABYLON.Vector3(0, 8, -8)
        // this.mainCamera = new BABYLON.UniversalCamera('camera', camPos, this.scene)
        // this.mainCamera.setTarget(new BABYLON.Vector3(0, 8, 0))
        

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
            
            this.barrierManager = new BarrierManager('barrier_manager', {
                game: this
            }, this.scene)
            this.barrierManager.init()

            this.cock = new Cock('cock', {
                game: this,
                asset: this.assets.cock
            }, this.scene)
            this.cock.position.y = 2.1
            this.cock.init()
            // this.mainCamera.lockedTarget = this.cock

            this.stairs = new Stairs('stairs', {
                game: this,
            }, this.scene)
            this.stairs.init(10)
            this.jumpManager = new JumpCurveManager(
                {
                    start: this.stairs.currFloorPos.position,
                    end: this.stairs.nextFloorPos.position,
                    game: this
                })
            this.engine.runRenderLoop(() => {
                this.scene.render()
            })
        } catch (e) {
            throw e
        }
    }
    run() {
        this.panAxes = new PanAxesUpdater(this.canvas)
        // wired collision bug fix
        this.posX += 0.08
        this.panAxes.updater(glAxes => {
            // console.log(glAxes)
            this.cockAcce = glAxes
            if(!this.dead) {
                if(this.posX > 5.7 || this.posX < -5.7) {
                    if(this.posX > 0) {
                        this.posX = 5.7
                    } else {
                        this.posX = -5.7
                    }
                }
                this.posX += this.cockAcce.x * 8
            }
            // this.cock.position.y += this.cockAcce.y * 8
            this.jumpManager.updatePosX(this.posX)
        })
        if(this.started) {
            this.scene.onBeforeRenderObservable.add(() => {
                if(this.dead) {
                    
                } else {
                    this.jumpManager.startJumpLoop({
                        preJump: () => {
                            this.cock.jump()
                        },
                        jumping: (position) => {
                            this.cock.position = position
                        },
                        afterJump: () => {
                            this.stairs.ascent()
                            this.jumpManager.updateStartEnd({
                                start: this.stairs.currFloorPos.position,
                                end: this.stairs.nextFloorPos.position
                            })
                            this.jumpManager.updatePosX(this.posX)
                            this.mainCamera.targetRefresh(this.stairs.currFloorPos.position)
                            this.exposeHandler({ addPoint: true, fps: this.engine.getFps() })
                        }
                    })
                }
                this.mainCamera.followLoop(this.jumpManager.avgSpeed)
                this.stairs.rebuild()
                this.barrierManager.disposeLoop(this.stairs.currFloorPos)
                this.cock.collideLoop(barrier => {
                    // console.log('colliding')
                    this.dead = true

                    this.exposeHandler({ isDead: true })
                })
            })   
        }
    }
    reset() {
        // this.mainCamera
        // this.stairs
        // this.cock
        // this.jumpManager
    }
    regExposeHandler(exposeHandler) {
        if (typeof exposeHandler == 'function') {
            this.exposeHandler = exposeHandler
        }
    }
}