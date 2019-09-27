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
        this.pointNum = 60
        this.scene = game.scene
        this.showHelper = showHelper
        
        this.center = BABYLON.Vector3.Center(start, end)
        this.center.y += 10
        this.helperMesh = null
        this.points = []

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
        this.points.forEach(point => {
            point.x = posX
        })
        if(this.showHelper) {
            if(this.helperMesh) {
                this.helperMesh.dispose()
            } 
            this.helperMesh = BABYLON.Mesh.CreateLines('curve', this.points, this.scene)
        }
    }
    update(resource) {
        const { start, end, x } = resource
        
        const _start = start.clone()
        const _end = end.clone()
        _start.y += 2.1
        _end.y += 2.1

        this.start = _start
        this.end = _end
        this.center = BABYLON.Vector3.Center(start, end)
        this.center.y += 10

        const locatingPoints = BABYLON.Curve3.CreateQuadraticBezier(
            this.start,
            this.center,
            this.end,
            this.pointNum
        )
        this.points = locatingPoints.getPoints()
        this.points.forEach(point => {
            point.x = x
        })
        if(this.showHelper) {
            if(this.helperMesh) {
                this.helperMesh.dispose()
            } 
            this.helperMesh = BABYLON.Mesh.CreateLines('curve', this.points, this.scene)
        }

    }
}