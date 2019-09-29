import * as BABYLON from 'babylonjs'

export default class JumpCurveManager {
    constructor(resource, showHelper) {
        const { start, end, game } = resource
        const _start = start.clone()
        const _end = end.clone()
        
        _start.y += 2.1
        _end.y += 2.1

        this.start = _start
        this.end = _end 
        this.pointNum = 30
        this.scene = game.scene
        this.showHelper = showHelper
        
        this.center = BABYLON.Vector3.Center(start, end)
        this.center.y += 10
        this.helperMesh = null
        this.points = []
        this.loopIndex = 0

        this.avgSpeed = this.end
                            .subtract(this.start)
                            .divide(new BABYLON.Vector3(this.pointNum,
                                                        this.pointNum, 
                                                        this.pointNum))

        this.updateBase()
    }
    updateBase () {
        const locatingPoints = BABYLON.Curve3.CreateQuadraticBezier(
            this.start,
            this.center,
            this.end,
            this.pointNum
        )
        this.points = locatingPoints.getPoints()
        if(this.showHelper) {
            if(this.helperMesh) {
                this.helperMesh.dispose()
            } 
            this.helperMesh = BABYLON.Mesh.CreateLines('curve', this.points, this.scene)
        }
    }
    updateStartEnd(resource) {
        const { start, end } = resource
        
        const _start = start.clone()
        const _end = end.clone()
        _start.y += 2.1
        _end.y += 2.1

        this.start = _start
        this.end = _end
        this.center = BABYLON.Vector3.Center(start, end)
        this.center.y += 10
        
        this.updateBase()
    }
    updatePosX(posX) {
        this.posX = posX
        this.points.forEach(point => {
            point.x = this.posX
        })
        if(this.showHelper) {
            if(this.helperMesh) {
                this.helperMesh.dispose()
            } 
            this.helperMesh = BABYLON.Mesh.CreateLines('curve', this.points, this.scene)
        }
    }
    startJumpLoop(jumpCb) {
        const { preJump, jumping, afterJump } = jumpCb
        if (this.loopIndex == 0) {
            if(typeof preJump == 'function') {
                preJump()
            }
        }
        if (typeof jumping === 'function') {
            jumping(this.points[this.loopIndex])
        }
        if (this.loopIndex == this.points.length - 1) {
            if (typeof afterJump === 'function') {
                afterJump(this.points[this.loopIndex])
            }
            this.loopIndex = 0
        } else {
            this.loopIndex++
        }
        this.avgSpeed = this.end
                            .subtract(this.start)
                            .divide(new BABYLON.Vector3(this.pointNum,
                                                        this.pointNum, 
                                                        this.pointNum))
    }
}