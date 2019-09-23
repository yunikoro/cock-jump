import Hammer from 'hammerjs'
import * as BABYLON from 'babylonjs'

export default class PanAxesUpdater {
    constructor(htmlDom) {
        const { clientWidth, clientHeight } = htmlDom
        this.htmlDom = htmlDom
        this.clientX = clientWidth
        this.clientY = clientHeight
        this.fullCssAxes = new BABYLON.Vector2(this.clientX / 2, this.clientY / 2)

        this.currRateAxes = new BABYLON.Vector2.Zero()

        this.cssAxes = new BABYLON.Vector2.Zero()
        this.cssRateAxes = new BABYLON.Vector2.Zero()

    }
    cssAxesCaler(center) {
        const { x, y } = center
        const cssX = x - this.clientX / 2
        const cssY = this.clientY / 2 - y
        this.cssAxes.set(cssX, cssY)
    }
    acceCaler() {
        let acce = null
        if (this.currRateAxes.length() == 0) {
            this.currRateAxes = this.cssRateAxes
            acce = this.currRateAxes
        } else {
           acce = this.cssRateAxes.subtract(this.currRateAxes)
           this.currRateAxes = this.cssRateAxes
        }
        return acce
    }
    updater(cb = () => {}) {
        this.hammer = new Hammer(this.htmlDom)
        this.hammer.on('panstart', evt => {
            this.cssAxesCaler(evt.center)
            // console.log(this.cssAxes)
            this.cssRateAxes = this.cssAxes.divide(this.fullCssAxes)
            this.currRateAxes = this.cssRateAxes
        })
        this.hammer.on('pan', evt => {
            // console.log(evt)
            
            this.cssAxesCaler(evt.center)
            // console.log(this.cssAxes)
            this.cssRateAxes = this.cssAxes.divide(this.fullCssAxes)
            if (evt.eventType == 4) {
                this.currRateAxes = this.cssRateAxes
            }
            // console.log(this.cssRateAxes)
            const acce = this.acceCaler()
            if (evt.eventType == 4) {
                
            }
            cb(acce)
        })
    }
} 