# Crazy Jumping Cock 疯狂跳跳鸡
## Product ScreenShot 产品截图
![main_entry](https://raw.githubusercontent.com/yunikoro/cock-jump/master/main.png)
![cock_jump](https://raw.githubusercontent.com/yunikoro/cock-jump/master/cock.png)
## Tools and Frameworks Using 框架选型
### 1. Babylonjs
### 2. React
### 3. Webpack

## Project Starting 项目启动
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
- AxesHelper.js
##### /component
- **Game.js** - Game renderLoop main entry.
- **Cock.js** - The character controller Class "Mr. Cock".
- **Floor.js** - Stair Object controller Class.
- **MainCamera.js** - A extends class of ArcRotateCamera to manage camera moving.
- **PanAxesUpdater.js** - A class base on hammer.js to receive user finger touching and moving, then calculate Acceleration.
- **BarrierManager.js** - A Tree Pool to manage barrier tree plant and recycle.
- **JumpAssertManager.js** - A extends class of AssetsManager, get meta GLTF 3D object from network and caching them.
##### /pages
