 
import ReactDOM from 'react-dom'
import React from 'react'

import Game from './component/Game'
import './style.css'
import VConsole from 'vconsole'

import Test from './pages/Test.jsx'

const canvas = document.querySelector('#c')
const body = document.querySelector('#root')
// new VConsole()

// const game = new Game({
//     canvas
// })
// const main = async () => {
//     try {
//         await game.init()
//         game.run()
//     } catch (e) {
//         throw e
//     }
    
// }

ReactDOM.render(<Test />, body)
// main()