import React from 'react'
import './playground.less'

import Game from '../../component/Game'

export default class PlayGround extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.game = null
    }
    componentDidMount() {
        this.run(this.canvasRef.current)
    }
    async run(canvas) {
        try {
            console.log(canvas)
            this.game = new Game({
                canvas
            })
            await this.game.init()
            this.game.run()
        } catch (e) {
            throw e
        }
    }
    render() {
        return (
            <div>
                <canvas className="view" ref={this.canvasRef} ></canvas>
            </div>
        )
        
    }
}