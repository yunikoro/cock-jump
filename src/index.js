 
import Game from './component/Game'
import './style.css';
import VConsole from 'vconsole';

const canvas = document.querySelector('#c')
// new VConsole()

const game = new Game({
    canvas
})
const main = async () => {
    try {
        await game.init()
        game.run()
    } catch (e) {
        throw e
    }
    
}
main()