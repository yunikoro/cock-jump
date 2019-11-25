# Mobile First HTML5 WebGL Game
# Crazy Jumping Cock 移动端H5游戏 - 疯狂跳跳鸡
## Product ScreenShot 产品截图
![main_entry](https://raw.githubusercontent.com/yunikoro/cock-jump/master/main.png)
![cock_jump](https://raw.githubusercontent.com/yunikoro/cock-jump/master/cock.png)
## Tools and Frameworks Using 框架选型
### 1. Babylonjs
### 2. React
### 3. Webpack

## Project Starting 项目启动
```shell
npm install
```
### 1. local dev server starting 本地开发服务器启动
```shell
npm run dev
```
### 2. build for production 服务器打包部署
```shell
npm run build:prod
```

## Project Structure 项目结构
##### /helper
- **AxesHelper.js** - A helper to show scene axes x,y and z.
##### /component WebGL game modules WebGL游戏部分
- **Game.js** - Game renderLoop main entry. 游戏部分主入口，总调度类。
- **Cock.js** - The character controller Class "Mr. Cock". 主人公“鸡”的控制类。
- **Floor.js** - Stair 3D Object controller Class. 单个台阶模型控制类。
- **MainCamera.js** - A extends class of ArcRotateCamera to manage camera moving. 继承自babylonjs.ArcRotateCamera的镜头类
- **PanAxesUpdater.js** - A class base on hammer.js to receive user finger touching and moving, then calculating Acceleration.基于hammerjs的一个类用于接收用户的交互行为，并计算加速度。
- **BarrierManager.js** - A Tree Pool to manage barrier tree plant and recycle. 障碍树池，用于管理障碍树的回收和重新部署
- **JumpAssertManager.js** - A extends class of AssetsManager, get meta GLTF 3D object from network and caching them. 继承自babylonjs.AssetsManager，获取来自网络的GLTF格式3D模型。
- **JumpCurveManager.js** - A Bezier curve path generator which generate path and "Mr. Cock" will follow it. 根据游戏逻辑产生“鸡”的跳跃曲线。
- **Stairs.js** - A Stair Pool to manage stair plant and recycle. 楼梯池，管理楼梯对象的回收与重新部署。
##### /pages HTML React modules 
- **Index.jsx** - Page 游戏内嵌React页面
