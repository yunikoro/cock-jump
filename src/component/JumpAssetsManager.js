import * as BABYLON from 'babylonjs'
import cockGltf from '../assets/cock.glb'
import treeGltf from '../assets/tree.gltf'
import floorGltf from '../assets/floor.gltf'

export default class JumpAssetsManager extends BABYLON.AssetsManager {
    constructor(scene) {
        super(scene)
        this.meshes = {}
        const cockTask = this.addMeshTask('cock', '', '', cockGltf)
        cockTask.onSuccess = task => {
            const { loadedMeshes, loadedAnimationGroups, loadedSkeletons } = task
            const cockAnim = loadedAnimationGroups[0]
            cockAnim.stop()
            loadedMeshes.forEach(mesh => {
                mesh.checkCollisions = true
                mesh.setEnabled(false)
            })
            // cockAnim.start(false, 1, 121/150*6.25, 150/150*6.25)
            this.meshes['cock'] = {
                mesh: loadedMeshes,
                animation: cockAnim
            }
        }
        const treeTask = this.addMeshTask('tree', '', '', treeGltf)
        treeTask.onSuccess = task => {
            const { loadedMeshes, loadedAnimationGroups, loadedSkeletons } = task
            const tree = new BABYLON.Mesh('tree', scene)
            loadedMeshes.forEach(mesh => {
                mesh.checkCollisions = true
                mesh.parent = tree
            })
            this.meshes['tree'] = {
                mesh: tree,
            }
            tree.setEnabled(false)
        }
        const floorTask = this.addMeshTask('floor', '', '', floorGltf)
        floorTask.onSuccess = task => {
            const { loadedMeshes, loadedAnimationGroups, loadedSkeletons } = task
            const floor = new BABYLON.Mesh('floor', scene)
            loadedMeshes.forEach(mesh =>{
                mesh.parent = floor
            })
            for (let i = 0; i < loadedMeshes.length; i++) {
                loadedMeshes[i].parent = floor
            }
            floor.rotation.y = - Math.PI / 2
            this.meshes['floor'] = {
                mesh: floor,
            }
            floor.setEnabled(false)
        }
    }
    load() {
        super.load()
        return new Promise((resolve, reject) => {
            this.onTaskError = task => {
                const { errorObject: { message } } = task
                const err = new Error(message)
                err.task = task
                reject(err)
            }
            this.onFinish = () => {
                resolve({ 
                    assets: this.meshes
                })
            }
        })
    }
}