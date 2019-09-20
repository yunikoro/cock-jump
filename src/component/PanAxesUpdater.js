import Hammer from 'hammerjs'
import * as BABYLON from 'babylonjs'

export default class PanAxesUpdater {
    constructor(htmlDom) {
        this.htmlDom = htmlDom
        this.target = new BABYLON.Vector2.Zero()
    }
    updater(cb = () => {}) {
        this.hammer = new Hammer(this.htmlDom)
        debugger
        this.hammer.on('pan', evt => {
            console.log(evt.center)
            const { center: { x, y } } = evt
            if (this.target.length() == 0) {
                // cb(this.target)
                this.target.x = x
                this.target.y = y
            } else {
                const _target = new BABYLON.Vector2(x, -y)
                // cb(_target.subtract(this.target))
                this.target = _target
            }
        })
    }
    glAxesParser(cssAxes) {
        const glAxes = cssAxes.multiplyInPlace(1, -1)
        return glAxes
    }
} 