import Game from './component/Game'
import './style.css'

const canvas = document.querySelector('#c')

const game = new Game({
    canvas
})
game.init()
game.run()